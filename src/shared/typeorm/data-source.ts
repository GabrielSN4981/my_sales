import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";

const port = process.env.PORT as number | undefined;
// AppDataSource serve para fazer as operações com o banco de dados
// ele é uma instância da classe DataSource do TypeORM
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ["./src/modules/**/database/entities/*.{ts, js}"],
  migrations: ["./src/shared/typeorm/migrations/*.{ts, js}"],
});
