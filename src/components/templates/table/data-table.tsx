import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    HeaderGroup,
    Header,
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/atoms/table'
import { DataTableLoading } from '../loading/data-table-loading'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isLoading?: boolean
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isLoading = false,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-full border rounded-md p-4'>
                <DataTableLoading />
            </div>
        )
    }

    return (
        <div className='rounded-md border'>
            <Table>
                <TableHeader>
                    {table
                        .getHeaderGroups()
                        .map((headerGroup: HeaderGroup<TData>) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(
                                    (header: Header<TData, unknown>) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        )
                                    }
                                )}
                            </TableRow>
                        ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel?.()?.rows?.length ? (
                        table.getRowModel?.()?.rows?.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected?.() && 'selected'}
                            >
                                {row
                                    .getVisibleCells?.()
                                    ?.map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className='h-24 text-center'
                            >
                                Nenhum resultado.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
