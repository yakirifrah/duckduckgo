import type { Request, Response, NextFunction } from 'express'
import catchAsync from '../utils/catchAsync'
import type { DuckduckgoParameters } from 'serpapi'
import { apiConnectProxy } from '../services/HttpClient.service'
import { methodRequestType } from '../types/enums'
import AppError from '../utils/appError'
import { log } from 'console'

function mapResult(data: any) {
  if (!data?.organic_results) return []
  return data.organic_results
}

const getSearchResult = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query.q as string
  const path = process.env.SERP_API_DUCKDUCKGO_BASE_URL as string
  const apiKey = process.env.SERP_API_KEY as string

  const params = {
    q: query,
    kl: 'us-en',
    api_key: apiKey,
  } satisfies DuckduckgoParameters
  const data = await apiConnectProxy(path, methodRequestType.GET, null, params)
  if (data.search_metadata.status === 'Success') {
    console.log('here: ', data['organic_results'])
    return res.json(mapResult(data))
  }
  return next(new AppError('Somthing worng...', 500))
})

const autocomplete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query.q as string
  const path = process.env.AUTOCOMPLETE_DUCKDUCKGO_BASE_URL as string
  const params = {
    q: encodeURIComponent(query),
  }
  const data = await apiConnectProxy(path, methodRequestType.GET, null, params)
  if (!data) {
    return next(new AppError('Somthing worng...', 500))
  }
  const results = data.map((result: { phrase: string }) => ({
    title: result?.phrase,
  }))
  res.json(results)
})
export { getSearchResult, autocomplete }
