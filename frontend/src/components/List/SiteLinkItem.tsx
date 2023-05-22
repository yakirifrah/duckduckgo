import { ISitelinks } from './List'
import {SiteLinkLi} from './style'

export default function SiteLinkItem(props: ISitelinks) {
  const {title, link, snippet} = props
  return (
    <SiteLinkLi>
      <a href={link} rel="noopener" target="_self">
        <h3>{title}</h3>
      </a>
      <p className="p">
        <span> {snippet}</span>
      </p>
    </SiteLinkLi>
  )
}
