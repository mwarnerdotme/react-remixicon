import type { IconSize } from '@mwarnerdotme/react-remixicon/components/RemixIcon'

const calculateWidth = (size: IconSize) => {
  switch (size) {
    case 'xxs':
      return '.5em'
    case 'xs':
      return '.75em'
    case 'sm':
      return '.875em'
    case 'lg':
      return '1.3333em'
    case 'xl':
      return '1.5em'
    case '1x':
      return '1em'
    case '2x':
      return '2em'
    case '3x':
      return '3em'
    case '4x':
      return '4em'
    case '5x':
      return '5em'
    case '6x':
      return '6em'
    case '7x':
      return '7em'
    case '8x':
      return '8em'
    case '9x':
      return '9em'
    case '10x':
      return '10em'
    default:
      return '1em'
  }
}

export default calculateWidth
