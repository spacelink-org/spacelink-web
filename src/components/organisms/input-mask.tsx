import * as React from 'react'
import { Input } from '@/components/atoms/input'
import { cn } from '@/shared/types/cn'

interface InputMaskProps
    extends Omit<React.ComponentProps<'input'>, 'onChange'> {
    mask?: string
    onChange?: (value: string) => void
}

const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
    ({ className, mask, onChange, value, ...props }, ref) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let inputValue = e.target.value.replace(/\D/g, '')
            const maxLength = mask
                ? mask.replace(/[^#]/g, '').length
                : inputValue.length
            inputValue = inputValue.slice(0, maxLength)

            if (mask) {
                let maskedValue = ''
                let maskIndex = 0
                let valueIndex = 0

                while (maskIndex < mask.length) {
                    if (valueIndex >= inputValue.length) break

                    if (mask[maskIndex] === '#') {
                        maskedValue += inputValue[valueIndex]
                        valueIndex++
                    } else {
                        maskedValue += mask[maskIndex]
                    }
                    maskIndex++
                }

                e.target.value = maskedValue
                onChange?.(maskedValue)
            } else {
                onChange?.(inputValue)
            }
        }

        return (
            <Input
                className={cn(className)}
                value={value}
                onChange={handleChange}
                ref={ref}
                {...props}
            />
        )
    }
)

InputMask.displayName = 'InputMask'

export { InputMask }
