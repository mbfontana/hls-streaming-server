import express from "express";

const app = express();
const PORT = 3000;

// Serve static files (HLS chunks and playlists)
app.use(express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
