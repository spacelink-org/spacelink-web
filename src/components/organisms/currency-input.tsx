import { Input } from '@/components/atoms/input'

interface CurrencyInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export function CurrencyInput({
    value,
    onChange,
    placeholder = 'R$ 0,00',
}: CurrencyInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, '')

        // Converte para centavos
        input = input.padStart(3, '0')
        const amount = parseInt(input) / 100

        // Formata para BRL
        const formatted = amount.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })

        onChange(formatted)
    }

    return (
        <Input
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        />
    )
}
