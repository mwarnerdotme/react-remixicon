import { readdir } from 'fs'

const lookupIconSVGFilepaths = (baseFilepath: string) => {
  return new Promise<string[]>((resolve, reject) => {
    // get array of directories in the base directory
    readdir(baseFilepath, async (err, subDirectories) => {
      if (err) {
        reject(err)
        throw err
      }

      // get filepaths from every directory in base
      const filepaths = await Promise.all(subDirectories.map(async (subDirectory) => {
        const svgFilepaths = await new Promise<string[]>((resolve, reject) => {
          readdir(`${baseFilepath}/${subDirectory}`, (err, filenames) => {
            if (err) {
              reject(err)
              throw err
            }

            const newFilepaths = filenames.map((filename) => {
              return `${baseFilepath}/${subDirectory}/${filename}`
            })

            resolve(newFilepaths)
          })
        }).catch((err) => {
          reject(err)
          throw err
        })

        return svgFilepaths
      }))

      resolve(filepaths.flat())
    })
  })
}

export default lookupIconSVGFilepaths
