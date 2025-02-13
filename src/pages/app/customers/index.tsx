import { Button } from '@/components/atoms/button'
import { Checkbox } from '@/components/atoms/checkbox'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/atoms/dialog'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { DataTable } from '@/components/templates/table/data-table'
import { isoToBrDate } from '@/utils/iso-to-br-date'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Loader2, FolderOpenDotIcon } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { CustomerDetails } from './components/customer-details'
import { useState } from 'react'
import { Status } from '@/shared/api/types/user'
import { getUsers } from '@/shared/api/get-customers'
import {
    createUser,
    CreateUserPayload,
    createUserSchema,
} from '@/shared/api/create-customers'
import { UserStatusBadge } from '@/components/templates/badges/user-status-badge'
import { InputMask } from '@/components/organisms/input-mask'
import { formatPhone } from '@/utils/number-to-phone'
import { formatDocument } from '@/utils/number-to-cpf'
import { useIsMobile } from '@/shared/hooks/use-mobile'

export default function CustomersPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [mutateLoading, setMutateLoading] = useState(false)

    const [document, setDocument] = useState('')
    const [phone, setPhone] = useState('')

    const containsCustomerId = searchParams.get('id')
    const addDialogOpen = searchParams.get('?') === 'true'

    const setContainsCustomerId = (value: string) => {
        setSearchParams((prev) => {
            prev.set('id', value)
            return prev
        })
    }

    const setAddDialogOpen = (value: boolean) => {
        setSearchParams((prev) => {
            prev.set('?', value.toString())
            return prev
        })
    }

    const deleteSearchParams = () => {
        setSearchParams((prev) => {
            prev.delete('id')
            return prev
        })
    }

    const deleteAddDialogOpen = () => {
        setSearchParams((prev) => {
            prev.delete('?')
            return prev
        })
    }

    const { register, handleSubmit } = useForm<CreateUserPayload>({
        resolver: zodResolver(createUserSchema),
    })

    const handleCreateUser = async (data: CreateUserPayload) => {
        setMutateLoading(true)
        await createUser({
            ...data,
            password: 'temp123!@#',
        })
            .then(() => {
                toast.success('Cliente cadastrado com sucesso')
                deleteAddDialogOpen()
                refetchUsers()
            })
            .catch((error) => {
                toast.error('Erro ao cadastrar cliente')
                deleteAddDialogOpen()
                console.log(error)
            })
            .finally(() => {
                setMutateLoading(false)
            })
    }

    const {
        data: result,
        refetch: refetchUsers,
        isLoading,
    } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers(),
    })

    const columns = [
        {
            header: 'Nome',
            accessorKey: 'name',
            cell: (info: { getValue: () => unknown }) =>
                info.getValue() as string,
        },
        {
            header: 'Email',
            accessorKey: 'email',
            cell: (info: { getValue: () => unknown }) =>
                info.getValue() as string,
            show: !useIsMobile(),
        },
        {
            header: 'Telefone',
            accessorKey: 'phone',
            cell: (info: { getValue: () => unknown }) =>
                formatPhone(info.getValue() as string),
            show: !useIsMobile(),
        },
        {
            header: 'Documento',
            accessorKey: 'document',
            cell: (info: { getValue: () => unknown }) =>
                formatDocument(info.getValue() as string),
            show: !useIsMobile(),
        },
        {
            header: 'Criado em',
            accessorKey: 'createdAt',
            cell: (info: { getValue: () => unknown }) =>
                isoToBrDate(info.getValue() as string),
            show: !useIsMobile(),
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: (info: { getValue: () => unknown }) => (
                <UserStatusBadge status={info.getValue() as Status} />
            ),
        },
        {
            header: '',
            accessorKey: 'id',
            cell: (info: { getValue: () => unknown }) => (
                <>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() =>
                            setContainsCustomerId(info.getValue() as string)
                        }
                    >
                        <FolderOpenDotIcon size={10} />
                    </Button>
                    <Dialog
                        open={containsCustomerId === info.getValue()}
                        onOpenChange={() => deleteSearchParams()}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Detalhes</DialogTitle>
                                <DialogDescription>
                                    Detalhes do cliente selecionado
                                </DialogDescription>
                            </DialogHeader>
                            <CustomerDetails
                                customerId={info.getValue() as string}
                                onDelete={() => {
                                    deleteSearchParams()
                                    refetchUsers()
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                </>
            ),
        },
    ].filter((column) => column.show !== false)

    return (
        <div>
            <Helmet title='Customers' />
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <Label className='text-2xl'>Clientes cadastrados</Label>
                        <Label className='text-sm text-muted-foreground'>
                            Total de clientes cadastrados
                        </Label>
                    </div>
                    <div className='flex gap-2'>
                        <Button
                            variant='outline'
                            onClick={() => setAddDialogOpen(true)}
                            disabled={mutateLoading}
                        >
                            {mutateLoading ? (
                                <Loader2 className='w-4 h-4 animate-spin' />
                            ) : (
                                'Cadastrar cliente'
                            )}
                        </Button>
                        <Dialog
                            open={addDialogOpen}
                            onOpenChange={() => deleteAddDialogOpen()}
                        >
                            <DialogTrigger asChild></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Cadastrar cliente</DialogTitle>
                                    <DialogDescription>
                                        Insira os dados do cliente abaixo para
                                        cadastrar
                                    </DialogDescription>
                                </DialogHeader>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-2'>
                                        <Input
                                            placeholder='Nome'
                                            {...register('name')}
                                        />
                                        <Input
                                            placeholder='Email'
                                            {...register('email')}
                                        />
                                    </div>
                                    <InputMask
                                        placeholder='Telefone'
                                        {...register('phone')}
                                        mask='(##) #####-####'
                                        onChange={(value) => setPhone(value)}
                                        value={phone}
                                    />
                                    <InputMask
                                        placeholder='Documento'
                                        {...register('document')}
                                        mask='###.###.###-##'
                                        onChange={(value) => setDocument(value)}
                                        value={document}
                                    />
                                    <div className='flex items-center gap-2 my-2'>
                                        <Checkbox />
                                        <Label>
                                            Aceitar termos de uso e política de
                                            privacidade
                                        </Label>
                                    </div>
                                    <Button
                                        onClick={handleSubmit(handleCreateUser)}
                                    >
                                        Cadastrar
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={result || []}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}
