// services
import { collections } from "@/common/services";

// store
import ArticleStore from "./article-store";

// types
import {
  newArticleSchema,
  NewArticleInput,
  NewDraftArticleInput,
  UpdateDraftArticleInput,
} from "@/common/schemas";
import { DraftArticle } from "../types";

class DraftArticleStore {
  /* === mutations === */
  static async newDraft(data: NewDraftArticleInput) {
    const article = await collections.DraftArticle.add(data);
    return article.id;
  }

  static updateDraft(articleId: string, data: UpdateDraftArticleInput) {
    return collections.DraftArticle.doc(articleId).update(data);
  }

  static async publishDraft(articleId: string, data?: UpdateDraftArticleInput) {
    // if data was provided save draft before publishing
    if (data) {
      await this.updateDraft(articleId, data);
    }

    // get draft article
    const draftArticle = await this.getDraftById(articleId);

    // validate draft article
    const result = newArticleSchema.safeParse(draftArticle);

    // if draft article is invalid throw error
    if (!result.success) {
      throw new Error(result.error.errors[0].message);
    }

    // check if draft article has already been published
    if (draftArticle?.publishedArticleId) {
      // update existing article
      ArticleStore.updateArticle(draftArticle.publishedArticleId, {
        title: draftArticle.title,
        image: draftArticle.image,
        content: draftArticle.content,
      });
    } else {
      // save new article
      const newArticleData = draftArticle as NewArticleInput;
      const newArticleId = await ArticleStore.newArticle({
        title: newArticleData.title,
        image: newArticleData.image,
        content: newArticleData.content,
      });

      // connect draft article to new article
      await collections.DraftArticle.doc(articleId).update({
        publishedArticleId: newArticleId,
      });
    }
  }

  static deleteDraft(articleId: string) {
    return collections.DraftArticle.doc(articleId).delete();
  }

  /* === queries === */
  static async getDrafts() {
    const drafts = await collections.DraftArticle.get();
    return drafts.docs.map((draft) => ({
      id: draft.id,
      ...draft.data(),
      createdAt: draft.createTime.toDate(),
      updatedAt: draft.updateTime.toDate(),
    })) as DraftArticle[];
  }

  static async getDraftById(articleId: string) {
    console.log("articleId", articleId);
    const article = await collections.DraftArticle.doc(articleId).get();

    if (!article.exists) return null;

    return {
      id: article.id,
      ...article.data(),
      createdAt: article.createTime?.toDate(),
      updatedAt: article.updateTime?.toDate(),
    } as DraftArticle;
  }

  static async draftExists(articleId: string) {
    const article = await collections.DraftArticle.doc(articleId).get();
    return article.exists;
  }

  static async getDraftByPublishedArticleId(articleId: string) {
    const draft = await collections.DraftArticle.where(
      "publishedArticleId",
      "==",
      articleId
    ).get();

    if (draft.empty) return null;

    return {
      id: draft.docs[0].id,
      ...draft.docs[0].data(),
      createdAt: draft.docs[0].createTime.toDate(),
      updatedAt: draft.docs[0].updateTime.toDate(),
    } as DraftArticle;
  }
}

export default DraftArticleStore;
