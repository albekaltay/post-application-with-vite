import { z } from "zod"

export const userSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  username: z.string().min(1, "Username is required").min(3, "Username must be at least 3 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
})

export const postSchema = z.object({
  userId: z.number().min(1, "User is required"),
  title: z.string().min(1, "Title is required").min(5, "Title must be at least 5 characters"),
  body: z.string().min(1, "Content is required").min(10, "Content must be at least 10 characters"),
})

export type UserFormData = z.infer<typeof userSchema>
export type PostFormData = z.infer<typeof postSchema>