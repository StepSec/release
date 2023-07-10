## Installation

Although release is a **generic** release tool, most projects use it for projects with npm packages. The recommended
way to install release uses npm and adds some minimal configuration to get started:

```bash
npm init release
```

Alternatively, install it manually, and add the `release` script to `package.json`:

```bash
npm install -D release
```

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "scripts": {
    "release": "release"
  },
  "devDependencies": {
    "release": "^15.10.0"
  }
}
```

## Usage

Run release from the root of the project using either `npm run` or `npx`:

```bash
npm run release
npx release
```

You will be prompted to select the new version, and more prompts will follow based on your configuration.

## Experimental: knowledge base

You might want to ask your questions in the [Release It! knowledge base][14] (powered by OpenAI and [7-docs][15]). This
is an experimental knowledge base, answers may be incorrect.

## Yarn

Using Yarn? Please see the [npm section on Yarn][16].

## Monorepos

Using a monorepo? Please see this [monorepo recipe][17].

## Global Installation

Per-project installation as shown above is recommended, but global installs are supported as well:

- From npm: `npm install -g release`
- From Homebrew: `brew install release`

## Videos, articles & examples

Here's a list of interesting external resources:

- Video: [How to use GitHub Actions & release to Easily Release Your Code][18]
- Article: [Monorepo Semantic Releases][19] ([repo][20])

Want to add yours to the list? Just open a pull request!

## Configuration

Out of the box, release has sane defaults, and [plenty of options][21] to configure it. Most projects use a
`.release.json` file in the project root, or a `release` property in `package.json`.

Here's a quick example `.release.json`:

```json
{
  "git": {
    "commitMessage": "chore: release v${version}"
  },
  "github": {
    "release": true
  }
}
```

→ See [Configuration][22] for more details.

## Interactive vs. CI mode

By default, release is **interactive** and allows you to confirm each task before execution:

<img src="./docs/assets/release-interactive.gif?raw=true" height="290">

By using the `--ci` option, the process is fully automated without prompts. The configured tasks will be executed as
demonstrated in the first animation above. In a Continuous Integration (CI) environment, this non-interactive mode is
activated automatically.

Use `--only-version` to use a prompt only to determine the version, and automate the rest.

## Latest version

How does release determine the latest version?

1.  For projects with a `package.json`, its `version` will be used (see [npm][23] to skip this).
2.  Otherwise, release uses the latest Git tag to determine which version should be released.
3.  As a last resort, `0.0.0` will be used as the latest version.

Alternatively, a plugin can be used to override this (e.g. to manage a `VERSION` or `composer.json` file):

- [@StepSec/bumper][24] to read from or bump the version in any file
- [@StepSec/conventional-changelog][25] to get a recommended bump based on commit messages
- [release-calver-plugin][26] to use CalVer (Calendar Versioning)

Add the `--release-version` flag to print the **next** version without releasing anything.

## Git

Git projects are supported well by release, automating the tasks to stage, commit, tag and push releases to any Git
remote.

→ See [Git][27] for more details.

## GitHub Releases

GitHub projects can have releases attached to Git tags, containing release notes and assets. There are two ways to add
[GitHub releases][28] in your release flow:

1.  Automated (requires a `GITHUB_TOKEN`)
2.  Manual (using the GitHub web interface with pre-populated fields)

→ See [GitHub Releases][29] for more details.

## GitLab Releases

GitLab projects can have releases attached to Git tags, containing release notes and assets. To automate [GitLab
releases][30]:

- Configure `gitlab.release: true`
- Obtain a [personal access token][31] (release only needs the "api" scope).
- Make sure the token is [available as an environment variable][32].

→ See [GitLab Releases][33] for more details.

## Changelog

By default, release generates a changelog, to show and help select a version for the new release. Additionally, this
changelog serves as the release notes for the GitHub or GitLab release.

The [default command][21] is based on `git log ...`. This setting (`git.changelog`) can be overridden. To further
customize the release notes for the GitHub or GitLab release, there's `github.releaseNotes` or `gitlab.releaseNotes`.
Make sure any of these commands output the changelog to `stdout`. Note that release by default is agnostic to commit
message conventions. Plugins are available for:

- GitHub and GitLab Releases
- auto-changelog
- Conventional Changelog
- Keep A Changelog

To print the changelog without releasing anything, add the `--changelog` flag.

→ See [Changelog][34] for more details.

## Publish to npm

With a `package.json` in the current directory, release will let `npm` bump the version in `package.json` (and
`package-lock.json` if present), and publish to the npm registry.

→ See [Publish to npm][23] for more details.

## Manage pre-releases

With release, it's easy to create pre-releases: a version of your software that you want to make available, while
it's not in the stable semver range yet. Often "alpha", "beta", and "rc" (release candidate) are used as identifiers for
pre-releases. An example pre-release version is `2.0.0-beta.0`.

→ See [Manage pre-releases][35] for more details.

## Update or re-run existing releases

Use `--no-increment` to not increment the last version, but update the last existing tag/version.

This may be helpful in cases where the version was already incremented. Here are a few example scenarios:

- To update or publish a (draft) GitHub Release for an existing Git tag.
- Publishing to npm succeeded, but pushing the Git tag to the remote failed. Then use
  `release --no-increment --no-npm` to skip the `npm publish` and try pushing the same Git tag again.

## Hooks

Use script hooks to run shell commands at any moment during the release process (such as `before:init` or
`after:release`).

The format is `[prefix]:[hook]` or `[prefix]:[plugin]:[hook]`:

| part   | value                                       |
| ------ | ------------------------------------------- |
| prefix | `before` or `after`                         |
| plugin | `version`, `git`, `npm`, `github`, `gitlab` |
| hook   | `init`, `bump`, `release`                   |

Use the optional `:plugin` part in the middle to hook into a life cycle method exactly before or after any plugin.

The core plugins include `version`, `git`, `npm`, `github`, `gitlab`.

Note that hooks like `after:git:release` will not run when either the `git push` failed, or when it is configured not to
be executed (e.g. `git.push: false`). See [execution order][36] for more details on execution order of plugin lifecycle
methods.

All commands can use configuration variables (like template strings). An array of commands can also be provided, they
will run one after another. Some example release configuration:

```json
{
  "hooks": {
    "before:init": ["npm run lint", "npm test"],
    "after:my-plugin:bump": "./bin/my-script.sh",
    "after:bump": "npm run build",
    "after:git:release": "echo After git push, before github release",
    "after:release": "echo Successfully released ${name} v${version} to ${repo.repository}."
  }
}
```

The variables can be found in the [default configuration][21]. Additionally, the following variables are exposed:

```text
version
latestVersion
changelog
name
repo.remote, repo.protocol, repo.host, repo.owner, repo.repository, repo.project
branchName
```

All variables are available in all hooks. The only exception is that the additional variables listed above are not yet
available in the `init` hook.

Use `--verbose` to log the output of the commands.

For the sake of verbosity, the full list of hooks is actually: `init`, `beforeBump`, `bump`, `beforeRelease`, `release`
or `afterRelease`. However, hooks like `before:beforeRelease` look weird and are usually not useful in practice.

Note that arguments need to be quoted properly when used from the command line:

```bash
release --'hooks.after:release="echo Successfully released ${name} v${version} to ${repo.repository}."'
```

Using Inquirer.js inside custom hook scripts might cause issues (since release also uses this itself).

## Dry Runs

Use `--dry-run` to show the interactivity and the commands it _would_ execute.

→ See [Dry Runs][37] for more details.

## Troubleshooting & debugging

- With `release --verbose` (or `-V`), release prints the output of every user-defined [hook][2].
- With `release -VV`, release also prints the output of every internal command.
- Use `NODE_DEBUG=release:* release [...]` to print configuration and more error details.

Use `verbose: 2` in a configuration file to have the equivalent of `-VV` on the command line.

## Plugins

Since v11, release can be extended in many, many ways. Here are some plugins:

| Plugin                                    | Description                                                                   |
| ----------------------------------------- | ----------------------------------------------------------------------------- |
| [@StepSec/bumper][24]                  | Read & write the version from/to any file                                     |
| [@StepSec/conventional-changelog][25]  | Provides recommended bump, conventional-changelog, and updates `CHANGELOG.md` |
| [@StepSec/keep-a-changelog][38]        | Maintain CHANGELOG.md using the Keep a Changelog standards                    |
| [@grupoboticario/news-fragments][41]      | An easy way to generate your changelog file                                   |
| [@j-ulrich/release-regex-bumper][42]   | Regular expression based version read/write plugin for release             |

Internally, release uses its own plugin architecture (for Git, GitHub, GitLab, npm).

→ See all [release plugins on npm][43].

→ See [plugins][44] for documentation to write plugins.

## Use release programmatically

While mostly used as a CLI tool, release can be used as a dependency to integrate in your own scripts. See [use
release programmatically][45] for example code.

## Example projects using release

- [axios/axios][46]
- [blockchain/blockchain-wallet-v4-frontend][47]
- [callstack/react-native-paper][48]
- [ember-cli/ember-cli][49]
- [js-cookie/js-cookie][50]
- [metalsmith/metalsmith][51]
- [mozilla/readability][52]
- [pahen/madge][53]
- [redis/node-redis][54]
- [reduxjs/redux][55]
- [saleor/saleor][56]
- [Semantic-Org/Semantic-UI-React][57]
- [shipshapecode/shepherd][58]
- [StevenBlack/hosts][59]
- [swagger-api/swagger-ui][60] + [swagger-editor][61]
- [tabler/tabler][62] + [tabler-icons][63]
- [youzan/vant][64]
- [Repositories that depend on release][65]
- GitHub search for [path:\*\*/.release.json][66]

## Legacy Node.js

The latest major version is v16, supporting Node.js 16 and up (as Node.js v14 is EOL). Use release v15 for
environments running Node.js v14. Also see [CHANGELOG.md][67].

## Links

- See [CHANGELOG.md][67] for major/breaking updates, and [releases][68] for a detailed version history.
- To **contribute**, please read [CONTRIBUTING.md][69] first.
- Please [open an issue][70] if anything is missing or unclear in this documentation.
