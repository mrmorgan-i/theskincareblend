"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ChevronLeftIcon, ChevronRightIcon, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  })
  

  return (
    <div className="rounded-md border">
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>View and make changes to your products</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex items-center">
              <Filter className="m-2" />
              <Input 
                placeholder="Filter Products" 
                value={(table.getColumn('title')?.getFilterValue() as string) ?? ''} 
                onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}/>
            </div>
                <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No products found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <div className="flex items-center justify-end gap-4 pt-4">
                <Button
                   variant='outline'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()} >
                  <ChevronLeftIcon className="w-4 h-4"/>
                  <span>Previous page</span>
                </Button>
                <Button 
                    variant='outline'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                  <ChevronRightIcon className="w-4 h-4"/>
                  <span>Next page</span>
                </Button>
              </div>
            </div>
        </CardContent>
        
      </Card>
      

      
    </div>
  )
}
