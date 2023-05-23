import {api} from '../utils/api-client'
import {AxiosResponse} from 'axios'

export function fetchDataAutocomplete(query: string) {
  return api
    .get(`/autocomplete?q=${query}`)
    .then((response: AxiosResponse) => response.data)
}

export function fetchDataSearch(query: string) {
  return api
    .get(`/search?q=${query}`)
    .then((response: AxiosResponse) => response.data)
}

export function fetchHistory(_id: string, page: number, limit: number) {
  return api.get(`/history/${_id}?page=${page}&limit=${limit}`)
}

export function createHistory(_id: string, query: string) {
  const url = `/result?q=${query}`
  return api.post('/history', {
    _id,
    title: query,
    url,
  })
}
export function updateHistory(_id: string, query: string) {
  const url = `/result?q=${query}`
  return api.put('/history', {
    _id,
    title: query,
    url,
  })
}
