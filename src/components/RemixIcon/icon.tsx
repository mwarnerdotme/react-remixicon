import { FC, SVGAttributes } from "react"
import { IconDefinition } from "../../icons/_IconDefinition"

type Props = {
  icon: IconDefinition
} & SVGAttributes<SVGElement>

const Icon: FC<Props> = ({ icon, ...attrs }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...attrs}>
      <g>
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d={icon.pathData} />
      </g>
    </svg>
  )
}

export default Icon
