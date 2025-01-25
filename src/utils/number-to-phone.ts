export function numberToPhone(number: number): string {
    const phoneString = String(number).padStart(11, '0')
    return phoneString.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}
