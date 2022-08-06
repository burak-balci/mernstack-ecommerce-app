import dotenv from "dotenv";
import express from "express";
import Boom from "boom";
import cors from "cors";
// import limiter from "./rate-limiter.js";
import routes from "./routes/routes.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
dotenv.config();
// app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB: Connectted"))
  .catch((err) => console.log(err.message));

app.use((req, res, next) => {
  return next(Boom.notFound("This route does not exist."));
});

app.use((err, req, res, next) => {
  console.log(err);

  if (err) {
    if (err.output) {
      return res.status(err.output.statusCode || 500).json(err.output.payload);
    }

    return res.status(500).json(err);
  }
});

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(process.env.PORT || 4000, () => console.log("Server is up!"));
