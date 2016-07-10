'use babel'

import {
  compose,
  head,
  last,
  split,
} from 'ramda';

export const getDirName = compose (last, split('/'), head)
