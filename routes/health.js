'use strict'

import Router from 'koa-router'

const router = new Router()

/**
 * @api {get} /health Health Check
 * @apiVersion 1.0.0
 * @apiName HealthCheck
 * @apiGroup Health
 *
 * @apiDescription Health check for high availability
 *
 * @apiSuccessExample Success
 *  HTTP/1.1 200 Ok
 */
router.get('/health', async (ctx, next) => {
  ctx.status = 200
})

export default router
