import { gitDescribeSync, GitInfo } from 'git-describe';

import { branch as gitBranch } from 'git-rev-sync';
import { getHostnameString } from './hostname';

import { Descriptor } from './output';

const branchInCI = (s: string) =>
  // If the branch came out as a detached head, we're in CI, so let's try to figure out the branch name
  s.startsWith('Detached')
    ? // Appveyor
      process.env.APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH ||
      process.env.APPVEYOR_REPO_BRANCH || // Appveyor defines this as the target branch in a PR, so the PR branch needs to be checked first
      // GitLab
      process.env.CI_COMMIT_BRANCH || // Gitlab does not define this in PRs, so the PR branch name is next
      process.env.CI_MERGE_REQUEST_SOURCE_BRANCH_NAME ||
      process.env.CI_EXTERNAL_PULL_REQUEST_SOURCE_BRANCH_NAME ||
      process.env.CI_COMMIT_REF_NAME || // This might be the tag name, but we shouldn't be looking at this if we're on a specfic tag
      // CircleCI
      process.env.CIRCLE_BRANCH ||
      // Travis
      process.env.TRAVIS_PULL_REQUEST_BRANCH ||
      process.env.TRAVIS_BRANCH || // Travis defines this as the target branch in a PR, so the PR branch needs to be checked first
      s
    : s;

export const getBranchString = (clean: (s: string) => string): string =>
  clean(branchInCI(gitBranch(process.cwd())));

const dirtyString = (gitInfo: GitInfo, clean: (s: string) => string) =>
  gitInfo.dirty ? `.SNAPSHOT.${clean(getHostnameString())}` : '';

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
