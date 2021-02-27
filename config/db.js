import Sequelize from "sequelize";

const db = new Sequelize(
  "agencia_de_viajes",
  "root",
  "mariadb_2021",
  {
    host: "127.0.0.1",
    port: "3306",
    dialect: "mysql",
    define: {
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorAliases: false,
  }
);

//`${process.env.MYSQL_ROOT_PASSWORD}`

export default db;
