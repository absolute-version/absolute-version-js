import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

import { gitBranch } from './gitBranch';

describe('gitBranch', () => {
  let repo: string;

  const writeHead = (gitDir: string, contents: string) => {
    mkdirSync(gitDir, { recursive: true });
    writeFileSync(join(gitDir, 'HEAD'), contents);
  };

  beforeEach(() => {
    repo = mkdtempSync(join(tmpdir(), 'absolute-version-'));
  });

  afterEach(() => {
    rmSync(repo, { recursive: true, force: true });
  });

  describe('when .git is a directory', () => {
    it('returns the branch name from HEAD', () => {
      writeHead(join(repo, '.git'), 'ref: refs/heads/feat/whatever\n');

      expect(gitBranch(repo)).toEqual('feat/whatever');
    });

    it('finds the repository from a nested directory', () => {
      writeHead(join(repo, '.git'), 'ref: refs/heads/main\n');
      const nested = join(repo, 'some', 'nested', 'dir');
      mkdirSync(nested, { recursive: true });

      expect(gitBranch(nested)).toEqual('main');
    });

    it('reports a detached HEAD with the commit', () => {
      writeHead(
        join(repo, '.git'),
        '9234bfb9234bfb9234bfb9234bfb9234bfb92349\n'
      );

      expect(gitBranch(repo)).toEqual(
        'Detached: 9234bfb9234bfb9234bfb9234bfb9234bfb92349'
      );
    });
  });

  describe('when .git is a file (worktree or submodule)', () => {
    it('follows a relative gitdir', () => {
      writeHead(
        join(repo, 'main', '.git', 'worktrees', 'wt'),
        'ref: refs/heads/wt-branch\n'
      );
      mkdirSync(join(repo, 'wt'));
      writeFileSync(
        join(repo, 'wt', '.git'),
        'gitdir: ../main/.git/worktrees/wt\n'
      );

      expect(gitBranch(join(repo, 'wt'))).toEqual('wt-branch');
    });

    it('follows an absolute gitdir', () => {
      const gitDir = join(repo, 'elsewhere', '.git', 'modules', 'sub');
      writeHead(gitDir, 'ref: refs/heads/sub-branch\n');
      mkdirSync(join(repo, 'sub'));
      writeFileSync(join(repo, 'sub', '.git'), `gitdir: ${gitDir}\n`);

      expect(gitBranch(join(repo, 'sub'))).toEqual('sub-branch');
    });

    it('throws when the gitdir does not exist', () => {
      writeFileSync(join(repo, '.git'), 'gitdir: ../does/not/exist\n');

      expect(() => gitBranch(repo)).toThrow(/could not find git repository/);
    });
  });

  it('throws when there is no repository', () => {
    expect(() => gitBranch(repo)).toThrow(/no git repository found/);
  });
});
