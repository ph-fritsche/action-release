# action-release

Run [semantic-release](https://semantic-release.gitbook.io/) as GitHub action

## Usage

```yml
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
    # ...
    - name: Checkout
      uses: actions/checkout@v2
    - name: Release
      uses: ph-fritsche/action-release@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Release on github

This is the intended use, but you can disable [`@semantic-release/github`](https://github.com/semantic-release/github) by omitting the `GITHUB_TOKEN` environment variable.

### Release an npm package

Set your `NPM_TOKEN` secret on the repository and add it to the environment variables for the action:

```yml
      env:
        NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

This will enable the [`@semantic-release/npm`](https://github.com/semantic-release/npm) plugin.

### Shareable configuration

You can run the action with your [shareable configuration](https://semantic-release.gitbook.io/semantic-release/usage/shareable-configurations).

This will be extended by the default config.

```yml
      uses: ph-fritsche/action-release@v1
      with:
        config: '@mynamespace/my-shareable-semantic-release-configuration'
```

### Inline configuration

You can pass a configuration as JSON-formatted input.

This will override settings in the default config.

```yml
      uses: ph-fritsche/action-release@v1
      with:
        config: '{"preset":"angular"}'
```

You can extend your shareable configuration and override settings:

```yml
      uses: ph-fritsche/action-release@v1
      with:
        config: '{"extends":"@mynamespace/my-shareable-semantic-release-configuration","preset":"angular"}'
```

### Force release

If you want to force a release in one of your workflows, you can do so:

```yml
      uses: ph-fritsche/action-release@v1
      with:
        force: minor # forces at least a feature release
```

### Initial release

When run without a previous release this action releases an initial release,
even if the branch contains no commit that usually would trigger one with `semantic-release` (e.g. a branch only containing `wip:` commits).

### Other options

```yml
      with:
        dry: true # activate dry run
        debug: true # be more verbose and run semantic-release in debug mode
```

### Defaults

This action defaults to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) preset.

---

Inspired by [cycjimmy/semantic-release-action](https://github.com/cycjimmy/semantic-release-action).
