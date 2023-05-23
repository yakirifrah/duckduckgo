import {Drawer, List, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import {styled} from '@mui/system'
import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {RootState} from '../../store'
import {getHistory} from './historySlice'
import {Link} from 'react-router-dom'
import {useInView} from 'react-intersection-observer'
import {ListSubheader} from '@mui/material'
// import usePrevious from '../../hooks/usePrevious'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DrawerContainer = styled('div')({
  flexShrink: 0,
  '&  .MuiPaper-root': {
    width: '288px !important',
    backgroundColor: 'transparent',
  },
})

export default function HistoryNav() {
  const anonymousId = localStorage.getItem('anonymousId')

  const {ref} = useInView({
    /* Optional options */
    threshold: 0,
  })
  const dispatch = useAppDispatch()
  const {currentPage, loading, history} = useAppSelector(
    (state: RootState) => state.history,
  )
  // const prevCurrentPage = usePrevious(currentPage)

  useEffect(() => {
    if (anonymousId) {
      dispatch(
        getHistory({_id: anonymousId, page: currentPage, pageSize: 5000}),
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentPage])

  return (
    <>
      {!loading && history.length > 0 ? (
        <DrawerContainer>
          <Drawer
            id="nav"
            variant="permanent"
            anchor="right"
            sx={{
              '&.MuiDrawer-root': {
                width: '288px',
              },
            }}
          >
            <List
              subheader={
                <ListSubheader
                  component="div"
                  id="list-subheader"
                  sx={{
                    textAlign: 'center',
                    background: 'white',
                    fontSize: '20px',
                  }}
                >
                  History
                </ListSubheader>
              }
            >
              {history.map((item, index) => {
                const {_id, title, url} = item
                // eslint-disable-next-line no-constant-condition
                const otherProps =
                  index === history.length - 1 ? {ref: ref} : {}

                return (
                  <>
                    <ListItem
                      key={_id}
                      component={Link}
                      to={url}
                      sx={{
                        '&:hover': {
                          cursor: 'pointer',
                          background: '#95a5a6',
                        },
                      }}
                      {...otherProps}
                    >
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={title}
                        sx={{
                          textAlign: 'left',
                          fontSize: '20px',
                          padding: '14px',
                        }}
                      />
                    </ListItem>
                  </>
                )
              })}
            </List>
          </Drawer>
        </DrawerContainer>
      ) : (
        <></>
      )}
    </>
  )
}
