import { BaseEntity ,Column , Entity ,  PrimaryGeneratedColumn , ManyToOne , JoinColumn} from 'typeorm';
import { Client } from './Client';

export enum TransactionTypes {
  DEPOSITE="deposite",
  WITHDRAW = "withdraw"
}

@Entity("transactions")
export class Transactions extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: TransactionTypes
  })
  type: string

  @Column({
    type: 'numeric'
  })
  amount: number

  @ManyToOne(
    ()=>Client,
    client => client.transaction,
    {
      onDelete: "CASCADE"
    }
  )

  @JoinColumn({
    name: 'client_id'
  })
  client: Client
}