import { writeFile } from 'fs'

const normalizeIconName = (iconName: string) => {
  const nameParts = iconName.split('-')

  const result = nameParts.map((part) => {
    let p = part.split('')
    p[0] = p[0].toUpperCase()
    return p.join('')
  })

  return 'ri' + result.join('')
}

const exportIndexTypescriptFile = async (iconNames: string[]) => {
  const lines = (() => {
    return iconNames.map((iconName) => {
      const normalizedIconName = normalizeIconName(iconName)

      const line = `export { default as ${normalizedIconName} } from './${iconName}'\n`
      return line
    })
  })()

  const contents = lines.join('')

  const template = `
  export type { IconDefinition } from './types/IconDefinition'

  ${contents}
  `

  writeFile('./src/icons/index.ts', template, (err) => {
    if (err) throw new Error(err.toString())
  })
}

export default exportIndexTypescriptFile
