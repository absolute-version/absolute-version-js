# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [1.0.2](https://github.com/absolute-version/absolute-version-js/compare/v1.0.1...v1.0.2) (2023-03-17)


### Bug Fixes

* Fix a bug where the git hash was inappropriately truncated when there were no tags (fixes [#3](https://github.com/absolute-version/absolute-version-js/issues/3)) ([aad13ca](https://github.com/absolute-version/absolute-version-js/commit/aad13ca6f59c9145696b53f81dbb0f99d3d663db))

### [1.0.1](https://github.com/absolute-version/absolute-version-js/compare/v1.0.0...v1.0.1) (2022-05-25)


### Fixes and Improvements

* Add workflow scripts to npmignore so they are not included in the package unnecessarily ([3ab60ab](https://github.com/absolute-version/absolute-version-js/commit/3ab60ab851e823a114411a433c4bf7b6b4529280))

## [1.0.0](https://github.com/absolute-version/absolute-version-js/compare/v0.0.4...v1.0.0) (2022-05-25)


### ⚠ BREAKING CHANGES

* There are no breaking changes, this release just marks the solidification of the public API.

### Features

* Add JSDoc for intellisense ([c0b4cf6](https://github.com/absolute-version/absolute-version-js/commit/c0b4cf6038f8345da58260fd554f6d0f479b1699))

### [0.0.4](https://github.com/pact-foundation/absolute-version-js/compare/v0.0.3...v0.0.4) (2021-08-18)


### Fixes and Improvements

* bump version of git-describe to get better behaviour when git is missing ([920e257](https://github.com/pact-foundation/absolute-version-js/commit/920e257893d7d36db300967be09a6c3d837a79c0))

### [0.0.3](https://github.com/pact-foundation/absolute-version-js/compare/v0.0.2...v0.0.3) (2021-08-09)


### Features

* Add ability to specify alternate globs for picking up git tags ([93c7f6c](https://github.com/pact-foundation/absolute-version-js/commit/93c7f6cda487b9206a52d14a3ee5d86168a0cca6))


### Fixes and Improvements

* Improve branch detection for gitlab ([a742118](https://github.com/pact-foundation/absolute-version-js/commit/a7421183ce54fc412ea4b81ecdf4450375902eb9))

### [0.0.2](https://github.com/pact-foundation/absolute-version-js/compare/v0.0.1...v0.0.2) (2021-02-20)


### Features

* **ci:** If the branch name cannot be determined, try to determine it from environment variables for Appveyor, CircleCI, Travis and GitLab ([a3f11fa](https://github.com/pact-foundation/absolute-version-js/commit/a3f11faf1bf0190f08192af89ee987298b71c310))


### Fixes and Improvements

* Only use host part of hostname ([7d16964](https://github.com/pact-foundation/absolute-version-js/commit/7d16964ea6dde99ff19a416f56a22f3e1ac2a1b9))

### 0.0.1 (2021-02-18)
