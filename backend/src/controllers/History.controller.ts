import type { Request, Response, NextFunction } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../utils/appError'
import History, { HistorySchema } from '../models/history'

interface IPagination {
  page?: number
  limit?: number
}
interface Iresult {
  next?: IPagination
  previous?: IPagination
  results?: any
}

const getHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const page: number = parseInt(req.query.page as string) || 0
  const { _id } = req.params
  const limit: number = parseInt(req.query.limit as string) || 10
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  console.log({ startIndex, endIndex })
  const result: Iresult = {}
  const historyDoc: HistorySchema | null = await History.findById({ _id })
  const resCount = historyDoc?.resultsCount || 0
  if (endIndex < resCount) {
    result.next = {
      page: page + 1,
      limit,
    }
  }
  if (startIndex > 0) {
    result.previous = {
      page: page - 1,
      limit,
    }
  }
  try {
    const dataDoc = await History.findOne({ _id })
      .select({ results: { $slice: [startIndex, limit] } })
      .lean()
    result['results'] = dataDoc?.results
    return res.json(result)
  } catch (err) {
    return next(new AppError('Somthing worng...', 500))
  }
})

const createHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id, title, url } = req.body
    const history = await History.create({ _id, results: [{ title, url }] })
    console.log({ history })
    res.status(201).json({
      status: 'success',
      data: { history },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'invalid data sent!',
    })
  }
})

const updateHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id, title, url } = req.body
    const newItem = { title, url }
    const history = await History.updateOne({ _id }, { $push: { results: newItem } }, { rawResult: true })
    console.log({ history })
    res.status(201).json({
      status: 'success',
      data: { history },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'invalid data sent!',
    })
  }
})

export { getHistory, createHistory, updateHistory }
