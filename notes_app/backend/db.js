const mysql =
  require("mysql2");

require("dotenv").config();

const db =
  mysql.createPool({

    host:
      process.env.DB_HOST,

    user:
      process.env.DB_USER,

    password:
      process.env.DB_PASS,

    database:
      process.env.DB_NAME,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0,

    connectTimeout: 10000,
  });


// TEST CONNECTION
db.getConnection(
  (err, connection) => {

    if (err) {

      console.error(
        "DATABASE ERROR:"
      );

      console.error(err);

      return;
    }

    console.log(
      "Database Connected..."
    );

    connection.release();
  }
);

module.exports = db;
