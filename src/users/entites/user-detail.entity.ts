import { Column, Entity, OneToOne } from 'typeorm';

import { SoftDelete } from '../../common/core/soft-delete';
import { User } from './user.entity';

@Entity('user_detail')
export class UserDetail extends SoftDelete {
  @Column()
  personalId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  address1: string;

  @Column()
  address2: string;

  @Column()
  area: string;

  @Column()
  state: string;

  @OneToOne(() => User, user => user.userDetail)
  user: User;
}