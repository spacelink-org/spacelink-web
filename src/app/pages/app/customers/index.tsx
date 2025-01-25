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
import { DataTable } from '@/components/templates/table/row'
import { isoToBrDate } from '@/utils/iso-to-br-date'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Pencil, Loader2 } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { CustomerDetails } from './components/customer-details'
import { useState } from 'react'
// import { CustomerTableFilters } from './components/customer-filters'
import { getUsers } from '@/shared/api/get-users'
import {
    createUser,
    CreateUserPayload,
    createUserSchema,
} from '@/shared/api/create-user'

export default function CustomersPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [mutateLoading, setMutateLoading] = useState(false)

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

    const { data: result, refetch: refetchUsers } = useQuery({
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
        },
        {
            header: 'Telefone',
            accessorKey: 'phone',
            cell: (info: { getValue: () => unknown }) =>
                info.getValue() as string,
        },
        {
            header: 'Criado em',
            accessorKey: 'createdAt',
            cell: (info: { getValue: () => unknown }) =>
                isoToBrDate(info.getValue() as string),
        },
        {
            header: '',
            accessorKey: 'id',
            cell: (info: { getValue: () => unknown }) => (
                <>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() =>
                            setContainsCustomerId(info.getValue() as string)
                        }
                    >
                        <Pencil />
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
    ]

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
                                    <Input
                                        placeholder='Telefone'
                                        {...register('phone')}
                                    />
                                    <Input
                                        placeholder='Documento'
                                        {...register('document')}
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
                {/* <div className='flex justify-center w-full'>
                    <CustomerTableFilters />
                </div> */}
                <DataTable columns={columns} data={result || []} />
            </div>
        </div>
    )
}
