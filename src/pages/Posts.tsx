import { useMemo, lazy, Suspense } from "react"
import { useDataManagement } from "@/hooks/useDataManagement"
import { useGetPostsPaginatedQuery, useGetUsersQuery, useDeletePostMutation } from "@/store/api"
import { DeleteConfirmationDialog } from "@/components/common/delete-confirmation-dialog"
import { DataTable } from "@/components/common/data-table"
import { User } from "lucide-react"

const PostForm = lazy(() => import("@/components/forms/post-form").then(module => ({ default: module.PostForm })))
import { toast } from "sonner"
import type { Post } from "@/types"

export function Posts() {
  const {
    page,
    pageSize,
    isFormOpen,
    selectedItem: selectedPost,
    isEdit,
    isDeleteDialogOpen,
    itemToDelete: postToDelete,
    handleEdit,
    handleCreate,
    handleDeleteClick,
    closeForm,
    handlePageChange,
    handlePageSizeChange,
    setIsDeleteDialogOpen,
    setItemToDelete: setPostToDelete,
  } = useDataManagement<Post>()
  
  const { data: postsResponse, isLoading: postsLoading, error: postsError } = useGetPostsPaginatedQuery({ page, limit: pageSize })
  const { data: users, isLoading: usersLoading } = useGetUsersQuery()
  const [deletePost] = useDeletePostMutation()

  const getUserName = (userId: number) => {
    const user = users?.find(u => u.id === userId)
    return user ? `${user.name} (${user.username})` : `User ${userId}`
  }

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return
    
    try {
      await deletePost(postToDelete.id).unwrap()
      toast.success("Post deleted successfully")
      setIsDeleteDialogOpen(false)
      setPostToDelete(undefined)
    } catch {
      toast.error("Failed to delete post")
    }
  }

  const posts = postsResponse?.data || []
  const totalItems = postsResponse?.total || 0
  const totalPages = postsResponse?.totalPages || 0

  const columns = useMemo(() => [
    {
      key: "id",
      label: "ID",
      className: "text-sm font-medium text-muted-foreground",
    },
    {
      key: "title",
      label: "Title",
      className: "max-w-[200px]",
      render: (post: Post) => (
        <div className="truncate text-sm font-semibold" title={post.title}>
          {post.title}
        </div>
      ),
    },
    {
      key: "userId",
      label: "Author",
      render: (post: Post) => (
        <div className="flex items-center gap-2">
          <User className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{getUserName(post.userId)}</span>
        </div>
      ),
    },
    {
      key: "body",
      label: "Content",
      className: "max-w-[300px]",
      render: (post: Post) => (
        <div className="truncate text-sm text-muted-foreground" title={post.body}>
          {post.body}
        </div>
      ),
    },
  ], [users])

  return (
    <>
      <DataTable
        title="Posts Management"
        description="Manage all posts in the system"
        addButtonText="Add Post"
        data={posts}
        columns={columns}
        isLoading={postsLoading || usersLoading}
        error={postsError}
        onEdit={handleEdit}
        onCreate={handleCreate}
        onDelete={handleDeleteClick}
        pagination={{
          currentPage: page,
          totalPages: totalPages,
          pageSize: pageSize,
          totalItems: totalItems,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }}
        emptyMessage="No posts found. Create your first post to get started."
        loadingMessage="Loading posts..."
      />

      {isFormOpen && (
        <Suspense fallback={<div>Loading form...</div>}>
          <PostForm
            isOpen={isFormOpen}
            onClose={closeForm}
            post={selectedPost}
            isEdit={isEdit}
          />
        </Suspense>
      )}

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Post"
        itemName={postToDelete?.title}
      />
    </>
  )
}