import { gitTagDescriptor } from './gitTagDescriptor';
import { cleanForSemver, descriptorToString } from './output';

export const versionFromGitTag = (): string =>
  descriptorToString(gitTagDescriptor(cleanForSemver));
