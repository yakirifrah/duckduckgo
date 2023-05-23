import Header from '../../components/Header/Header'
import List from '../../components/List/List'
import {useAppSelector} from '../../hooks/redux'
import {RootState} from '../../store'
import {Container} from './style'
import AppPagination from '../../components/Pagination/Pagination'
import {useEffect} from 'react'
import {useLocation, useSearchParams} from 'react-router-dom'
import {useAppDispatch} from '../../hooks/redux'
import {fetchSearchAsync} from '../../features/searchResult/searchResultSlice'

export default function ResultSearch() {
  const [searchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  const location = useLocation()
  console.log('ResultSearchComp: ', {location})

  const {currentDataForPage, status} = useAppSelector(
    (state: RootState) => state.searchResult,
  )

  const query = searchParams.get('q') || ''

  useEffect(() => {
    const originalQuery: string = query.replace(/\+/g, ' ')
    originalQuery && dispatch(fetchSearchAsync(originalQuery))
  }, [dispatch, query])

  return (
    <>
      <Header />
      {status == 'loading' && <div>loading ...</div>}
      {status == 'idle' && currentDataForPage.length > 0 ? (
        <>
          <Container className="result">
            <ol>
              <List items={currentDataForPage} />
            </ol>
            <AppPagination />
          </Container>
        </>
      ) : null}
    </>
  )
}
