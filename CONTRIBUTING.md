# Contributing

Thanks for helping improve the Sero Loom plugin. This repository is maintained
by `sero-labs`.

## Workflow

Use the standard fork-and-pull-request workflow. Open a pull request against
`main` with:

- A description of what changed
- Why the change is needed
- How you tested it
- Any security, privacy, or compatibility considerations

## Local checks

Run these locally before opening a pull request:

```bash
npm install
npm run typecheck
npm run build
npm test
```

## Security

Never commit secrets, API keys, OAuth tokens, private local paths, generated
credential files, or machine-specific configuration.

Report security vulnerabilities privately as described in
[SECURITY.md](./SECURITY.md), not through public issues.
