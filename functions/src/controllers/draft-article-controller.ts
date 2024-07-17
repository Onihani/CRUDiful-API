// firebase
import * as logger from "firebase-functions/logger";
// imports
import { Request, Response } from "express";

// stores
import { DraftArticleStore } from "@/common/stores";

// schemas
import {
  UpdateDraftArticleInput,
  newDraftArticleSchema,
  updateDraftArticleSchema,
} from "@/common/schemas";

// types
import { AppErrors } from "@/common/types";

export const createDraft = async (req: Request, res: Response) => {
  try {
    // get request body
    const { body } = req;

    // check if body was provided
    if (!body) {
      return res
        .status(400)
        .json({ message: `${AppErrors.MissingPayload} NewDraftArticleInput` });
    }

    // validate request body
    const validationResult = newDraftArticleSchema.safeParse(body);

    // check if body is valid
    if (!validationResult.success) {
      return res.status(400).json({
        message: AppErrors.InvalidPayload,
        errors: validationResult.error.errors,
      });
    }

    const draftId = await DraftArticleStore.newDraft(validationResult.data);
    return res.status(201).json({ draftId });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: AppErrors.ServerError });
  }
};

export const updateDraft = async (req: Request, res: Response) => {
  try {
    // get request params
    const { draftId } = req.params;

    // check if draftId was provided
    if (!draftId) {
      return res
        .status(400)
        .json({ message: `${AppErrors.MissingParam} "draftId"` });
    }

    // get request body
    const { body } = req;

    // check if body was provided
    if (!body) {
      return res.status(400).json({
        message: `${AppErrors.MissingPayload} UpdateDraftArticleInput`,
      });
    }

    // validate request body
    const validationResult = updateDraftArticleSchema.safeParse(body);

    // check if body is valid
    if (!validationResult.success) {
      return res.status(400).json({
        message: AppErrors.InvalidPayload,
        errors: validationResult.error.errors,
      });
    }

    // check if draft exists
    const draftExists = await DraftArticleStore.draftExists(draftId);
    if (!draftExists) {
      return res.status(404).json({ message: AppErrors.NotFound });
    }

    // update draft
    await DraftArticleStore.updateDraft(draftId, validationResult.data);
    return res.status(200).json({ message: "Draft updated" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: AppErrors.ServerError });
  }
};

export const publishDraft = async (req: Request, res: Response) => {
  try {
    // get request params
    const { draftId } = req.params;

    // check if draftId was provided
    if (!draftId) {
      return res
        .status(400)
        .json({ message: `${AppErrors.MissingParam} "draftId"` });
    }

    // get request body
    const { body } = req;

    // check if body was provided and validate it
    let validatedPayload: UpdateDraftArticleInput | undefined;
    if (body) {
      const validationResult = updateDraftArticleSchema.safeParse(body);

      // check if body is valid
      if (!validationResult.success) {
        return res.status(400).json({
          message: AppErrors.InvalidPayload,
          errors: validationResult.error.errors,
        });
      }

      validatedPayload = validationResult.data;
    }

    // check if draft exists
    const draftExists = await DraftArticleStore.draftExists(draftId);
    if (!draftExists) {
      return res.status(404).json({ message: AppErrors.NotFound });
    }

    // publish draft
    await DraftArticleStore.publishDraft(draftId, validatedPayload);
    return res.status(200).json({ message: "Draft published" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: AppErrors.ServerError });
  }
};

export const deleteDraft = async (req: Request, res: Response) => {
  try {
    // get request params
    const { draftId } = req.params;

    // check if draftId was provided
    if (!draftId) {
      return res
        .status(400)
        .json({ message: `${AppErrors.MissingParam} "draftId"` });
    }

    // check if draft exists
    const draftExists = await DraftArticleStore.draftExists(draftId);
    if (!draftExists) {
      return res.status(404).json({ message: AppErrors.NotFound });
    }

    // delete draft
    await DraftArticleStore.deleteDraft(draftId);
    return res.status(200).json({ message: "Draft deleted" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: AppErrors.ServerError });
  }
}

export const getAllDrafts = async (req: Request, res: Response) => {
  try {
    const drafts = await DraftArticleStore.getDrafts();
    return res.status(200).json(drafts);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: AppErrors.ServerError });
  }
};

export const getSingleDraft = async (req: Request, res: Response) => {
  try {
    const { draftId } = req.params;
    if (!draftId) {
      return res
        .status(400)
        .json({ message: `${AppErrors.MissingParam} "draftId"` });
    }

    const draft = await DraftArticleStore.getDraftById(draftId);
    if (!draft) {
      return res.status(404).json({ error: AppErrors.NotFound });
    }

    return res.status(200).json(draft);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: AppErrors.ServerError });
  }
};
