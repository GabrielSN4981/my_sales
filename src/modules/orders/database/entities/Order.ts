import { Customer } from "@modules/customers/database/entities/Customer";
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrdersProducts } from "./OrdersProducts";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  // um customer pode ter varias orders
  @ManyToOne(() => Customer)
  // passar o nome da foreign que se conecta ao customer, que é o customer_id
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @OneToMany(() => OrdersProducts, (order_products) => order_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
