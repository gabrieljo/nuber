import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn
} from "typeorm";
import { rideStatus } from "../types/types";
import User from "./User";
import Chat from "./Chat";

@Entity()
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"],
    default: "REQUESTING"
  })
  status: rideStatus;
  @Column({ type: "text" })
  pickUpAddress: string;
  @Column({ type: "double precision", default: 0 })
  pickUpLat: number;
  @Column({ type: "double precision", default: 0 })
  pickUpLng: number;
  @Column({ type: "text" })
  dropOffAddress: string;
  @Column({ type: "double precision", default: 0 })
  dropOffLat: number;
  @Column({ type: "double precision", default: 0 })
  dropOffLng: number;
  @Column({ type: "double precision", default: 0 })
  price: number;
  @Column({ type: "text" })
  duration: string;
  @Column({ type: "text" })
  distance: string;
  //이렇게 하면 typeorm이 자동으로 데이터 베이스를 보지 않고도 id를 붙여서 반환
  @Column({ nullable: true })
  passengerId: number;
  @Column({ nullable: true })
  driverId: number;
  //유저 모델을 이용하여 탑승자인지 드라이버인지 관계처리
  @ManyToOne(type => User, user => user.ridesAsPassenger)
  passenger: User;
  @ManyToOne(type => User, user => user.ridesAsDriver, { nullable: true })
  driver: User;

  @Column({ nullable: true })
  chatId: number;

  @OneToOne(type => Chat, chat => chat.ride, { nullable: true })
  @JoinColumn()
  chat: Chat;

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}

export default Ride;
