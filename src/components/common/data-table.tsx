import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TableSkeleton } from "@/components/common/table-skeleton"
import { Pagination } from "@/components/common/pagination"
import { Plus, Edit, Trash2, Loader2 } from "lucide-react"

interface TableColumn<T> {
  key: keyof T | string
  label: string
  render?: (item: T) => React.ReactNode
  className?: string
  headerClassName?: string
}

interface PaginationData {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

interface DataTableProps<T extends { id: number }> {
  title: string
  description: string
  addButtonText: string
  data: T[]
  columns: TableColumn<T>[]
  isLoading: boolean
  error?: Error | unknown
  onEdit: (item: T) => void
  onCreate: () => void
  onDelete: (item: T) => void
  pagination?: PaginationData
  emptyMessage?: string
  loadingMessage?: string
}

function DataTableComponent<T extends { id: number }>({
  title,
  description,
  addButtonText,
  data,
  columns,
  isLoading,
  error,
  onEdit,
  onCreate,
  onDelete,
  pagination,
  emptyMessage = "No items found. Create your first item to get started.",
  loadingMessage = "Loading..."
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">{loadingMessage}</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500">
              Failed to load data. Please try again later.
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <Button onClick={onCreate} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              {addButtonText}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <TableSkeleton rows={pagination?.pageSize || 10} columns={columns.length + 1} />
          ) : !data || data.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b">
                  {columns.map((column, index) => (
                    <TableHead key={index} className={`h-8 text-xs font-medium ${column.headerClassName || ""}`}>
                      {column.label}
                    </TableHead>
                  ))}
                  <TableHead className="h-8 text-xs font-medium text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id} className="h-10 hover:bg-muted/50">
                    {columns.map((column, index) => (
                      <TableCell key={index} className={`py-1.5 text-sm ${column.className || ""}`}>
                        {column.render ? column.render(item) : String(item[column.key as keyof T] || "")}
                      </TableCell>
                    ))}
                    <TableCell className="py-1.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 hover:bg-primary/10"
                          onClick={() => onEdit(item)}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => onDelete(item)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          {pagination && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              pageSize={pagination.pageSize}
              totalItems={pagination.totalItems}
              onPageChange={pagination.onPageChange}
              onPageSizeChange={pagination.onPageSizeChange}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export const DataTable = React.memo(DataTableComponent) as <T extends { id: number }>(
  props: DataTableProps<T>
) => React.ReactElement