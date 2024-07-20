export enum AppErrors {
  NotFound = "The requested resource was not found.",
  ServerError = "Your request could not be fullfiled at this time. Please try again later.",
  Unauthroized = "User is not authorized to perform this action.",
  MissingParam = "Invalid request you're missing the following parameter: ",
  MissingPayload = "Invalid request you're missing the following payload: ",
  InvalidPayload = "Invalid request, please check your payload and try again.",
}

export enum CollectionNames {
  Blog = "Blog",
  Article = "Article",
  DraftArticle = "DraftArticle",
}
