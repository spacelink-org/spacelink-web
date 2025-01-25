export function getGreetingByHour(hour: number): string {
    if (hour < 0 || hour > 23) {
        throw new Error('Hour must be between 0 and 23')
    }

    if (hour < 12) {
        return 'Bom dia'
    } else if (hour < 18) {
        return 'Boa tarde'
    } else {
        return 'Boa noite'
    }
}
