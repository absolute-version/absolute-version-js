import { applyDefaults } from './config';
import { gitTagDescriptor } from './gitTagDescriptor';
import { cleanForSemver, descriptorToString } from './output';
import { AbsoluteVersionConfig } from './types';

export const versionFromGitTag = (config?: AbsoluteVersionConfig): string =>
  descriptorToString(gitTagDescriptor(cleanForSemver, applyDefaults(config)));
