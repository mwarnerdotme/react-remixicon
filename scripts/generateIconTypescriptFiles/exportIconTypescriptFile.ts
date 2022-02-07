import { writeFile } from 'fs'
import { IconData } from './IconData'

const exportIconTypescriptFile = (iconName: string, iconData: IconData) => {
  const { pathData, fillRule } = iconData

  return new Promise<void>((resolve, reject) => {
    const template = `
    import type { IconDefinition } from "./types/IconDefinition"
  
    const iconDefinition: IconDefinition = {
      name: '${iconName}',
      pathData: '${pathData}',
      ${fillRule ? "fillRule: '" + fillRule + "'," : ''}
    }
    
    export default iconDefinition
    `

    writeFile(`./src/icons/${iconName}.ts`, template, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

export default exportIconTypescriptFile
