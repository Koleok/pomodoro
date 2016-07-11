'use babel'

import queryable from 'queryable'

export const db = queryable.open(`${__dirname}/pomodoro.db`)

const runAndSave = method =>
  (x, y) => db[method](x, y) && db.save()

export const insert = runAndSave('insert')
export const update = runAndSave('update')
export const remove = runAndSave('remove')
export const find = db.find
export const now = db.now
