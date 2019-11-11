'use strict'

import Router from 'koa-router'
import moment from 'moment'
import {
  createUser,
  getUser,
  delUser
} from '../helpers/user_queries'
import {
  getAverage,
  getStandardDeviation
} from '../helpers/math_functions'

const router = new Router({ prefix: '/users' })

const {
  LIFE_EXPECTATION
} = process.env

/**
 * @api {post} /user Create new user
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiParam (Body) {String} name
 * @apiParam (Body) {String} last_name
 * @apiParam (Body) {Number} age
 * @apiParam (Body) {String} birthday
 * @apiExample {json} Example
 *
 * {
 *  "name": "Fidel Antonio",
 *  "last_name": "Soto Ugaldi",
 *  "age": 28,
 *  "birthday" : "14-09-1991"
 * }
 *
 * @apiSuccessExample Succes
 *  HTTP/1.1 201 Ok
 *
 * @apiUse missing_name
 * @apiUse invalid_name_type
 * @apiUse missing_last_name
 * @apiUse invalid_last_name_type
 * @apiUse missing_age
 * @apiUse invalid_age_type
 * @apiUse missing_birthday
 * @apiUse invalid_birthday
 * @apiUse invalid_birthday_or_age
 *
 */
router.post('/', async (ctx) => {
  const { name, last_name: lastName, age } = ctx.request.body
  let { birthday } = ctx.request.body
  // CHECK NO EMPTY NAME AND TYPE
  ctx.assert(name, 400, 'Missing name', { code: 'missing_name' })
  ctx.assert(typeof name === 'string', 400, 'Use string for name', { code: 'invalid_name_type' })
  // CHECK NO EMPTY LAST NAME AND TYPE
  ctx.assert(lastName, 400, 'Missing last name', { code: 'missing_last_name' })
  ctx.assert(typeof lastName === 'string', 400, 'Use string for last name', { code: 'invalid_last_name_type' })
  // CHECK NO EMPTY AGE AND TYPE
  ctx.assert(age, 400, 'Missing age', { code: 'missing_age' })
  ctx.assert(typeof age === 'number', 400, 'Use number for age', { code: 'invalid_age_type' })
  // CHECK NO EMPTY BIRTHDAY AND TYPE
  ctx.assert(birthday, 400, 'Missing birthday', { code: 'missing_birthday' })
  ctx.assert(validateBirthday(birthday), 400, 'Use a valid value for birthday, follow documentation example', { code: 'invalid_birthday' })
  birthday = new Date(
    birthday.slice(6, 10),
    birthday.slice(3, 5) - 1,
    birthday.slice(0, 2)
  )
  const today = new Date()
  ctx.assert(today > birthday, 400, 'Invalid date for birthday', { code: 'invalid_birthday' })
  // CHECK CONSISTENCY BETWEEN BIRTHDAY AND AGE
  ctx.assert(today - birthday >= age * 365 * 24 * 60 * 60 * 1000 && today - birthday < (age + 1) * 365 * 24 * 60 * 60 * 1000, 400, 'Birthday and Age doesn\'t match', { code: 'invalid_birthday_or_age' })
  await createUser({
    name,
    last_name: lastName,
    age,
    birthday
  })
  ctx.status = 201
})

/**
 * @api {get} /users Get Users
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiDescription Get a list of users in the system
 * @apiSuccessExample {array} Success-Response:
 * [
 *  {
 *    "name": "Fidel Antonio",
 *    "last_name": "Soto Ugaldi",
 *    "age": "28"
 *    "birthday": "14-09-1991",
 *    "deathd_date": 53
 *  }
 * ]
 */
router.get('/', async (ctx) => {
  const users = await getUser()
  users.forEach(user => {
    delete user.id
    delete user.created_at
    user.birthday = moment(user.birthday).format('DD-MM-YYYY')
    user.death_date = Math.max(user.age, parseInt(Math.random() * LIFE_EXPECTATION, 10))
  })
  ctx.body = users
})

/**
 * @api {get} /users/kpi Get kpi
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiDescription Get kpi of users
 * @apiSuccessExample {json} Success-Response:
 * {
 *  "average": 24.5,
 *  "standardDeviation": "3.5"
 * }
 */
router.get('/kpi', async (ctx) => {
  const ages = await getUser({}, 'age').map(o => o.age)
  const avergare = getAverage(ages)
  const standardDeviation = getStandardDeviation(ages)
  ctx.body = {
    avergare,
    standardDeviation
  }
})

router.del('/', async (ctx) => {
  await delUser()
  ctx.status = 200
})

const validateBirthday = (birthday) => {
  if (birthday.length !== 10) return false
  if (typeof birthday !== 'string') return false
  if (birthday[2] !== '-' || birthday[5] !== '-') return false
  const reg = /^\d+$/
  if (!reg.test(birthday.slice(0, 2)) || !reg.test(birthday.slice(3, 5)) || !reg.test(birthday.slice(6, 10))) return false
  const day = parseInt(birthday.slice(0, 2), 10)
  const month = parseInt(birthday.slice(3, 5), 10)
  if (!(month > 0 && month < 13)) return false
  if (month === 2 && !(day > 0 && day < 30)) return false
  if ((month === 4 || month === 6 || month === 9 || month === 11) && !(day > 0 && day < 31)) return false
  if ((month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) && !(day > 0 && day < 32)) return false
  return true
}

export default router
