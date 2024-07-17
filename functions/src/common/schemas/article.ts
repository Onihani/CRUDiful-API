// imports
import { z } from "zod";

// new article schema
export const newArticleSchema = z.object({
  title: z.string({
    required_error: "Title is required.",
  }),
  image: z.object({
    url: z
      .string({
        required_error: "Hero image is required.",
      })
      .trim(),
    alt: z.string().trim().optional(),
  }),
  content: z.string(),
});

// update article schema (at least one field is required)
export const updateArticleSchema = newArticleSchema.partial().refine(
  (data) => {
    const hasAtLeastOneField = Object.values(data).some(
      (value) => value !== undefined
    );

    return hasAtLeastOneField;
  },
  { message: "At least one field is required for a draft article." }
);

// types
export type NewArticleInput = z.infer<typeof newArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
