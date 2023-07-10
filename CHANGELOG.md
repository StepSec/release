# Changelog

This document lists breaking changes for each major release.

See the GitHub Releases page for detailed changelogs:
[https://github.com/release-git/release-git/releases](https://github.com/release-git/release-git/releases)

## v16 (2023-07-05)

- Removed support for Node.js v14.

## v15 (2022-04-30)

- Removed support for Node.js v10 and v12.
- Removed support for GitLab v12.4 and lower.
- Removed anonymous metrics (and the option to disable it).
- Programmatic usage and plugins only through ES Module syntax (`import`)

Use release-git v14 in legacy environments.

## v14 (2020-09-03)

- Removed `global` property from plugins. Use `this.config[key]` instead.
- Removed deprecated `npm.access` option. Set this in `package.json` instead.

## v13 (2020-03-07)

- Dropped support for Node v8
- Dropped support for GitLab v11.6 and lower.
- Deprecated `scripts` are removed (in favor of [hooks](https://github.com/release-git/release-git#hooks)).
- Removed deprecated `--non-interactive` (`-n`) argument. Use `--ci` instead.
- Removed old `%s` and `[REV_RANGE]` syntax in command substitutions. Use `${version}` and `${latestTag}` instead.

## v12 (2019-05-03)

- The `--follow-tags` argument for `git push` has been moved to the default configuration. This is only a breaking
  change if `git.pushArgs` was not empty (it was empty by default).

## v11

- The custom `conventional-changelog` increment (e.g. `"increment": "conventional:angular"`) with additional script
  configuration is replaced with a plugin. Please see
  [conventional changelog](https://github.com/release-git/release-git/blob/main/docs/changelog.md#conventional-changelog)
  how to use this plugin.
- The `pkgFiles` option has been removed. If there's a need to bump other files than what `npm version` bumps, it should
  be (part of) a plugin.
- By default, the latest version was derived from the latest Git tag. From v11, if the repo has a `package.json` then
  that `version` is used instead. The `use` option has been removed. Also see
  [latest version](https://github.com/release-git/release-git#latest-version).
- `scripts.changelog` has been moved to `git.changelog`

## v10

- Dropped support for Node v6
- Deprecated options from v9 are removed, the `dist.repo` config in particular (also see
  [distribution repository](https://github.com/release-git/release-git/blob/main/docs/recipes/distribution-repo.md) for
  alternatives).
- Drop the `--debug` flag. `DEBUG=release-git:* ...` still works.

## v9

There should be no breaking changes, but there have been major internal refactorings and an improved UI. A bunch of new
features and bug fixes have been implemented. Last but not least, the configuration structure is changed significantly.
For this (backwards compatible) change, deprecation warnings are shown, and configurations must be migrated with the
next major release (v10).

- All "command hooks" have been moved to `scripts.*`, and some have been renamed.
- All `src.*` options have been moved to `git.*` (and `scripts.*`).
- The `dist.repo` configuration and functionality has been removed.

## v8

- Drop the `--force` flag. It's only use was to move a Git tag.

## v7

- No longer adds untracked files to release commit. (#230)

## v6

- Default value for `requireCleanWorkingDir` is now `true` (previously: `false`). (#173)
- Skip prompt (interactive) if corresponding task (non-interactive) is disabled. E.g. `npm.publish: false` will also not
  show "publish" prompt.
