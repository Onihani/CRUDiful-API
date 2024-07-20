// imports
import * as cors from "cors";
import * as express from "express";
import * as fileParser from "express-multipart-file-parser";

// routers
import { articleRouter, draftRouter, uploadRouter } from "@/routers";

// controllers
import { BlogController } from "@/controllers";

// create express app
const app = express();

// accept files
app.use(fileParser);

// enable cors
app.use(cors());

// body parser
app.use(express.json({ strict: false }));

// middlware to modify request body
app.use((req, res, next) => {
  const { body } = req;
  
  // check if body is an empty object
  if (Object.keys(body).length === 0) {
    req.body = undefined
  }

  next();
});

// hello world route
app.get("/", (req, res) => {
  // get query params
  const { name } = req.query;

  // send response
  res.json({
    message: `Hello ${name ?? "World"}!`,
  });
});

// blog routes
app.get("/blog", BlogController.getBlog);

// upload image routes
app.use("/upload", uploadRouter);

// draft article routes
app.use("/drafts", draftRouter);

// article routes
app.use("/articles", articleRouter);

export default app;
