import AutocompleteComponent from '../../features/autocomplete/Autocomplete'
import {HeaderWrapper} from './style'

export default function Header() {
  return (
    <HeaderWrapper>
      <div className="header">
        <div className="header__search-wrap">
          <a href={'http://127.0.0.1:5173'}>
            <span className="header__logo">duckduckgo</span>
          </a>
          <AutocompleteComponent />
        </div>
      </div>
      <div></div>
    </HeaderWrapper>
  )
}
