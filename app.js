'use strict'

import Koa from 'koa'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import cors from 'koa2-cors'
import body from 'koa-body'
import compress from 'koa-compress'
import serve from 'koa-static'

import health from './routes/health'
import users from './routes/users'

const app = new Koa()

app.use(cors())
app.use(body())
app.use(logger())
app.use(helmet())
app.use(compress())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      error: {
        code: err.code || 'unhandled_error',
        message: err.message || 'Something went wrong'
      }
    }
  }
})

app.use(health.routes())
app.use(users.routes())

app.use(serve('docs'))

export default app

if (!module.parent) {
  app.listen(process.env.PORT || 3000)
}
