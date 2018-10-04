import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
} from "typeorm";
import { verificationTarget } from "../types/types";

const PHONE = "PHONE";
const EMAIL = "EMAIL";
@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "text", enum: [PHONE, EMAIL] })
  target: verificationTarget;
  @Column({ type: "text" })
  payload: string;
  @Column({ type: "text" })
  key: string;
  @Column({ type: "boolean", default: false })
  verified: boolean;
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
  //이메일이나 전화 인증 처리 관계

  @BeforeInsert()
  createKey(): void {
    if (this.target === PHONE) {
      //phone으로 인증받을때는 5자리 랜덤키 생성
      this.key = Math.floor(Math.random() * 100000).toString();
    } else {
      //email로 인증받을때 특수문자 랜덤으로 생성
      this.key = Math.random()
        .toString(36)
        .substr(2);
    }
  }
}

export default Verification;
