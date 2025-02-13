import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { DataTable } from '@/components/templates/table/data-table'
import { getTransferKeys } from '@/shared/api/get-transfer-keys'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/atoms/dialog'
import { useQuery } from '@tanstack/react-query'
import {
    createTransferKey,
    CreateTransferKeySchema,
    CreateTransferPayload,
} from '@/shared/api/create-transfer-key'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isoToBrDate } from '@/utils/iso-to-br-date'
import { ColumnDef } from '@tanstack/react-table'
import { TransferKey } from '@/shared/api/types/transfer-key'
import { Plus, Trash } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogTitle,
    AlertDialogContent,
    AlertDialogTrigger,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/atoms/alert-dialog'
import { deleteTransferKey } from '@/shared/api/delete-transfer-key'
import { useIsMobile } from '@/shared/hooks/use-mobile'

export default function Billing() {
    const { data: result, refetch } = useQuery({
        queryKey: ['transfer-keys'],
        queryFn: () => getTransferKeys(),
    })

    const { register, handleSubmit } = useForm<CreateTransferPayload>({
        resolver: zodResolver(CreateTransferKeySchema),
    })

    const handleCreateTransferKey = async (data: CreateTransferPayload) => {
        await createTransferKey({
            key: data.key,
        })
            .then(() => {
                toast.success('Chave de transferência criada com sucesso')
                refetch()
            })
            .catch((error) => {
                toast.error('Erro ao criar chave de transferência')
                console.error(error)
            })
    }

    const handleDeleteTransferKey = async (keyId: string) => {
        await deleteTransferKey(keyId)
            .then(() => {
                toast.success('Chave de transferência excluída com sucesso')
                refetch()
            })
            .catch((error) => {
                toast.error('Erro ao excluir chave de transferência')
                console.error(error)
            })
    }

    const columns: ColumnDef<TransferKey>[] = [
        {
            header: 'Chave',
            accessorKey: 'key',
        },
        {
            header: 'Criado em',
            accessorKey: 'createdAt',
            cell: ({ row }) => {
                return (
                    <span>
                        {isoToBrDate(row.original.createdAt.toString())}
                    </span>
                )
            },
        },
        {
            header: '',
            accessorKey: 'id',
            cell: ({ row }) => {
                return (
                    <div className='flex justify-end gap-2'>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button variant='secondary' size='icon'>
                                    <Trash />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <div className='flex flex-col gap-2'>
                                    <AlertDialogTitle>
                                        Excluir chave de transferência
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Tem certeza que deseja excluir esta
                                        chave de transferência?
                                    </AlertDialogDescription>
                                </div>
                                <div className='flex justify-end gap-2'>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() =>
                                            handleDeleteTransferKey(
                                                row.original.id
                                            )
                                        }
                                    >
                                        Excluir
                                    </AlertDialogAction>
                                </div>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                )
            },
        },
    ]

    return (
        <div className='flex w-full flex-col gap-4'>
            <div className='flex items-center gap-2 justify-between'>
                <div className='flex flex-col'>
                    <Label className='text-lg font-semibold'>
                        Chaves de transferência
                    </Label>
                    <Label className='text-sm text-muted-foreground font-normal'>
                        Gerencie suas chaves de transferência.
                    </Label>
                </div>
                <Dialog>
                    <DialogTrigger>
                        <Button
                            variant='secondary'
                            size={useIsMobile() ? 'icon' : 'default'}
                        >
                            {useIsMobile() ? <Plus /> : 'Adicionar chave'}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <div className='flex flex-col'>
                            <DialogTitle>Adicionar chave</DialogTitle>
                            <DialogDescription>
                                Adicione uma nova chave de transferência.
                            </DialogDescription>
                        </div>
                        <Input
                            placeholder='Chave de transferência (PIX)'
                            {...register('key')}
                        />
                        <Button onClick={handleSubmit(handleCreateTransferKey)}>
                            Adicionar
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
            <DataTable columns={columns} data={result ?? []} />
        </div>
    )
}
