const express = require("express");
const cors = require("cors");
require("dotenv").config();

const notesRoutes = require("./routes/notes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend API Running");
});

app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
