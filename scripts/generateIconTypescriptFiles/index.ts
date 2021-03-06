// This file will generate an {iconName}.ts file for every
// icon in the `remixicon` library as of remixicon version
// 2.5.0. These files will be exported in the dist files.

import exportIconTypescriptFile from './exportIconTypescriptFile'
import exportIndexTypescriptFile from './exportIndexTypescriptFile'
import extractIconName from './extractIconName'
import extractIconData from './extractIconData'
import lookupIconSVGFilepaths from './lookupIconSVGFilepaths'
import readIconSVGFile from './readIconSVGFile'

const generateIconTypescriptFiles = async () => {
  // obtain an array of existing SVG filepaths
  const baseFilepath = 'node_modules/remixicon/icons'
  const iconSVGFilepaths = await lookupIconSVGFilepaths(baseFilepath)

  // store a map of results
  const successes: Map<string, boolean> = new Map()
  const errors: Map<string, unknown> = new Map()

  // export an icon.ts file for each SVG filepath
  for (const filepath of iconSVGFilepaths) {
    await new Promise<void>(async (resolve) => {
      try {
        // get icon name
        const iconName = extractIconName(filepath)

        // get contents of SVG file
        const contents = await readIconSVGFile(filepath)
        // get the path data from the SVG
        const pathData = await extractIconData(contents)
        // export icon ts file
        await exportIconTypescriptFile(iconName, pathData)

        console.log(`Successfully generated an icon file for ${iconName}`)
        successes.set(iconName, true)
        resolve()
      } catch (err: any) {
        if (err && err.message) errors.set(filepath, err.message)
        else errors.set(filepath, err)
        resolve()
      }
    })
  }

  // export an index.ts file for all icons
  try {
    const successfulIconNames = Array.from(successes.keys())
    await exportIndexTypescriptFile(successfulIconNames)
    console.log(`Successfully generated the icon index file`)
  } catch (e) {
    throw e
  }

  // Log the errors
  const errorsArray = Array.from(errors.entries())
  if (errorsArray.length > 0) {
    console.error(
      '\nThe following icon SVG files errored when translating to TS IconDefinition files:',
    )
    console.error(JSON.stringify(errorsArray, null, 2))
    // process.exit(1) // TODO: fix the final errors and re-enable this line for CI/CD
  }
}

generateIconTypescriptFiles()
