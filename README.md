# Absolute Version

Do you use git tags to mark releases in a semver style? Do you want to be able to reason about
the exact version of your application? Absolute Version is for you!

When testing and releasing software, it is useful to be able to reason about
the absolute version of an application. Some tools (eg [Pact](https://pact.io))
require a [clear and specific
version](https://docs.pact.io/getting_started/versioning_in_the_pact_broker/) for
each testable instance of your application.

`absolute-version` relies on the commit history to produce prerelease versions
with human-helpful and machine-readable metadata that will help you reason about what
_exactly_ is deployed or being tested.

It is a lot like the output of `git describe`, except it is semver
compatible, and includes the branch name.

Confused about why you would want this? Skip below to [why would I want this](#why-would-i-want-this).

_Note for everyone: Although this is a pact-foundation project, it is standalone from Pact, and is useful anywhere you want an absolute version for every git commit_

## What it does

Absolute version provides a CLI and API for obtaining an absolute version from
your git tags and current git state. If you are using semver, then all
absolute versions are also semver compliant, using the prerelease and build metadata.

Since every commit is a different version of your software, have a different version with `absolute-version`.

## Usage

- **`versionFromGitTag() => string`**

Returns the `absolute-version` as a string, using the current working directory from `process.cwd()`.

```
import { versionFromGitTag } from '@pact-foundation/absolute-version'

const version = versionFromGitTag();
```

### CLI

```
npx @pact-foundation/absolute-version
```

Or alternatively:

```
npm install --save-dev @pact-foundation/absolute-version
```

package.json:

```
scripts: {
  test: "VERSION=$(absolute-version-from-git-tag) jest" // or whatever
}
```

### Release versions

If the most recent commit is tagged with a semver tag, eg `v1.2.3`, then it will
output just the version number (`1.2.3`).

### Prerelease version

If the most recent commit is not tagged, then it will output a prerelease
version, for example.

```
1.2.3-master+26.6fe275b
```

This is a [semver 2.0.0](https://semver.org/) prerelease version string. Loosely, a prerelease version is:

```
<MAJOR>.<MINOR>.<PATCH>-<DOT SEPARATED PRERELEASE INFO>+<DOT SEPARATED BUILD INFO>
```

- `1.2.3`: The most recent tagged version that this version is based on
- `master`: The current branch for this version
- `26`: The number of commits on this branch (`master`) since the last version (`1.2.3`)
- `6fe275b`: The commit hash for this version, useful for disambiguation

If the tag is already a prerelease version, eg `v.1.2.3-beta`, then the branch name is appended
to the prerelease metadata:

```
1.2.3-beta.master+26.6fe275b
```

### Dirty working directory

Sometimes, a deploy has been made from a dirty working directory (oh no). To
help find and reason about what exactly is deployed, `absolute-version` appends
`.SNAPSHOT.<current hostname>` to the build info, helping you track down the
source of the version:

```
1.2.3-master+26.6fe275b.SNAPSHOT.StevesMachine
```

A dirty working directory is always considered a prerelease, even if on a
tagged release:

```
1.2.3-master+0.aca353d.SNAPSHOT.StevesMachine
```

We don't recommend deploying from a dirty working tree, but `absolute-version`
helps you know who to ask if someone has done that.

### Non-semver uses

You can still use `absolute-version` if you're not using semver or tags
(although we recommend using it when you are tagging with semantic versions,
using something like the excellent
[standard-version](https://github.com/conventional-changelog/standard-version)).

If there are no tags in the current branch, then just the commit hash is used:

```
6fe275b-master+6fe275b
```

If there is a tag, but it's not semver (eg `myversiontag`), then we use it in place of the base semver:

```
myversiontag-master+26.6fe275b
```

### What about characters that aren't allowed in semver metadata?

The [semver spec](https://semver.org/) allows only alphanumeric characters or
`-` in the build and prerelease info. If your branch or hostname contains
other characters, we drop them. Since
the git hash is included, you shouldn't experience collisions between version
numbers. If this decision is causing problems, please open an
issue and we'll make it configurable.

## Why would I want this?

Absolute version aims to solve the common pain points when reasoning about
versions, using the version control tooling that you already use (assuming you use git).

- **Was this version before or after that version?** Build numbers/dates or commit dates
  aren't accurate for reasoning about whether one application version is
  before or after another, development history wise. Absolute version's
  commits-since-release helps you answer this question, without needing to
  look at `git log` yourself.

- **What is the source of this version?** Build numbers answer this, but
  they're still a layer of indirection to source code. With absolute version,
  you can read the version string and immediately check out the code at that
  version, without needing to go to your build system logs.

- **Was this version built directly from source?** The dirty string
  `SNAPSHOT.<HOSTNAME>` lets you know if the source was modified before this
  version was deployed or tested. The inclusion of hostname helps you find out who
  might know the answer to how it was modified before deployment.

- **Is this a feature branch version?** Want to know whether this is a trunk
  deployment or a feature branch? The branch is right there in the version.

Our experience is that it is better to have the answer to these questions _before_
you need to answer them.

Common patterns like build numbers and appending the commit sha can be used
to answer these questions already, but `absolute-version` has the advantage
that it is easier for a human to read without needing to consult another
source.

## Contact

Join us on [Slack](https://slack.pact.io)
