// firebase
import { FieldValue } from "firebase-admin/firestore";

// services
import { collections, db } from "@/common/services";

// store
import DraftArticleStore from "./draft-article-store";

// types
import { Article } from "../types";
import { NewArticleInput, UpdateArticleInput } from "@/common/schemas";

class ArticleStore {
  /* === mutations === */
  static async newArticle(data: NewArticleInput) {
    const article = await collections.Article.add(data);
    return article.id;
  }

  static updateArticle(articleId: string, data: UpdateArticleInput) {
    return collections.Article.doc(articleId).update(data);
  }

  static async deleteArticle(articleId: string) {
    const articleRef = collections.Article.doc(articleId);
    const relatedDraftArticle =
      await DraftArticleStore.getDraftByPublishedArticleId(articleId);
    const relatedDraftArticleRef = relatedDraftArticle
      ? collections.DraftArticle.doc(relatedDraftArticle.id)
      : undefined;

    await db.runTransaction(async (transaction) => {
      // get article
      const article = await transaction.get(articleRef);
      const draftArticle = relatedDraftArticleRef
        ? await transaction.get(relatedDraftArticleRef)
        : undefined;

      // check if article exists
      if (!article.exists) {
        throw "Article does not exist";
      }

      // delete article
      transaction.delete(articleRef);

      // remove article reference from draft article
      if (draftArticle?.exists) {
        transaction.update(draftArticle.ref, {
          publishedArticleId: FieldValue.delete(),
        });
      }
    });
  }

  /* === queries === */
  static async getArticles() {
    const articles = await collections.Article.get();
    return articles.docs.map((article) => ({
      id: article.id,
      ...article.data(),
      createdAt: article.createTime.toDate(),
      updatedAt: article.updateTime.toDate(),
    })) as Article[];
  }

  static async getArticleById(articleId: string) {
    const article = await collections.Article.doc(articleId).get();

    if (!article.exists) return null;

    return {
      id: article.id,
      ...article.data(),
      createdAt: article.createTime?.toDate(),
      updatedAt: article.updateTime?.toDate(),
    } as Article;
  }

  static async articleExists(articleId: string) {
    const article = await collections.Article.doc(articleId).get();
    return article.exists;
  }
}

export default ArticleStore;
