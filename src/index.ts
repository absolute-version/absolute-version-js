import { applyDefaults } from './config';
import { gitTagDescriptor } from './gitTagDescriptor';
import { cleanForSemver, descriptorToString } from './output';
import { AbsoluteVersionConfig } from './types';

/** Reads the tag information from the git repository, and returns an absolute-version */
export const versionFromGitTag = (config?: AbsoluteVersionConfig): string =>
  descriptorToString(gitTagDescriptor(cleanForSemver, applyDefaults(config)));
