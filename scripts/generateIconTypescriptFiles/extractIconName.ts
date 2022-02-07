const extractIconName = (filepath: string): string => {
  const possibleIconName = filepath.match(
    /(?<=node_modules\/remixicon\/icons\/.*\/)(.*)(?=\.svg)/,
  )
  if (!possibleIconName || !possibleIconName[0])
    throw new Error('could not determine icon name')
  return possibleIconName[0]
}

export default extractIconName
