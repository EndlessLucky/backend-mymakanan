import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserDetail } from './entites/user-detail.entity';
import { User } from './entites/user.entity';
import { UserRegisterDto } from './dtos/user-register.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserDetail) private userDetailRepository: Repository<UserDetail>,
  ) {
  }

  findByPhone(phone: string): Promise<User | undefined> {
    return this.userRepository.findOne({ relations: ['userDetail'], where: { phone } });
  }

  async add(body: UserRegisterDto): Promise<User> {

    const foundUser = await this.userRepository.findOne({ phone: body.phone });
    if (foundUser) {
      throw new BadRequestException('Same phone number is already used. Please try another.');
    }

    const foundUserDetail = await this.userDetailRepository.findOne({
      where: [
        { email: body.email },
        { personalId: body.personalId },
      ]
    });
    if (foundUserDetail) {
      throw new BadRequestException('Same email or personal id is already used. Please try another.');
    }

    let userDetail = new UserDetail();
    userDetail.name = body.name;
    userDetail.address1 = body.address1;
    userDetail.address2 = body.address2;
    userDetail.area = body.area;
    userDetail.state = body.state;
    userDetail.personalId = body.personalId;
    userDetail.email = body.email;
    userDetail = await this.userDetailRepository.save(userDetail);

    const user = new User();
    user.phone = body.phone;
    user.role = body.role;
    user.password = body.password;
    user.userDetail = userDetail;
    return this.userRepository.save(user);
  }

}
