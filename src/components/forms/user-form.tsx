import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateUserMutation, useUpdateUserMutation } from "@/store/api"
import { userSchema, type UserFormData } from "@/lib/validations"
import { toast } from "sonner"
import type { User } from "@/types"

interface UserFormProps {
  isOpen: boolean
  onClose: () => void
  user?: User
  isEdit?: boolean
}

export function UserForm({ isOpen, onClose, user, isEdit = false }: UserFormProps) {
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
    },
  })

  // Form data'yı user prop'u değiştiğinde güncelle
  useEffect(() => {
    if (user && isEdit) {
      form.reset({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
      })
    } else if (!isEdit) {
      form.reset({
        name: "",
        username: "",
        email: "",
      })
    }
  }, [user, isEdit, form])

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isEdit && user) {
        await updateUser({
          id: user.id,
          ...data,
        }).unwrap()
        toast.success("User updated successfully")
      } else {
        await createUser(data).unwrap()
        toast.success("User created successfully")
      }
      onClose()
      form.reset()
    } catch {
      toast.error(`Failed to ${isEdit ? "update" : "create"} user`)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[540px] sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit User" : "Create User"}</SheetTitle>
          <SheetDescription>
            {isEdit ? "Edit user information below." : "Add a new user to the system."}
          </SheetDescription>
        </SheetHeader>
        <motion.div 
          className="flex flex-col  md:h-[calc(100vh-120px)]"
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter email address" {...field} />
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