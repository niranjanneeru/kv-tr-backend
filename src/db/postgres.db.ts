import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "../entity/employee.entity";
import Address from "../entity/address.entity";

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 8765,
    username: "postgres",
    password: "postgres",
    database: "training",
    entities: ["dist/entity/*.js"],
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    migrations: ["dist/db/migrations/*.js"]
    // synchronize: true
});

export default dataSource;