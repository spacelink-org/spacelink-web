import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { deleteUser } from '@/shared/api/delete-user'
import { getUserById } from '@/shared/api/get-user-by-id'
import {
    updateUser,
    UpdateUserPayload,
    UpdateUserSchema,
} from '@/shared/api/update-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface CustomerDetailsProps {
    customerId: string
    onDelete: () => void
}

export function CustomerDetails({
    customerId,
    onDelete,
}: CustomerDetailsProps) {
    const [isEditing, setIsEditing] = useState(false)

    const { data: result, refetch: refetchUser } = useQuery({
        queryKey: ['user', customerId],
        queryFn: () => getUserById({ customerId }),
        enabled: !!customerId,
    })

    const handleDeleteUser = async (id: string) => {
        await deleteUser(id)
            .then(() => {
                toast.success('Cliente deletado com sucesso')
                onDelete()
            })
            .catch((err) => {
                toast.error('Erro ao deletar cliente')
                console.error(err)
            })
    }

    const { register, setValue, handleSubmit } = useForm<UpdateUserPayload>({
        resolver: zodResolver(UpdateUserSchema),
    })

    const updateUserMutation = useMutation({
        mutationFn: updateUser,
    })

    const handleUpdateUser = (data: UpdateUserPayload) => {
        updateUserMutation
            .mutateAsync({
                id: customerId,
                name: data.name,
                email: data.email,
                document: data.document,
                phone: data.phone,
            })
            .then(() => {
                toast.success('Cliente atualizado com sucesso')
                setIsEditing(false)
                refetchUser()
            })
            .catch((err) => {
                toast.error('Erro ao atualizar cliente')
                console.error(err)
            })
    }

    useEffect(() => {
        refetchUser()
        setValue('name', result?.name)
        setValue('email', result?.email)
        setValue('phone', result?.phone)
        setValue('document', result?.document)
    }, [result, setValue, refetchUser])

    return (
        <div>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <Input
                        placeholder='Nome'
                        readOnly={!isEditing}
                        {...register('name')}
                    />
                    <Input
                        placeholder='Email'
                        readOnly={!isEditing}
                        {...register('email')}
                    />
                    <Input
                        placeholder='Telefone'
                        readOnly={!isEditing}
                        {...register('phone')}
                    />
                    <Input
                        placeholder='Documento'
                        readOnly={!isEditing}
                        {...register('document')}
                    />
                    <div className='flex gap-2'>
                        {isEditing && (
                            <Button
                                variant='outline'
                                onClick={() => setIsEditing(false)}
                                className='w-full'
                            >
                                Cancelar
                            </Button>
                        )}
                        <Button
                            onClick={
                                isEditing
                                    ? handleSubmit(handleUpdateUser)
                                    : () => setIsEditing(true)
                            }
                            className='w-full'
                        >
                            {isEditing ? 'Salvar' : 'Editar'}
                        </Button>
                        {!isEditing && (
                            <div>
                                <Button
                                    variant='destructive'
                                    size='icon'
                                    onClick={() => handleDeleteUser(customerId)}
                                >
                                    <Trash />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
