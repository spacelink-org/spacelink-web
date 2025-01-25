import {
    InputOTP as OTPInput,
    InputOTPGroup,
    InputOTPSlot,
} from '../atoms/input-otp'

export function InputOTP() {
    return (
        <OTPInput maxLength={7}>
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
                <InputOTPSlot index={6} />
            </InputOTPGroup>
        </OTPInput>
    )
}
