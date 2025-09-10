import { useMemo, lazy, Suspense } from "react"
import { useDataManagement } from "@/hooks/useDataManagement"
import { useGetUsersPaginatedQuery, useDeleteUserMutation } from "@/store/api"
import { DeleteConfirmationDialog } from "@/components/common/delete-confirmation-dialog"
import { DataTable } from "@/components/common/data-table"

const UserForm = lazy(() => import("@/components/forms/user-form").then(module => ({ default: module.UserForm })))
import { toast } from "sonner"
import type { User } from "@/types"

export function Users() {
  const {
    page,
    pageSize,
    isFormOpen,
    selectedItem: selectedUser,
    isEdit,
    isDeleteDialogOpen,
    itemToDelete: userToDelete,
    handleEdit,
    handleCreate,
    handleDeleteClick,
    closeForm,
    handlePageChange,
    handlePageSizeChange,
    setIsDeleteDialogOpen,
    setItemToDelete: setUserToDelete,
  } = useDataManagement<User>()
  
  const { data: usersResponse, isLoading, error } = useGetUsersPaginatedQuery({ page, limit: pageSize })
  const [deleteUser] = useDeleteUserMutation()

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return
    
    try {
      await deleteUser(userToDelete.id).unwrap()
      toast.success("User deleted successfully")
      setIsDeleteDialogOpen(false)
      setUserToDelete(undefined)
    } catch {
      toast.error("Failed to delete user")
    }
  }

  const users = usersResponse?.data || []
  const totalItems = usersResponse?.total || 0
  const totalPages = usersResponse?.totalPages || 0

  const columns = useMemo(() => [
    {
      key: "id",
      label: "ID",
      className: "text-sm font-medium text-muted-foreground",
    },
    {
      key: "name",
      label: "Name",
      className: "text-sm font-semibold",
    },
    {
      key: "username",
      label: "Username",
      className: "text-sm text-muted-foreground",
    },
    {
      key: "email",
      label: "Email",
      className: "text-sm",
    },
  ], [])

  return (
    <>
      <DataTable
        title="Users Management"
        description="Manage all users in the system"
        addButtonText="Add User"
        data={users}
        columns={columns}
        isLoading={isLoading}
        error={error}
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
        emptyMessage="No users found. Create your first user to get started."
        loadingMessage="Loading users..."
      />

      {isFormOpen && (
        <Suspense fallback={<div>Loading form...</div>}>
          <UserForm
            isOpen={isFormOpen}
            onClose={closeForm}
            user={selectedUser}
            isEdit={isEdit}
          />
        </Suspense>
      )}

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        itemName={userToDelete?.name}
      />
    </>
  )
}