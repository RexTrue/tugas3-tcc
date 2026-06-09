const express =
  require("express");

const cors =
  require("cors");

require("dotenv").config();
const db =
  require("./db");

const noteRoutes =
  require("./routes/notes");

const app =
  express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {

  res.send(
    "Backend API Running"
  );
});

app.use("/api", notes);

const PORT =
  process.env.PORT || 3000;

// EXPRESS START DULU
app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `Server running on port ${PORT}`
    );
  }
);

// DATABASE ASYNC
(async () => {
  try {
    await db.authenticate();
    console.log(
      "Database Connected..."
    );
  } catch (error) {
    console.error(
      error.message
    );
  }
})();
