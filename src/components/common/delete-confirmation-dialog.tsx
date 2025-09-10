import { motion } from "motion/react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteConfirmationDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title: string
  itemName?: string
  description?: string
  isLoading?: boolean
}

export function DeleteConfirmationDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  title,
  itemName,
  description,
  isLoading = false,
}: DeleteConfirmationDialogProps) {
  const defaultDescription = itemName 
    ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
    : "Are you sure you want to delete this item? This action cannot be undone."

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div
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
            <AlertDialogHeader>
              <motion.div variants={{ hidden: { opacity: 0, y: -10 }, show: { opacity: 1, y: 0 } }}>
                <AlertDialogTitle>{title}</AlertDialogTitle>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: -10 }, show: { opacity: 1, y: 0 } }}>
                <AlertDialogDescription>
                  {description || (
                    itemName ? (
                      <>
                        Are you sure you want to delete "<strong>{itemName}</strong>"? This action cannot be undone.
                      </>
                    ) : (
                      defaultDescription
                    )
                  )}
                </AlertDialogDescription>
              </motion.div>
            </AlertDialogHeader>
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </motion.div>
          </motion.div>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  )
}