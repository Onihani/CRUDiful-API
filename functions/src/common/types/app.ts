type ArticleHero = {
  url: string;
  alt?: string;
};

export type Article = {
  id: string;
  title: string;
  image: ArticleHero;
  content: string;
  createdAt: Date | number;
  updatedAt: Date | number;
};

export type DraftArticle = Article & {
  publishedArticleId?: string;
}