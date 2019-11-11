'use strict'

import db from '../clients/db'

export const createUser = (data) => db('users').insert(data)

export const getUser = (where = {}, select = '*') => db('users').where(where).select(select)

export const delUser = (where = {}) => db('users').where(where).del()
