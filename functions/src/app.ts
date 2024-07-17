// imports
import * as cors from "cors";
import * as express from "express";

// contollers
import { ArticleController, DraftArticleController } from "@/controllers";

// create express app
const app = express();

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

// article routes
app.post("/articles", ArticleController.createArticle);
app.put("/articles/:articleId", ArticleController.updateArticle);
app.delete("/articles/:articleId", ArticleController.deleteArticle);
app.get("/articles", ArticleController.getAllArticles);
app.get("/articles/:articleId", ArticleController.getSingleArticle);

// draft article routes
app.post("/drafts", DraftArticleController.createDraft);
app.put("/drafts/:draftId", DraftArticleController.updateDraft);
app.post("/drafts/:draftId/publish", DraftArticleController.publishDraft);
app.delete("/drafts/:draftId", DraftArticleController.deleteDraft);
app.get("/drafts", DraftArticleController.getAllDrafts);
app.get("/drafts/:draftId", DraftArticleController.getSingleDraft);

export default app;
