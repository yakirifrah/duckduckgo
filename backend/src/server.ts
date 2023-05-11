import express,{Request, Response } from 'express'
import cors from 'cors'

const app = express()
const router = express.Router()

router.get('/', function (req, res) {
  res.send('All systems operational')
})

app.use(cors())
app.use(router)
app.listen(3000, () => console.log('Listening on port 3000'))
