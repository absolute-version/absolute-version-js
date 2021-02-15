import { gitDescribeSync, GitInfo } from 'git-describe';
import { hostname } from 'os';
import { branch as gitBranch } from 'git-rev-sync';

import { Descriptor } from './output';

export const getBranchString = (clean: (s: string) => string): string =>
  clean(gitBranch(process.cwd()));

const dirtyString = (gitInfo: GitInfo, clean: (s: string) => string) =>
  gitInfo.dirty ? `.SNAPSHOT.${clean(hostname())}` : '';

const gitHash = (gitInfo: GitInfo) => gitInfo.hash.substring(1);

const tagOrHash = (gitInfo: GitInfo) =>
  gitInfo.tag ? gitInfo.tag : gitHash(gitInfo);

const distance = (gitInfo: GitInfo) =>
  gitInfo.distance === 0 || gitInfo.distance ? `${gitInfo.distance}.` : '';

export const gitTagDescriptor = (clean: (s: string) => string): Descriptor => {
  const gitInfo = gitDescribeSync();
  const branch = getBranchString(clean);
  return {
    versionSuffix: () =>
      gitInfo.distance !== 0 || gitInfo.dirty
        ? `${branch}+${distance(gitInfo)}${gitHash(gitInfo)}${dirtyString(
            gitInfo,
            clean
          )}`
        : '',
    versionMain: () =>
      gitInfo.semver ? gitInfo.semver.version : tagOrHash(gitInfo),
  };
};
