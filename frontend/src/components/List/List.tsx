/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {ReactNode} from 'react'
import {Li} from './style'
import ListItem from './Listitem'
import SiteLinkList from './SiteLinkList'

export interface ISitelinks {
  snippet?: string
  title?: string
  link?: string
  children?: ReactNode
}
export interface IListItem {
  position?: number
  favicon?: string
  snippet?: string
  title?: string
  link?: string
  sitelinks?: ISitelinks[]
  onClick?: () => void
  children?: ReactNode
}

interface IProps {
  items: IListItem[]
}

export default function List(props: IProps) {
  const {items} = props

  return (
    <Li>
      {items?.map((item: IListItem) => {
        const {position, favicon, link, snippet, title, sitelinks} = item
        return (
          <React.Fragment key={position}>
            <ListItem
              favicon={favicon}
              link={link}
              snippet={snippet}
              title={title}
            />
            {sitelinks?.length && (
              <>
                <SiteLinkList sitelinks={sitelinks} />
              </>
            )}
          </React.Fragment>
        )
      })}
    </Li>
  )
}
