const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const notesRoutes = require("./routes/notes");

app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});