import {styled} from '@mui/material/styles'

export const HeaderWrapper = styled('div')({
  backgroundColor: '#161616',
  boxShadow: '0 1px 0 #282828',
  paddingTop: '16px',
  position: 'relative',
  zIndex: '15',
  '& > .header': {
    minHeight: '85px',
    paddingLeft: 0,
    paddingRight: 0,
    position: 'relative',
    padding: '0 7px',
    marginLeft: 0,
    marginRight: 'auto',
    '& >.header__search-wrap': {
      position: 'relative',
      marginBottom: '3px',
      marginTop: '1px',
      paddingRight: '150px',
      paddingLeft: '150px',
      maxWidth: '672px',
      '& a': {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: 'auto',
        marginLeft: '3.5px',
        left: 0,
        width: '150px',
        position: 'absolute',
        top: 0,
      },
    },
    '& .header__logo': {
      width: '40px',
      marginRight: '28px',
      height: '40px',
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '36px 36px',
      fontSize: 0,
      backgroundImage:
        'url("https://duckduckgo.com/assets/logo_header.v109.svg")',
      // '&:after': {
      //   content: '',
      //   display: 'block',
      //   clear: 'both',
      // },
    },
  },
})
