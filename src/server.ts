import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.static("uploads"));
app.use(cors());
// Route to serve the HLS playlist
app.get("/video/:filename", (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.resolve(__dirname, "..", "uploads", "hls", filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error serving file:", err);
      res.status(404).send("File not found");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
