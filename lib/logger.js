'use babel'

import queryable from 'queryable'
import { curry } from 'ramda'

import { getDirName } from './utils'

const db = queryable.open('~/pomodoro.db')

export const log = curry((dir, event, time) => {
  const project = getDirName(dir)

  db.insert({ project, event, time })
})
