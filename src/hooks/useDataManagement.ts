import { useState, useCallback } from "react"

interface DataManagementState<T> {
  page: number
  pageSize: number
  isFormOpen: boolean
  selectedItem: T | undefined
  isEdit: boolean
  isDeleteDialogOpen: boolean
  itemToDelete: T | undefined
}

interface DataManagementActions<T> {
  handleEdit: (item: T) => void
  handleCreate: () => void
  handleDeleteClick: (item: T) => void
  closeForm: () => void
  handlePageChange: (newPage: number) => void
  handlePageSizeChange: (newPageSize: number) => void
  setIsDeleteDialogOpen: (open: boolean) => void
  setItemToDelete: (item: T | undefined) => void
}

export function useDataManagement<T extends { id: number }>(): DataManagementState<T> & DataManagementActions<T> {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<T | undefined>()
  const [isEdit, setIsEdit] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<T | undefined>()

  const handleEdit = useCallback((item: T) => {
    setSelectedItem(item)
    setIsEdit(true)
    setIsFormOpen(true)
  }, [])

  const handleCreate = useCallback(() => {
    setSelectedItem(undefined)
    setIsEdit(false)
    setIsFormOpen(true)
  }, [])

  const handleDeleteClick = useCallback((item: T) => {
    setItemToDelete(item)
    setIsDeleteDialogOpen(true)
  }, [])

  const closeForm = useCallback(() => {
    setIsFormOpen(false)
    setSelectedItem(undefined)
    setIsEdit(false)
  }, [])

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
  }, [])

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize)
    setPage(1) // Reset to first page when changing page size
  }, [])

  return {
    // State
    page,
    pageSize,
    isFormOpen,
    selectedItem,
    isEdit,
    isDeleteDialogOpen,
    itemToDelete,
    // Actions
    handleEdit,
    handleCreate,
    handleDeleteClick,
    closeForm,
    handlePageChange,
    handlePageSizeChange,
    // Setters for external use
    setIsDeleteDialogOpen,
    setItemToDelete,
  }
}