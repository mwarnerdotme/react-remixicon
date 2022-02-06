import { FC, forwardRef, HTMLAttributes, memo, SVGAttributes } from 'react'
import calculateWidth from './calculateWidth'

type IconProp = FC<SVGAttributes<SVGElement>>

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
  icon: IconProp
  size?: IconSize
  fixedWidth?: boolean
  // .ri-fw { text-align: center; width: 1.25em; }
  color?: string
  className?: string
  style?: HTMLAttributes<HTMLDivElement>
}

const RemixIcon = memo<Props>(
  forwardRef(function RemixIcon(props, ref) {
    const {
      icon,
      size = '1x',
      fixedWidth = false,
      className,
      color,
      style,
    } = props

    const Icon = icon

    const width = calculateWidth(size)

    const defaultStyle = {
      display: 'inline-block',
    }
    const combinedStyle = {
      ...defaultStyle,
      ...style,
    }

    return (
      <div style={combinedStyle} className={className}>
        <Icon
          style={{
            width,
            marginLeft: fixedWidth ? 'auto' : 0,
            marginRight: fixedWidth ? 'auto' : 0,
            fill: color ? color : 'currentcolor',
          }}
        />
      </div>
    )
  }),
)

export default RemixIcon
