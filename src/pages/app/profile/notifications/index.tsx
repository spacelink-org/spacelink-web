import { Label } from '@/components/atoms/label'
import { DataTable } from '@/components/templates/table/data-table'
import { isoToBrDate } from '@/utils/iso-to-br-date'
import { ColumnDef } from '@tanstack/react-table'

export default function Notifications() {
    type Notification = {
        id: string
        title: string
        description: string
        date: string
    }

    const columns: ColumnDef<Notification>[] = [
        {
            header: 'Título',
            accessorKey: 'title',
        },
        {
            header: 'Descrição',
            accessorKey: 'description',
        },
        {
            header: 'Data',
            accessorKey: 'date',
            cell: ({ row }) => {
                return isoToBrDate(row.original.date)
            },
        },
    ]

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col'>
                <Label className='text-2xl font-bold'>Notificações</Label>
                <Label className='text-sm font-normal text-muted-foreground'>
                    Veja todas as notificações do seu perfil
                </Label>
            </div>

            <div className='flex flex-col gap-4'>
                <DataTable columns={columns} data={[]} />
            </div>
        </div>
    )
}
