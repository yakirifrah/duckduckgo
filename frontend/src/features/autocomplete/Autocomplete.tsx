import {useState, useCallback} from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import {useAppSelector, useAppDispatch} from '../../hooks/redux'
import {autocompleteAsync, resetSuggests} from './autocompleteSlice'
import {debounce} from '@mui/material/utils'
import CircularProgress from '@mui/material/CircularProgress'
import type {RootState} from '../../store'
import {Button, TextField} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import {Form, useNavigate, useSearchParams} from 'react-router-dom'
import {createHistory, updateHistory} from '../api'
import ObjectID from 'bson-objectid'

interface Props {
  inputValue: string
}

const MySearchIcon: React.FC<Props> = props => {
  const anonymousId = localStorage.getItem('anonymousId')
  console.log('localStorage:', anonymousId)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const {inputValue} = props
  return (
    <Button
      type="submit"
      onClick={() => {
        dispatch(resetSuggests())
        if (!anonymousId) {
          const newAnonymousId =new  ObjectID()
          console.log({newAnonymousId})
          localStorage.setItem('anonymousId', newAnonymousId)
          createHistory(newAnonymousId, inputValue)
        } else {
          updateHistory(anonymousId, inputValue)
        }
        return navigate(`/result?q=${inputValue}`)
      }}
    >
      <SearchIcon
        sx={{
          cursor: inputValue && 'pointer',
        }}
      />
    </Button>
  )
}
export default function AutocompleteComponent() {
  const anonymousId = localStorage.getItem('anonymousId')
  console.log('localStorage:', anonymousId)

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const query = searchParams.get('q')

  const {suggests, status} = useAppSelector(
    (state: RootState) => state.autocomplete,
  )

  const [inputValue, setInputValue] = useState(query || '')
  const dispatch = useAppDispatch()
  const debouncedSave = useCallback(
    debounce(inputValue => dispatch(autocompleteAsync(inputValue)), 1500),
    [],
  )
  const styles = {
    inputRoot: {
      background: '#333333',
      borderRadius: '24px',
      padding: '10px',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    inputInput: {
      flex: '1',
      marginLeft: '8px',
      fontSize: '14px',
    },
    inputLabel: {
      size: '12px',
    },

    option: {
      fontSize: '14px',
    },
  }
  interface IOption {
    title: string
  }
  function handleOptionClick(option: IOption, _event) {
    // dispatch(fetchSearchAsync(option.title))
    dispatch(resetSuggests())
    setInputValue(option.title)
    if (!anonymousId) {
      const newAnonymousId = new ObjectID()
      localStorage.setItem('anonymousId', newAnonymousId)
      createHistory(newAnonymousId, inputValue)
    } else {
      updateHistory(anonymousId, inputValue)
    }
    return navigate(`/result?q=${option.title}`)
  }

  return (
    <Form id="search-form" role="search">
      <Autocomplete
        freeSolo
        autoHighlight
        id="Autocomplete"
        autoComplete
        inputValue={inputValue}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getOptionLabel={(option: any) => {
          return option?.title || option
        }}
        sx={{width: 555, color: 'white'}}
        renderInput={params => (
          <TextField
            {...params}
            fullWidth
            placeholder="Search the web without being tracked"
            variant="outlined"
            type="search"
            id="q"
            name="q"
            sx={{
              '& input::placeholder': {
                color: 'white',
              },
            }}
            InputProps={{
              ...params.InputProps,
              style: styles.inputRoot,
              endAdornment: (
                <div>
                  <MySearchIcon inputValue={inputValue} />
                </div>
              ),
              startAdornment: (
                <>
                  {status === 'loading' ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
            InputLabelProps={{
              style: styles.inputLabel,
            }}
            inputProps={{
              ...params.inputProps,
              style: styles.inputInput,
            }}
          />
        )}
        options={inputValue === '' ? [] : suggests}
        renderOption={(props, option, {inputValue}) => {
          const matches = match(option.title, inputValue, {insideWords: true})
          const parts = parse(option.title, matches)

          return (
            <li {...props} onClick={event => handleOptionClick(option, event)}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 'normal' : 'bold',
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          )
        }}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue)
          newInputValue && debouncedSave(newInputValue)
        }}
      />
    </Form>
  )
}
