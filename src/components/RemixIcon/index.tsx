import { forwardRef, memo, StyleHTMLAttributes, SVGAttributes } from 'react'
import { IconDefinition } from '../../icons/types/IconDefinition'
import calculateWidth from './calculateWidth'

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
  color?: string
  className?: string
  style?: StyleHTMLAttributes<SVGElement>
} & SVGAttributes<SVGElement>

const RemixIcon = memo<Props>(
  forwardRef((props, ref) => {
    const { icon, size = '1x', className, color, style, ...attrs } = props

    const width = calculateWidth(size)

    const defaultStyle = {
      width,
      fill: color ? color : 'currentcolor',
      display: 'inline-block',
    }
    const combinedStyle = {
      ...defaultStyle,
      ...style,
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style={combinedStyle}
        className={className}
        {...attrs}
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d={icon.pathData} />
        </g>
      </svg>
    )
  }),
)

export default RemixIcon
