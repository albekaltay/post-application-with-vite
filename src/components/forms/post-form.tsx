import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreatePostMutation, useUpdatePostMutation, useGetUsersQuery } from "@/store/api"
import { postSchema, type PostFormData } from "@/lib/validations"
import { toast } from "sonner"
import type { Post } from "@/types"

interface PostFormProps {
  isOpen: boolean
  onClose: () => void
  post?: Post
  isEdit?: boolean
  preselectedUserId?: number
}

export function PostForm({ isOpen, onClose, post, isEdit = false, preselectedUserId }: PostFormProps) {
  const { data: users } = useGetUsersQuery()
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation()
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      userId: preselectedUserId || 1,
      title: "",
      body: "",
    },
  })

  // Form data'yı post prop'u değiştiğinde güncelle
  useEffect(() => {
    if (post && isEdit) {
      form.reset({
        userId: post.userId,
        title: post.title || "",
        body: post.body || "",
      })
    } else if (!isEdit) {
      form.reset({
        userId: preselectedUserId || 1,
        title: "",
        body: "",
      })
    }
  }, [post, isEdit, preselectedUserId, form])

  const onSubmit = async (data: PostFormData) => {
    try {
      if (isEdit && post) {
        await updatePost({
          id: post.id,
          ...data,
        }).unwrap()
        toast.success("Post updated successfully")
      } else {
        await createPost(data).unwrap()
        toast.success("Post created successfully")
      }
      onClose()
      form.reset()
    } catch {
      toast.error(`Failed to ${isEdit ? "update" : "create"} post`)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[540px] sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit Post" : "Create Post"}</SheetTitle>
          <SheetDescription>
            {isEdit ? "Edit post information below." : "Add a new post to the system."}
          </SheetDescription>
        </SheetHeader>
        <motion.div 
          className="flex flex-col h-[calc(100vh-120px)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
              <motion.div 
                className="flex-1 space-y-6 py-6"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                  <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User *</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            value={field.value}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {users?.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name} ({user.username})
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter post title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                  <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content *</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter post content"
                            rows={6}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </motion.div>
              <SheetFooter className="flex gap-3">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating || isUpdating}>
                  {isCreating || isUpdating ? "Saving..." : isEdit ? "Update" : "Create"}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </motion.div>
      </SheetContent>
    </Sheet>
  )
}