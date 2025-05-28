import { EntitySchema } from "typeorm";
import User from "./User.js";

const ContentPage = new EntitySchema({
  name: "ContentPage",
  tableName: "contentPage",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    category: {
      type: "varchar",
      nullable: true,
    },
    title: {
      type: "varchar",
    },
    description: {
      type: "text",
      nullable: true,
    },
    image: {
      type: "varchar",
      nullable: true,
    },
    gif: {
      type: "varchar",
      nullable: true,
    },
    gifPositionX: {
      type: "float",
      default: 0,
    },
    gifPositionY: {
      type: "float",
      default: 0,
    },
    date: {
      type: "date",
      nullable: true,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },
  },
});

export default ContentPage;
