import {Box, Pagination} from '@mui/material'
import {PAGE_SIZE} from '../../utils/constants'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {RootState} from '../../store'
import {
  setCurrentData,
  setPagination,
} from '../../features/searchResult/searchResultSlice'
import {useEffect} from 'react'

export default function AppPagination() {
  const dispatch = useAppDispatch()
  const {pagination} = useAppSelector((state: RootState) => state.searchResult)

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    const from = (page - 1) * PAGE_SIZE
    const to = (page - 1) * PAGE_SIZE + PAGE_SIZE
    dispatch(setPagination({...pagination, from, to}))
  }
  useEffect(() => {
    dispatch(setCurrentData({from: pagination.from, to: pagination.to}))
  }, [dispatch, pagination.from, pagination.to])

  return (
    <Box
      justifyContent={'center'}
      alignItems={'center'}
      display={'center'}
      sx={{margin: '20px 0px'}}
    >
      <Pagination
        color="primary"
        onChange={handlePageChange}
        count={Math.ceil(pagination?.count / PAGE_SIZE)}
      />
    </Box>
  )
}
