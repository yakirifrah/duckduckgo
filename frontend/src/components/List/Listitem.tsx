import {IListItem} from './List'
import {Description, Item, ItemImg} from './style'

export default function ListItem(props: IListItem) {
  const {favicon, link, title, snippet} = props
  return (
    <Item>
      <div>
        <ItemImg>
          <img src={favicon} />
        </ItemImg>
        <a href={link} rel="noopener" target="_self">
          <span style={{color: '#eeeeee'}}>{link?.slice(0, -1)}</span>
        </a>
      </div>
      <div className="srtipe_2">
        <h2>
          <a
            href={link}
            rel="noopener"
            target="_self"
            style={{color: '#aaaaaa', display: 'block'}}
          >
            <span>{title}</span>
          </a>
        </h2>
      </div>
      <div className="stripe_3">
        <div>
          <Description>{snippet}</Description>
        </div>
      </div>
    </Item>
  )
}
