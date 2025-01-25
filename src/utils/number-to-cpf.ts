export function numberToCpf(number: number): string {
    const cpfString = String(number).padStart(11, '0')
    return cpfString
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}
