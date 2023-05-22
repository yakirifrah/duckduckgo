import 'reflect-metadata'
import express, { Express } from 'express'
import cors from 'cors'
import { getCorsConfig } from './config/Cors'
import searchRoutes from './routes/searchRoutes'
import historyRoutes from './routes/historyRoutes'
const app: Express = express()

//------------------------------------//
//  Middleware                        //
//------------------------------------//
app.use(cors(getCorsConfig('localdev')))
app.use(express.json())

//------------------------------------//
//  Routes                            //
//------------------------------------//
app.use('/api', searchRoutes)
app.use('/api', historyRoutes)
export default app
