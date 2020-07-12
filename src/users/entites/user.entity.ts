import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { hash } from 'bcrypt';

import { UserRole } from '../enums';
import { SoftDelete } from '../../common/core/soft-delete';
import { UserDetail } from './user-detail.entity';

@Entity('user')
export class User extends SoftDelete {

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @OneToOne(() => UserDetail, userDetail => userDetail.user)
  @JoinColumn()
  userDetail: UserDetail;

  @BeforeInsert()
  preProcess() {
    return hash(this.password, 10).then(encrypted => this.password = encrypted);
  }
}
