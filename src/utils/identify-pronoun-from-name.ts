export const identifyPronounFromName = (name: string): string => {
    const femaleEndings = ['a', 'na', 'lla', 'ela', 'ina', 'isa']
    const maleEndings = ['o', 'os', 'on', 'son', 'ton', 'or']

    const lowercaseName = name.toLowerCase().trim()

    if (femaleEndings.some((ending) => lowercaseName.endsWith(ending))) {
        return 'Bem-vinda'
    }

    if (maleEndings.some((ending) => lowercaseName.endsWith(ending))) {
        return 'Bem-vindo'
    }

    return 'Bem-vindo(a)'
}
