import "reflect-metadata";
import { DataSource } from "typeorm";

import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  synchronize: false,
  logging: false,
  entities: [Category, Specification],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: [],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

// import { createConnection, getConnectionOptions } from "typeorm";

// interface IOptions {
//   host: string;
// }

// getConnectionOptions().then((options) => {
//   const newOptions = options as IOptions;
//   newOptions.host = "database";
//   createConnection({
//     ...options,
//   });
// });

// import "reflect-metadata";
// import { DataSource } from "typeorm";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "localhost",
//   // port: process.env.NODE_ENV === "test" ? 5555 : 5432,
//   port: 5432,
//   username: "docker",
//   password: "ignite",
//   // database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
//   database: "rentx",
//   // synchronize: false,
//   logging: false,
//   entities: ["./src/database/migrations/*.ts"],
//   migrations: ["./src/modules/**/entities/*.ts"],
//   subscribers: [],
// });

// export function createConnection(
//   // host = process.env.NODE_ENV === "test" ? "localhost" : "database",
//   host = "database",
// ): Promise<DataSource> {
//   return AppDataSource.setOptions({ host }).initialize();
// }
