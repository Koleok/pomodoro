'use babel'

import {
  compose,
  head,
  last,
  split,
} from 'ramda';

export const getDirName = compose (last, split('/'), head)
export const getUserHome = process.env[
  (process.platform == 'win32') ? 'USERPROFILE' : 'HOME'
];
