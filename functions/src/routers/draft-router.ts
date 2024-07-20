// imports
import * as express from "express";

// controllers
import { DraftArticleController } from "@/controllers";

// create express router
const router = express.Router();

// draft article routes
router.post("/", DraftArticleController.createDraft);
router.put("/:draftId", DraftArticleController.updateDraft);
router.post("/:draftId/publish", DraftArticleController.publishDraft);
router.delete("/:draftId", DraftArticleController.deleteDraft);
router.get("/", DraftArticleController.getAllDrafts);
router.get("/:draftId", DraftArticleController.getSingleDraft);

export default router;