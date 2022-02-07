import { readFile } from 'fs'

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

export default readIconSVGFile
