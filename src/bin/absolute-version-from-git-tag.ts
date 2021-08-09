#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { versionFromGitTag } from '..';
import { applyDefaults } from '../config';

const defaultConfig = applyDefaults();

const { tagGlob } = yargs(hideBin(process.argv))
  .options({
    tagGlob: {
      type: 'string',
      description:
        'The matching glob to use to find tagged versions (same syntax as `git describe --match`)',
      default: defaultConfig.tagGlob,
    },
  })
  .version(false)
  .help()
  .parseSync();

console.log(versionFromGitTag({ tagGlob }));
