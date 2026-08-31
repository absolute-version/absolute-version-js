import { existsSync, readFileSync, statSync } from 'fs';
import { dirname, isAbsolute, resolve } from 'path';

const RE_BRANCH = /^ref: refs\/heads\/(.*)\n/;

/**
 * Walks up from `start` to find the git directory for the repository.
 *
 * If `.git` is a file (a worktree or submodule), it contains a `gitdir:` line
 * pointing to the real git directory.
 */
const getGitDirectory = (start: string): string => {
  const candidate = resolve(start, '.git');

  if (existsSync(candidate)) {
    if (statSync(candidate).isDirectory()) {
      return candidate;
    }
    const gitDirLine = readFileSync(candidate, 'utf8').trim();
    const referenced = gitDirLine.split(' ').pop() || '';
    const gitDir = isAbsolute(referenced)
      ? referenced
      : resolve(start, referenced);

    if (existsSync(gitDir)) {
      return gitDir;
    }
    throw new Error(
      `[absolute-version] could not find git repository at ${gitDir}`
    );
  }

  const parent = dirname(start);
  if (parent === start) {
    throw new Error('[absolute-version] no git repository found');
  }
  return getGitDirectory(parent);
};

/**
 * Returns the name of the branch currently checked out in the repository
 * containing `dir`, or `Detached: <commit>` when HEAD is detached.
 */
export const gitBranch = (dir: string): string => {
  const head = readFileSync(resolve(getGitDirectory(dir), 'HEAD'), 'utf8');
  const match = head.match(RE_BRANCH);

  return match ? match[1] : `Detached: ${head.trim()}`;
};
