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

    const notifications: Notification[] = [
        {
            id: '1',
            title: 'Nova transferência recebida',
            description:
                'Você recebeu uma transferência de R$ 1.000,00 de João Silva',
            date: '2024-01-15T10:30:00',
        },
        {
            id: '2',
            title: 'Chave PIX cadastrada com sucesso',
            description: 'Sua nova chave PIX foi cadastrada com sucesso',
            date: '2024-01-14T15:45:00',
        },
        {
            id: '3',
            title: 'Atualização de segurança',
            description: 'Por favor, atualize sua senha para maior segurança',
            date: '2024-01-13T09:15:00',
        },
    ]

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
                <DataTable columns={columns} data={notifications} />
            </div>
        </div>
    )
}
