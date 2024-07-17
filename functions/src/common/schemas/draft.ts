// imports
import { z } from "zod";

// shemas
import { newArticleSchema } from "./article";

// new draft article schema (all fields  are optional except title)
export const newDraftArticleSchema = newArticleSchema.partial({
  image: true,
  content: true,
});

// update draft article schema (at least one field is required)
export const updateDraftArticleSchema = newDraftArticleSchema.partial().refine(
  (data) => {
    const hasAtLeastOneField = Object.values(data).some(
      (value) => value !== undefined
    );

    return hasAtLeastOneField;
  },
  { message: "At least one field is required for a draft article." }
);

// types
export type NewDraftArticleInput = z.infer<typeof newDraftArticleSchema>;
export type UpdateDraftArticleInput = z.infer<typeof updateDraftArticleSchema>;
