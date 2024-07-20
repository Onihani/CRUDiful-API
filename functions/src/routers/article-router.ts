// imports
import * as express from "express";

// controllers
import { ArticleController } from "@/controllers";

// create express router
const router = express.Router();

// article routes
router.post("/", ArticleController.createArticle);
router.put("/:articleId", ArticleController.updateArticle);
router.delete("/:articleId", ArticleController.deleteArticle);
router.get("/", ArticleController.getAllArticles);
router.get("/:articleId", ArticleController.getSingleArticle);

export default router;