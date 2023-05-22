import {IListItem, ISitelinks} from './List'
import SiteLinkItem from './SiteLinkItem'
import {SiteLinkUl} from './style'

export default function SiteLinkList(props: IListItem) {
  const {sitelinks} = props
  return (
    <div className="stripe_4">
      <div>
        <SiteLinkUl>
          {sitelinks?.map((item: ISitelinks, index) => {
            const {title, link, snippet} = item
            return (
              <SiteLinkItem
                title={title}
                link={link}
                snippet={snippet}
                key={index}
              />
            )
          })}
        </SiteLinkUl>
      </div>
    </div>
  )
}
