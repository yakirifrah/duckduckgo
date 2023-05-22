import {styled} from '@mui/material/styles'

export const Li = styled('li')({
  marginButton: '1.2rem',
  margin: 0,
  listStyleType: 'none',
  padding: 0,
})

export const Item = styled('article')({
  border: '1px solid transparent',
  padding: '7px',
  '& a': {
    textDecoration: 'none',
  },
  '& >.srtipe_2': {
    marginTop: '.45rem',
    marginBottom: '.28451rem',
    '&>h2': {
      fontSize: '1.46rem',
      lineHeight: '1.22',
      letterSpacing: '-.01px',
      position: 'relative',
      margin: '0',
      padang: '0',
      '& a': {
        '&:hover': {
          textDecoration: 'underline !important',
        },
        '& span': {
          verticalAlign: 'top',
          display: 'inline-block',
          maxWidth: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          textDecoration: 'inherit',
        },
      },
    },
  },
  '& > .stripe_3': {
    '& > div': {
      margin: '0',
      color: '#cccccc',
      fontSize: '1rem',
      lineHeight: '1.45',
    },
  },
  '& > .stripe_4': {
    marginTop: '.76389rem',
    '& > div': {
      position: 'relative',
      margin: '0',
      lineHeight: '0',
    },
  },
})

export const ItemLink = styled('div')({
  display: 'flex',
  '&:first-child': {
    flexGrow: 0,
  },
})

export const ItemImg = styled('span')({
  display: 'inline-block',
  verticalAlign: 'middle',
  overflow: 'hidden',
  maxWidth: '16px',
  margin: '-4px 0.5em 0 0',
  '& img': {
    maxWidth: '16px',
    verticalAlign: 'middle',
    margin: '0',
  },
})

export const Description = styled('span')({})

export const SiteLinkUl = styled('ul')({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '-.76389rem 0 0 1.04167rem',
  padding: '0',
  listStyle: 'none',
  lineHeight: '0',
})

export const SiteLinkLi = styled('li')({
  width: '300px',
  boxSizing: 'border-box',
  margin: '.76389rem 0 0',
  padding: '0 3.125rem 0 0',
  '& > a': {
    margin: '0',
    fontSize: '1.18056rem',
    lineHeight: '1.45rem',
    padding: '0',
    color: '#eeeeee',
    '&:hover': {
      textDecoration: 'underline !important',
    },

    '&>h3': {
      margin: '0',
      padding: '0',
      whiteSpace: 'nowrap',
      fontSize: '1.18056rem',
      display: 'inline-block',
      verticalAlign: 'middle',
      overflow: 'hidden',
      '&: hover': {
        textDecoration: 'underline !important',
      },
    },
  },
  '& .p': {
    margin: '0',
    padding: '0',
    color: '#cccccc',
    '& > span': {
      WebkitLineClamp: '3',
      display: '-webkit-box!important',
      WebkitBoxOrient: 'vertical!important',
      textOverflow: 'clip',
      whiteSpace: 'normal!important',
      overflow: 'hidden!important',
      fontSize: '1rem',
      lineHeight: '1.45',
    },
  },
})
