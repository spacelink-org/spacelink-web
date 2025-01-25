export function isoToBrDate(isoString: string): string {
    const date = new Date(isoString)
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }
    return date.toLocaleDateString('pt-BR', options)
}
