import { api } from '@/config/axios.config'

import { TransferKey } from './types/transfer-key'

export const getTransferKeys = async () => {
    const response = await api.get<TransferKey[]>('/transfers/keys')
    return response.data
}
