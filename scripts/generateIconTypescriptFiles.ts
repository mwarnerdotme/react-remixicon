// This file will generate an {iconName}.ts file for every
// icon in the `remixicon` library as of remixicon version
// 2.5.0. These files will be exported in the dist files.

import { readFile, writeFile, readdir } from 'fs'

const lookupIconSVGFilepaths = (baseFilepath: string) => {
  return new Promise<string[]>((resolve, reject) => {
    // get array of directories in the base directory
    readdir(baseFilepath, async (err, subDirectories) => {
      if (err) throw new Error(err.toString())
  
      let filepaths: string[] = []
  
      // get filepaths from every directory in base
      for (const subDirectory of subDirectories) {
        await new Promise<void>((resolve, reject) => {
          readdir(`${baseFilepath}/${subDirectory}`, async (err, filenames) => {
            if (err) {
              reject(err)
              return
            }

            const newFilepaths = filenames.map((filename) => {
              return `${baseFilepath}/${subDirectory}/${filename}`
            })
  
            // append the new filepaths
            filepaths = [...filepaths, ...newFilepaths]
            resolve()
          })
        }).catch((err) => {
          reject(err)
        })
      }
  
      resolve(filepaths)
    })
  })
}

const readIconSVGFile = (filepath: string) => {
  return new Promise<string[]>((resolve, reject) => {
    readFile(filepath, (err, data) => {
      if (err) reject(new Error(err.toString()))
      
      const file = data.toString()  
      const lines = file.split(/\r?\n/)
      resolve(lines)
    })
  })
}

const extractIconName = (filepath: string): string => {
  const possibleIconName = filepath.match(/(?<=node_modules\/remixicon\/icons\/.*\/)(.*)(?=\.svg)/)
  if (!possibleIconName || !possibleIconName[0]) throw new Error('could not determine icon name')
  return possibleIconName[0]
}

const extractPathData = async (content: string[]): Promise<string> => {
  for (const line of content) {
    if (line.includes("<path d=")) {
      const possiblePathData = line.match(/(?<=d=\")(.*)(?=\")/)
      if (!possiblePathData || !possiblePathData[0])
        throw new Error('error parsing path data in the file')
  
      const pathData = possiblePathData[0]

      return pathData      
    }

  }

  throw new Error('no path data found in the file')
}

const exportIconTypescriptFile = (iconName: string, pathData: string) => {
  const template = `
  import type { IconDefinition } from "./types/IconDefinition"

  const iconDefinition: IconDefinition = {
    name: '${iconName}',
    pathData: '${pathData}',
  }
  
  export default iconDefinition
  `

  writeFile(`./src/icons/${iconName}.ts`, template, (err) => {
    if (err) throw new Error(err.toString())
    console.log(`Successfully generated an icon file for ${iconName}`)
  })
}

const exportIndexTypescriptFile = (iconNames: string[]) => {
  let contents = ''
  iconNames.forEach(iconName => {
    const normalizedIconName = (() => {
      const split = iconName.split('-')

      const split2 = split.map(word => {
        let w = word.split('')
        w[0] = w[0].toUpperCase()
        return w.join('')
      })

      return "ri" + split2.join('')
    })()

    const line = `export { default as ${normalizedIconName} } from './${iconName}'`
    contents = contents + `${line}\n`
  })

  const template = `
  export type { IconDefinition } from './types/IconDefinition'

  ${contents}
  `

  writeFile('./src/icons/index.ts', template, (err) => {
    if (err) throw new Error(err.toString())
    console.log(`Successfully generated the icon index file`)
  })
}

const generateIconTypescriptFiles = async () => {
  // obtain an array of existing SVG filepaths
  const baseFilepath = 'node_modules/remixicon/icons'
  const iconSVGFilepaths = await lookupIconSVGFilepaths(baseFilepath)

  // store a map of results
  const successes: Map<string, boolean> = new Map()
  const errors: Map<string, Error | null> = new Map()

  // export a icon.ts file for each SVG filepath
  for await (const filepath of iconSVGFilepaths) {
    try {
      // get icon name
      const iconName = extractIconName(filepath)
      // get contents of SVG file
      const contents = await readIconSVGFile(filepath)
      // get the path data from the SVG
      const pathData = await extractPathData(contents)
      // export icon ts file
      exportIconTypescriptFile(iconName, pathData)

      successes.set(iconName, true)
    } catch (err) {
      const e = err as Error
      errors.set(filepath, e)
    }
  }

  // export index ts file
  const successfulIconNames = Array.from(successes.keys())
  exportIndexTypescriptFile(successfulIconNames)

  console.log("successes", JSON.stringify(successes, null, 2))
  console.log("errors", JSON.stringify(errors, null, 2))
}

generateIconTypescriptFiles()
