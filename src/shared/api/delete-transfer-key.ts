import { api } from '@/config/axios.config'

export const deleteTransferKey = async (keyId: string) => {
    const response = await api.delete(`/transfers/keys/delete/${keyId}`)
    return response
}
