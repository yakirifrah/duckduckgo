import { Schema, model } from 'mongoose'

export interface IHistory {
  url?: string
  title?: string
  _id: Schema.Types.ObjectId
}
export interface HistorySchema {
  results: IHistory[]
  _id: Schema.Types.ObjectId
  timestamps?: any
  resultsCount?: number
}
const history = new Schema<IHistory>({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})
const historySchema = new Schema(
  {
    results: [history],
    _id: { type: Schema.Types.ObjectId, required: true, unique: true },
  },
  { timestamps: true }
)
historySchema.virtual('resultsCount').get(function () {
  return this.results.length
})
historySchema.set('toObject', { virtuals: true })
historySchema.set('toJSON', { virtuals: true })
export default model('History', historySchema)
