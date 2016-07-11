'use babel'

import { curry } from 'ramda'

import { insert } from './db'
import { getDirName } from './utils'

export const createLogDoc = (dir, event, time) =>
  ({ project: getDirName(dir), event, time })

export const log = curry((dir, event, time) =>
  insert(createLogDoc(dir, event, time))
)
