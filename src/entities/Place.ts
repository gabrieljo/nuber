import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import User from "./User";

@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;
  @Column({ type: "double precision", default: 0 })
  lat: number;
  @Column({ type: "double precision", default: 0 })
  lng: number;
  @Column({ type: "text" })
  address: string;
  @Column({ type: "boolean", default: false })
  isFav: boolean;

  @ManyToOne(type => User, user => user.places)
  user: User;

  //TypeORM은 기본적으로 대상의 relation을 로드하지 않음
  //아래와 같이 지정해서 필요한 컬럼만 받도록 처리
  @Column({ type: "int", nullable: true })
  userId: number;

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}

export default Place;
