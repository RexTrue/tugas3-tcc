const express = require("express");
const cors = require("cors");

require("dotenv").config();

const db =
  require("./config/database");

const noteRoutes =
  require("./routes/noteRoutes");

const app = express();

const PORT =
  process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

  res.send(
    "Backend API Running"
  );
});

app.use("/api", noteRoutes);

app.listen(
  PORT,

  "0.0.0.0",

  () => {

    console.log(
      `Server running on port ${PORT}`
    );
  }
);

(async () => {

  try {

    await db.authenticate();

    console.log(
      "Database Connected..."
    );

    // HAPUS sequelize.sync()

  } catch (error) {

    console.error(
      "DATABASE ERROR:"
    );

    console.error(
      error.message
    );
  }
})();
