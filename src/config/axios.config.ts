import axios from 'axios'
import { env } from '@/config/env.config'

export const api = axios.create({
    baseURL: env.VITE_API_URL,
    withCredentials: true,
})
