'use babel'

import queryable from 'queryable'

import { getUserHome } from './utils'

export const db = queryable.open(`${getUserHome}/.pomodoro/data.db`)

const runAndSave = method =>
  (x, y) => db[method](x, y) && db.save()

export const insert = runAndSave('insert')
export const update = runAndSave('update')
export const remove = runAndSave('remove')
export const find = db.find
export const now = db.now
