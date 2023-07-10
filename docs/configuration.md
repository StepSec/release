# Configuration

Out of the box, release-git has sane defaults, and [plenty of options][1] to configure it.

Put only the options to override in a configuration file. Here is a list of file names where release-git looks for
configuration in the root of the project:

- `.release-git.json`
- `.release-git.js` (or `.cjs`; export the configuration object: `module.exports = {}`)
- `.release-git.yaml` (or `.yml`)
- `.release-git.toml`
- `package.json` (in the `release-git` property)

Use `--config path/release-git.json` to use another configuration file location.

An example `.release-git.json`:

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

The configuration can also be stored in a `release-git` property in `package.json`:

```json
{
  "name": "my-package",
  "devDependencies": {
    "release-git": "*"
  },
  "release-git": {
    "github": {
      "release": true
    }
  }
}
```

Or, use YAML in `.release-git.yml`:

```yaml
git:
  requireCleanWorkingDir: false
```

TOML is also supported in `.release-git.toml`:

```toml
[hooks]
"before:init" = "npm test"
```

Any option can also be set on the command-line, and will have highest priority. Example:

```bash
release-git minor --git.requireBranch=main --github.release
```

Boolean arguments can be negated by using the `no-` prefix:

```bash
release-git --no-npm.publish
```

Also plugin options can be set from the command line:

```bash
release-git --no-plugins.@release-git/keep-a-changelog.strictLatest
```

[1]: ../config/release-git.json
