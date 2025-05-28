import { EntitySchema } from "typeorm";
import ContentPage from "./ContentPage.js";

const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    firstname: {
      type: "varchar",
      unique: true,
    },
    lastname: {
      type: "varchar",
      unique: true,
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
    image: {
      type: "varchar",
      nullable: true,
    },
  },
  relations: {
    contentPage: {
      type: "one-to-many",
      target: "ContentPage",
      inverseSide: "user",
      cascade: true,
    },
  },
});

export default User;
