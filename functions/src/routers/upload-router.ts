// imports
// import * as multer from "multer";
import * as express from "express";

// controllers
import { UploadController } from "@/controllers";

// create express router
const router = express.Router();

// upload image routes
router.post("/draft", UploadController.uploadDraftImage);
router.post("/blog", UploadController.uploadBlogImage);
router.post("/article", UploadController.uploadArticleImage);
router.get("/article", (req, res) => {
  res.json({ message: "Hello World" });
});

export default router;
