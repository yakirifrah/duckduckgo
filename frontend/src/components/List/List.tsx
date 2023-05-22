/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {ReactNode, Ref, useState, useRef, forwardRef} from 'react'
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
  onSelect?: (text: string) => any | void
  withKeyboardNavigation?: boolean
  focusWhenVisible?: boolean
  ref?: Ref<any>
}

const List: React.FC<IProps> = forwardRef(
  (props: IProps, ref: Ref<unknown>) => {
    const {items} = props
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = items?.length // Total number of pages
    function handlePageChange(event, page) {
      console.log('Page changed:', page)
      // Add your logic to fetch and display data for the selected page
    }
    const [selectedIndex, setSelectedIndex] = useState(0)
    const handleChange = (event, value) => {
      setCurrentPage(value)
      handlePageChange(event, value)
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const listRef: any = ref ? ref : useRef(null)
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
  },
)
export default List
