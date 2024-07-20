// firebase
import * as logger from "firebase-functions/logger";
// imports
import * as uuid from "uuid";
import { Request, Response } from "express";

// services
import { collections, storage } from "@/common/services";

// types
import { AppErrors } from "@/common/types";

export const uploadBlogImage = async (req: Request, res: Response) => {
  try {
    // get file from request
    const file = req.files?.at(0);

    // check if file was provided
    if (!file) {
      return res
        .status(400)
        .json({ message: `${AppErrors.MissingPayload} "file"` });
    }

    // get file extension
    const fileExtension = file.originalname.split(".").pop();

    // create file path
    const filePath = `/blog/cover.${fileExtension}`;

    // get file ref
    const bucketFile = storage.bucket().file(filePath);

    // save file to bucket
    await bucketFile.save(file.buffer, {
      contentType: file.mimetype,
    });

    // get public url
    const [url] = await bucketFile.getSignedUrl({
      action: "read",
      expires: "01-01-2050",
    });

    // create or update blog collection config
    await collections.Blog.doc("config").set({
      cover: url,
    });

    return res
      .status(201)
      .json({ url, message: "Image uploaded successfully" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: AppErrors.ServerError });
  }
};

export const uploadDraftImage = async (req: Request, res: Response) => {
  try {
    // get file from request
    const file = req.files?.at(0);

    // check if file was provided
    if (!file) {
      return res
        .status(400)
        .json({ message: `${AppErrors.MissingPayload} "file"` });
    }

    // get file extension
    const fileExtension = file.originalname.split(".").pop();

    // create file path
    const filePath = `/drafts/${uuid.v4()}.${fileExtension}`;

    // get file ref
    const bucketFile = storage.bucket().file(filePath);

    // save file to bucket
    await bucketFile.save(file.buffer, {
      contentType: file.mimetype,
    });

    // get public url
    const [url] = await bucketFile.getSignedUrl({
      action: "read",
      expires: "01-01-2050",
    });

    return res
      .status(201)
      .json({ url, message: "Image uploaded successfully" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: AppErrors.ServerError });
  }
}

export const uploadArticleImage = async (req: Request, res: Response) => {
  try {
    // get file from request
    const file = req.files?.at(0);

    // check if file was provided
    if (!file) {
      return res
        .status(400)
        .json({ message: `${AppErrors.MissingPayload} "file"` });
    }

    // get file extension
    const fileExtension = file.originalname.split(".").pop();

    // create file path
    const filePath = `/articles/${uuid.v4()}.${fileExtension}`;

    // get file ref
    const bucketFile = storage.bucket().file(filePath);

    // save file to bucket
    await bucketFile.save(file.buffer, {
      contentType: file.mimetype,
    });

    // get public url
    const [url] = await bucketFile.getSignedUrl({
      action: "read",
      expires: "01-01-2050",
    });

    return res
      .status(201)
      .json({ url, message: "Image uploaded successfully" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: AppErrors.ServerError });
  }
}