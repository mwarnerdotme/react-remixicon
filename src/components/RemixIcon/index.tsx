import { forwardRef, memo, StyleHTMLAttributes, SVGAttributes } from 'react'
import { IconDefinition } from '../../icons'
import calculateWidth from './calculateWidth'
import Icon from './icon'

export type IconVariant = 'fill' | 'line'
export type IconSize =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'lg'
  | 'xl'
  | '1x'
  | '2x'
  | '3x'
  | '4x'
  | '5x'
  | '6x'
  | '7x'
  | '8x'
  | '9x'
  | '10x'

type Props = {
  icon: IconDefinition
  size?: IconSize
  fixedWidth?: boolean
  // .ri-fw { text-align: center; width: 1.25em; }
  color?: string
  className?: string
  style?: StyleHTMLAttributes<SVGElement>
} & SVGAttributes<SVGElement>

const RemixIcon = memo<Props>(
  forwardRef((props, ref) => {
    const {
      icon,
      size = '1x',
      fixedWidth = false,
      className,
      color,
      style,
      ...attrs
    } = props

    const width = calculateWidth(size)

    const defaultStyle = {
      width,
      marginLeft: fixedWidth ? 'auto' : 0,
      marginRight: fixedWidth ? 'auto' : 0,
      fill: color ? color : 'currentcolor',
      display: 'inline-block',
    }
    const combinedStyle = {
      ...defaultStyle,
      ...style,
    }

    return (
      <Icon
        icon={icon}
        className={className}
        style={combinedStyle}
        {...attrs}
      />
    )
  }),
)

export default RemixIcon
