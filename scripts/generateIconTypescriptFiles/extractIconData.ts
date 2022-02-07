import { IconData } from "./IconData"

const extractIconData = async (content: string[]): Promise<IconData> => {
  for (const line of content) {
    if (line.includes('<path d=')) {
      const possiblePathData = line.match(/(?<=d=\")(.*)(?=\")/)
      if (!possiblePathData || !possiblePathData[0])
        throw new Error('error parsing path data in the file')

      const pathData = possiblePathData[0]

      return {
        pathData: pathData,
      }
    }

    if (line.includes('<path fill-rule="nonzero" d=')) {
      const possiblePathData = line.match(/(?<=d=\")(.*)(?=\")/)
      if (!possiblePathData || !possiblePathData[0])
        throw new Error('error parsing path data in the file')

      const pathData = possiblePathData[0]

      return {
        pathData: pathData,
        fillRule: "nonzero",
      }
    }
  }

  throw new Error('no path data found in the file')
}

export default extractIconData
