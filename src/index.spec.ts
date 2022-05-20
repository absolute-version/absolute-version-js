import { gitDescribeSync } from 'git-describe';
import { branch } from 'git-rev-sync';
import { hostname } from 'os';

import { versionFromGitTag } from '.';

jest.mock('git-describe');
jest.mock('os');
jest.mock('git-rev-sync');

describe('version-from-git-tag', () => {
  const hash = 'g9234bfb';
  describe('with no tag', () => {
    const gitDescribe = {
      hash,
    };
    describe('when the repo is dirty', () => {
      const dirty = true;
      beforeEach(() => {
        (gitDescribeSync as jest.Mock).mockReturnValue({
          ...gitDescribe,
          dirty,
        });
      });
      describe('with a hostname with no dots', () => {
        beforeEach(() => {
          (hostname as jest.Mock).mockReturnValue('HOSTNAME');
        });
        it('displays the version number correctly', () => {
          expect(versionFromGitTag()).toEqual(
            '9234bfb-featwhatever+9234bfb.SNAPSHOT.HOSTNAME'
          );
        });
      });
      it('displays the version number correctly', () => {
        expect(versionFromGitTag()).toEqual(
          '9234bfb-featwhatever+9234bfb.SNAPSHOT.HOSTNAME'
        );
      });
    });
    describe('when the repo is not dirty', () => {
      const dirty = false;
      beforeEach(() => {
        (gitDescribeSync as jest.Mock).mockReturnValue({
          ...gitDescribe,
          dirty,
        });
      });
      it('displays the version number correctly', () => {
        expect(versionFromGitTag()).toEqual('9234bfb-featwhatever+9234bfb');
      });
    });
  });

  describe('with no semver', () => {
    const tag = 'sometag';
    const gitDescribe = {
      tag,
      hash,
    };
    describe('when the repo is not on an exact tag', () => {
      const distance = 1;
      describe('when the repo is dirty', () => {
        const dirty = true;
        beforeEach(() => {
          (gitDescribeSync as jest.Mock).mockReturnValue({
            ...gitDescribe,
            dirty,
            distance,
          });
        });
        it('displays the version number correctly', () => {
          expect(versionFromGitTag()).toEqual(
            'sometag-featwhatever+1.9234bfb.SNAPSHOT.HOSTNAME'
          );
        });
      });
      describe('when the repo is not dirty', () => {
        const dirty = false;
        beforeEach(() => {
          (gitDescribeSync as jest.Mock).mockReturnValue({
            ...gitDescribe,
            dirty,
            distance,
          });
        });
        it('displays the version number correctly', () => {
          expect(versionFromGitTag()).toEqual('sometag-featwhatever+1.9234bfb');
        });
      });
    });
    describe('when the repo is on an exact tag', () => {
      const distance = 0;
      describe('when the repo is dirty', () => {
        const dirty = true;
        beforeEach(() => {
          (gitDescribeSync as jest.Mock).mockReturnValue({
            ...gitDescribe,
            dirty,
            distance,
          });
        });
        it('displays the version number correctly', () => {
          expect(versionFromGitTag()).toEqual(
            'sometag-featwhatever+0.9234bfb.SNAPSHOT.HOSTNAME'
          );
        });
      });
      describe('when the repo is not dirty', () => {
        const dirty = false;
        beforeEach(() => {
          (gitDescribeSync as jest.Mock).mockReturnValue({
            ...gitDescribe,
            dirty,
            distance,
          });
        });
        it('displays the version number correctly', () => {
          expect(versionFromGitTag()).toEqual('sometag');
        });
      });
    });
  });

  describe('with a release version', () => {
    const version = '1.2.3';
    const tag = `v${version}`;
    const gitDescribe = {
      hash,
      tag,
      semver: {
        version,
      },
    };

    describe('when on a branch named feat/whatever', () => {
      (branch as jest.Mock).mockReturnValue('feat/whatever');

      describe('when the repo is not on an exact tag', () => {
        const distance = 1;
        describe('when the repo is dirty', () => {
          const dirty = true;

          beforeEach(() => {
            (gitDescribeSync as jest.Mock).mockReturnValue({
              ...gitDescribe,
              dirty,
              distance,
            });
          });
          it('displays the version number correctly', () => {
            expect(versionFromGitTag()).toEqual(
              '1.2.3-featwhatever+1.9234bfb.SNAPSHOT.HOSTNAME'
            );
          });
        });
        describe('when the repo is not dirty', () => {
          const dirty = false;
          beforeEach(() => {
            (gitDescribeSync as jest.Mock).mockReturnValue({
              ...gitDescribe,
              dirty,
              distance,
            });
          });
          it('displays the version number correctly', () => {
            expect(versionFromGitTag()).toEqual('1.2.3-featwhatever+1.9234bfb');
          });
        });
      });
      describe('when the repo is on an exact tag', () => {
        const distance = 0;
        describe('when the repo is dirty', () => {
          const dirty = true;
          beforeEach(() => {
            (gitDescribeSync as jest.Mock).mockReturnValue({
              ...gitDescribe,
              dirty,
              distance,
            });
          });
          it('displays the version number correctly', () => {
            expect(versionFromGitTag()).toEqual(
              '1.2.3-featwhatever+0.9234bfb.SNAPSHOT.HOSTNAME'
            );
          });
        });
        describe('when the repo is not dirty', () => {
          const dirty = false;
          beforeEach(() => {
            (gitDescribeSync as jest.Mock).mockReturnValue({
              ...gitDescribe,
              dirty,
              distance,
            });
          });
          it('displays the version number correctly', () => {
            expect(versionFromGitTag()).toEqual('1.2.3');
          });
        });
      });
    });
  });
  describe('with a prerelease version', () => {
    const version = '1.2.3-beta';
    const tag = `v${version}`;
    const gitDescribe = {
      hash,
      tag,
      semver: {
        version,
      },
    };
    describe('when the repo is not on an exact tag', () => {
      const distance = 1;
      describe('when the repo is dirty', () => {
        const dirty = true;

        beforeEach(() => {
          (gitDescribeSync as jest.Mock).mockReturnValue({
            ...gitDescribe,
            dirty,
            distance,
          });
        });
        it('displays the version number correctly', () => {
          expect(versionFromGitTag()).toEqual(
            '1.2.3-beta.featwhatever+1.9234bfb.SNAPSHOT.HOSTNAME'
          );
        });
      });
      describe('when the repo is not dirty', () => {
        const dirty = false;
        beforeEach(() => {
          (gitDescribeSync as jest.Mock).mockReturnValue({
            ...gitDescribe,
            dirty,
            distance,
          });
        });
        it('displays the version number correctly', () => {
          expect(versionFromGitTag()).toEqual(
            '1.2.3-beta.featwhatever+1.9234bfb'
          );
        });
      });
    });
    describe('when the repo is on an exact tag', () => {
      const distance = 0;
      describe('when the repo is dirty', () => {
        const dirty = true;
        beforeEach(() => {
          (gitDescribeSync as jest.Mock).mockReturnValue({
            ...gitDescribe,
            dirty,
            distance,
          });
        });
        it('displays the version number correctly', () => {
          expect(versionFromGitTag()).toEqual(
            '1.2.3-beta.featwhatever+0.9234bfb.SNAPSHOT.HOSTNAME'
          );
        });
      });
      describe('when the repo is not dirty', () => {
        const dirty = false;
        beforeEach(() => {
          (gitDescribeSync as jest.Mock).mockReturnValue({
            ...gitDescribe,
            dirty,
            distance,
          });
        });
        it('displays the version number correctly', () => {
          expect(versionFromGitTag()).toEqual('1.2.3-beta');
        });
      });
    });
  });
});
