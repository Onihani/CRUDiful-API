// firebase
import * as logger from "firebase-functions/logger";
// imports
import { Request, Response } from "express";

// stores
import { ArticleStore } from "@/common/stores";

// schemas
import { newArticleSchema, updateArticleSchema } from "@/common/schemas";

// types
import { AppErrors } from "@/common/types";

export const createArticle = async (req: Request, res: Response) => {
  try {
    // get request body
    const { body } = req;

    // check if body was provided
    if (!body) {
      return res
        .status(400)
        .json({ message: `${AppErrors.MissingPayload} NewArticleInput` });
    }

    // validate request body
    const validationResult = newArticleSchema.safeParse(body);

    // check if body is valid
    if (!validationResult.success) {
      return res.status(400).json({
        message: AppErrors.InvalidPayload,
        errors: validationResult.error.errors,
      });
    }

    const articleId = await ArticleStore.newArticle(validationResult.data);
    return res.status(201).json({ articleId });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: AppErrors.ServerError });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    // get request params
    const { articleId } = req.params;

    // check if articleId was provided
    if (!articleId) {
      return res
        .status(400)
        .json({ message: `${AppErrors.MissingParam} "articleId"` });
    }

    // get request body
    const { body } = req;

    // check if body was provided
    if (!body) {
      return res
        .status(400)
        .json({ message: `${AppErrors.MissingPayload} UpdateArticleInput` });
    }

    // validate request body
    const validationResult = updateArticleSchema.safeParse(body);

    // check if body is valid
    if (!validationResult.success) {
      return res.status(400).json({
        message: AppErrors.InvalidPayload,
        errors: validationResult.error.errors,
      });
    }

    // check if article exists
    const articleExists = await ArticleStore.articleExists(articleId);
    if (!articleExists) {
      return res.status(404).json({ error: AppErrors.NotFound });
    }

    // update article
    await ArticleStore.updateArticle(articleId, body);
    return res.status(200).send({
      message: "Article updated",
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: AppErrors.ServerError });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;

    if (!articleId) {
      return res
        .status(400)
        .json({ message: `${AppErrors.MissingParam} "articleId"` });
    }

    // check if article exists
    const articleExists = await ArticleStore.articleExists(articleId);
    if (!articleExists) {
      return res.status(404).json({ error: AppErrors.NotFound });
    }

    await ArticleStore.deleteArticle(articleId);
    return res.status(200).json({ message: "Article deleted" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: AppErrors.ServerError });
  }
};

export const getAllArticles = async (req: Request, res: Response) => {
  try {
    const articles = await ArticleStore.getArticles();
    return res.status(200).json(articles);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: AppErrors.ServerError });
  }
};

export const getSingleArticle = async (req: Request, res: Response) => {
  try {
    const { articleId } = req.params;
    if (!articleId) {
      return res
        .status(400)
        .json({ message: `${AppErrors.MissingParam} "articleId"` });
    }

    const article = await ArticleStore.getArticleById(articleId);
    if (!article) {
      return res.status(404).json({ error: AppErrors.NotFound });
    }

    return res.status(200).json(article);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: AppErrors.ServerError });
  }
};
