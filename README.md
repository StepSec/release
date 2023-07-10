# Release It! 🚀

🚀 Generic CLI tool to automate versioning and package publishing-related tasks:

<img align="right" src="./docs/assets/release-git.svg?raw=true" height="280">

- Bump version (in e.g. `package.json`)
- [Git commit, tag, push][1]
- Execute any (test or build) commands using [hooks][2]
- [Create release at GitHub][3] or [GitLab][4]
- [Generate changelog][5]
- [Publish to npm][6]
- [Manage pre-releases][7]
- Extend with [plugins][8]
- Release from any [CI/CD environment][9]

Use release-git for version management and publish to anywhere with its versatile configuration, a powerful plugin
system, and hooks to execute any command you need to test, build, and/or publish your project.

[![Action Status][11]][10] [![npm version][13]][12]

## Installation

Although release-git is a **generic** release tool, most projects use it for projects with npm packages. The recommended
way to install release-git uses npm and adds some minimal configuration to get started:

```bash
npm init release-git
```

Alternatively, install it manually, and add the `release` script to `package.json`:

```bash
npm install -D release-git
```

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "scripts": {
    "release": "release-git"
  },
  "devDependencies": {
    "release-git": "^15.10.0"
  }
}
```

## Usage

Run release-git from the root of the project using either `npm run` or `npx`:

```bash
npm run release
npx release-git
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

- From npm: `npm install -g release-git`
- From Homebrew: `brew install release-git`

## Videos, articles & examples

Here's a list of interesting external resources:

- Video: [How to use GitHub Actions & Release-Git to Easily Release Your Code][18]
- Article: [Monorepo Semantic Releases][19] ([repo][20])

Want to add yours to the list? Just open a pull request!

## Configuration

Out of the box, release-git has sane defaults, and [plenty of options][21] to configure it. Most projects use a
`.release-git.json` file in the project root, or a `release-git` property in `package.json`.

Here's a quick example `.release-git.json`:

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

By default, release-git is **interactive** and allows you to confirm each task before execution:

<img src="./docs/assets/release-git-interactive.gif?raw=true" height="290">

By using the `--ci` option, the process is fully automated without prompts. The configured tasks will be executed as
demonstrated in the first animation above. In a Continuous Integration (CI) environment, this non-interactive mode is
activated automatically.

Use `--only-version` to use a prompt only to determine the version, and automate the rest.

## Latest version

How does release-git determine the latest version?

1.  For projects with a `package.json`, its `version` will be used (see [npm][23] to skip this).
2.  Otherwise, release-git uses the latest Git tag to determine which version should be released.
3.  As a last resort, `0.0.0` will be used as the latest version.

Alternatively, a plugin can be used to override this (e.g. to manage a `VERSION` or `composer.json` file):

- [@release-git/bumper][24] to read from or bump the version in any file
- [@release-git/conventional-changelog][25] to get a recommended bump based on commit messages
- [release-git-calver-plugin][26] to use CalVer (Calendar Versioning)

Add the `--release-version` flag to print the **next** version without releasing anything.

## Git

Git projects are supported well by release-git, automating the tasks to stage, commit, tag and push releases to any Git
remote.

→ See [Git][27] for more details.

## GitHub Releases

GitHub projects can have releases attached to Git tags, containing release notes and assets. There are two ways to add
[GitHub releases][28] in your release-git flow:

1.  Automated (requires a `GITHUB_TOKEN`)
2.  Manual (using the GitHub web interface with pre-populated fields)

→ See [GitHub Releases][29] for more details.

## GitLab Releases

GitLab projects can have releases attached to Git tags, containing release notes and assets. To automate [GitLab
releases][30]:

- Configure `gitlab.release: true`
- Obtain a [personal access token][31] (release-git only needs the "api" scope).
- Make sure the token is [available as an environment variable][32].

→ See [GitLab Releases][33] for more details.

## Changelog

By default, release-git generates a changelog, to show and help select a version for the new release. Additionally, this
changelog serves as the release notes for the GitHub or GitLab release.

The [default command][21] is based on `git log ...`. This setting (`git.changelog`) can be overridden. To further
customize the release notes for the GitHub or GitLab release, there's `github.releaseNotes` or `gitlab.releaseNotes`.
Make sure any of these commands output the changelog to `stdout`. Note that release-git by default is agnostic to commit
message conventions. Plugins are available for:

- GitHub and GitLab Releases
- auto-changelog
- Conventional Changelog
- Keep A Changelog

To print the changelog without releasing anything, add the `--changelog` flag.

→ See [Changelog][34] for more details.

## Publish to npm

With a `package.json` in the current directory, release-git will let `npm` bump the version in `package.json` (and
`package-lock.json` if present), and publish to the npm registry.

→ See [Publish to npm][23] for more details.

## Manage pre-releases

With release-git, it's easy to create pre-releases: a version of your software that you want to make available, while
it's not in the stable semver range yet. Often "alpha", "beta", and "rc" (release candidate) are used as identifiers for
pre-releases. An example pre-release version is `2.0.0-beta.0`.

→ See [Manage pre-releases][35] for more details.

## Update or re-run existing releases

Use `--no-increment` to not increment the last version, but update the last existing tag/version.

This may be helpful in cases where the version was already incremented. Here are a few example scenarios:

- To update or publish a (draft) GitHub Release for an existing Git tag.
- Publishing to npm succeeded, but pushing the Git tag to the remote failed. Then use
  `release-git --no-increment --no-npm` to skip the `npm publish` and try pushing the same Git tag again.

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
will run one after another. Some example release-git configuration:

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
release-git --'hooks.after:release="echo Successfully released ${name} v${version} to ${repo.repository}."'
```

Using Inquirer.js inside custom hook scripts might cause issues (since release-git also uses this itself).

## Dry Runs

Use `--dry-run` to show the interactivity and the commands it _would_ execute.

→ See [Dry Runs][37] for more details.

## Troubleshooting & debugging

- With `release-git --verbose` (or `-V`), release-git prints the output of every user-defined [hook][2].
- With `release-git -VV`, release-git also prints the output of every internal command.
- Use `NODE_DEBUG=release-git:* release-git [...]` to print configuration and more error details.

Use `verbose: 2` in a configuration file to have the equivalent of `-VV` on the command line.

## Plugins

Since v11, release-git can be extended in many, many ways. Here are some plugins:

| Plugin                                     | Description                                                                   |
| ------------------------------------------ | ----------------------------------------------------------------------------- |
| [@release-git/bumper][24]                  | Read & write the version from/to any file                                     |
| [@release-git/conventional-changelog][25]  | Provides recommended bump, conventional-changelog, and updates `CHANGELOG.md` |
| [@release-git/keep-a-changelog][38]        | Maintain CHANGELOG.md using the Keep a Changelog standards                    |
| [@release-git-plugins/lerna-changelog][39] | Integrates lerna-changelog into the release-git pipeline                      |
| [@release-git-plugins/workspaces][40]      | Releases each of your projects configured workspaces                          |
| [release-git-calver-plugin][26]            | Enables Calendar Versioning (calver) with release-git                         |
| [@grupoboticario/news-fragments][41]       | An easy way to generate your changelog file                                   |
| [@j-ulrich/release-it-regex-bumper][42]   | Regular expression based version read/write plugin for release-git            |

Internally, release-git uses its own plugin architecture (for Git, GitHub, GitLab, npm).

→ See all [release-git plugins on npm][43].

→ See [plugins][44] for documentation to write plugins.

## Use release-git programmatically

While mostly used as a CLI tool, release-git can be used as a dependency to integrate in your own scripts. See [use
release-git programmatically][45] for example code.

## Example projects using release-git

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
- [Repositories that depend on release-git][65]
- GitHub search for [path:\*\*/.release-git.json][66]

## Legacy Node.js

The latest major version is v16, supporting Node.js 16 and up (as Node.js v14 is EOL). Use release-git v15 for
environments running Node.js v14. Also see [CHANGELOG.md][67].

## Links

- See [CHANGELOG.md][67] for major/breaking updates, and [releases][68] for a detailed version history.
- To **contribute**, please read [CONTRIBUTING.md][69] first.
- Please [open an issue][70] if anything is missing or unclear in this documentation.

## License

[MIT][71]

[1]: #git
[2]: #hooks
[3]: #github-releases
[4]: #gitlab-releases
[5]: #changelog
[6]: #publish-to-npm
[7]: #manage-pre-releases
[8]: #plugins
[9]: ./docs/ci.md
[10]: https://github.com/release-git/release-git/actions
[11]: https://github.com/release-git/release-git/workflows/Cross-OS%20Tests/badge.svg
[12]: https://www.npmjs.com/package/release-git
[13]: https://badge.fury.io/js/release-git.svg
[14]: https://release-git.deno.dev
[15]: https://github.com/7-docs/7-docs
[16]: ./docs/npm.md#yarn
[17]: ./docs/recipes/monorepo.md
[18]: https://www.youtube.com/watch?v=7pBcuT7j_A0
[19]: https://medium.com/valtech-ch/monorepo-semantic-releases-db114811efa5
[20]: https://github.com/b12k/monorepo-semantic-releases
[21]: ./config/release-git.json
[22]: ./docs/configuration.md
[23]: ./docs/npm.md
[24]: https://github.com/release-git/bumper
[25]: https://github.com/release-git/conventional-changelog
[26]: https://github.com/casmith/release-it-calver-plugin
[27]: ./docs/git.md
[28]: https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases
[29]: ./docs/github-releases.md
[30]: https://docs.gitlab.com/ce/user/project/releases/
[31]: https://gitlab.com/profile/personal_access_tokens
[32]: ./docs/environment-variables.md
[33]: ./docs/gitlab-releases.md
[34]: ./docs/changelog.md
[35]: ./docs/pre-releases.md
[36]: ./docs/plugins.md#execution-order
[37]: ./docs/dry-runs.md
[38]: https://github.com/release-git/keep-a-changelog
[39]: https://github.com/release-git-plugins/lerna-changelog
[40]: https://github.com/release-git-plugins/workspaces
[41]: https://github.com/grupoboticario/news-fragments
[42]: https://github.com/j-ulrich/release-it-regex-bumper
[43]: https://www.npmjs.com/search?q=keywords:release-git-plugin
[44]: ./docs/plugins.md
[45]: ./docs/recipes/programmatic.md
[46]: https://github.com/axios/axios
[47]: https://github.com/blockchain/blockchain-wallet-v4-frontend
[48]: https://github.com/callstack/react-native-paper
[49]: https://github.com/ember-cli/ember-cli
[50]: https://github.com/js-cookie/js-cookie
[51]: https://github.com/metalsmith/metalsmith
[52]: https://github.com/mozilla/readability
[53]: https://github.com/pahen/madge
[54]: https://github.com/redis/node-redis
[55]: https://github.com/reduxjs/redux
[56]: https://github.com/saleor/saleor
[57]: https://github.com/Semantic-Org/Semantic-UI-React
[58]: https://github.com/shipshapecode/shepherd
[59]: https://github.com/StevenBlack/hosts
[60]: https://github.com/swagger-api/swagger-ui
[61]: https://github.com/swagger-api/swagger-editor
[62]: https://github.com/tabler/tabler
[63]: https://github.com/tabler/tabler-icons
[64]: https://github.com/youzan/vant
[65]: https://github.com/release-git/release-git/network/dependents
[66]: https://github.com/search?q=path%3A**%2F.release-git.json&type=code
[67]: ./CHANGELOG.md
[68]: https://github.com/release-git/release-git/releases
[69]: ./.github/CONTRIBUTING.md
[70]: https://github.com/release-git/release-git/issues/new
[71]: ./LICENSE
