import express from "express"
import connectDB from "./db/connectDb";
import v1Router from "./routes";
import appConfig from "./configs/app";
import { corsConfig } from "./configs/cors";

const app = express();
const PORT = 3000;

app.use(corsConfig);
app.use(express.json());
app.use(appConfig.apiV1URL, v1Router)
app.get("/", (req, res) => {
  res.send("Welcome to the hotel management backend!");
});

async function startServer() {
    try {
      connectDB();
      app.listen(PORT || process.env.PORT, () => {
        console.log(`Server listening at http://localhost:${PORT}`);
      });
    } catch (err: any) {
      console.error("Error starting server", err);
    }
  }
  startServer();