// imports
import { Request, Response } from "express";

// services
import { collections } from "@/common/services";

// stores
import { ArticleStore, DraftArticleStore } from "@/common/stores";

export const getBlog = async (req: Request, res: Response) => {
  // get blog config
  const blog = await collections.Blog.doc("config").get();
  const blogData = blog.exists ? blog.data() : {};

  // get articles and drafts
  const articles = await ArticleStore.getArticles();

  // get draft articles
  const drafts = await DraftArticleStore.getDrafts();

  // send response
  res.json({
    ...blogData,
    articles,
    drafts,
  });
};
