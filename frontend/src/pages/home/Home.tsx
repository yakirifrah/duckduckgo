import AutocompleteComponent from '../../features/autocomplete/Autocomplete'
import duckduckgo from '../../assets/duckduckgo.svg'
import {styled} from '@mui/system'
import HistoryNav from '../../features/historyNav/HistoryNav'

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '85px',
})

export default function Home() {
  return (
    <Wrapper>
      <HistoryNav />
      <img
        alt="duckduckgo"
        src={duckduckgo}
        width="200"
        height="162"
        style={{paddingBottom: '22px'}}
      />
      <AutocompleteComponent />
    </Wrapper>
  )
}
