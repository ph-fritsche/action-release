import * as SemanticRelease from 'semantic-release'

// see https://github.com/semantic-release/semantic-release/blob/master/docs/developer-guide/js-api.md
export default {
    lastRelease: {
        gitHead: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
        version: '1.0.0',
        gitTag: 'v1.0.0',
        channel: 'next',
    },
    commits: [
        {
            commit: {
                long: '68eb2c4d778050b0701136ca129f837d7ed494d2',
                short: '68eb2c4',
            },
            tree: {
                long: '7ab515d12bd2cf431745511ac4ee13fed15ab578',
                short: '7ab515d',
            },
            author: {
                name: 'Me',
                email: 'me@email.com',
                date: new Date('2018-07-22T20:52:44.000Z'),
            },
            committer: {
                name: 'Me',
                email: 'me@email.com',
                date: new Date('2018-07-22T20:52:44.000Z'),
            },
            subject: 'feat: a new feature',
            body: 'Description of the new feature',
            hash: '68eb2c4d778050b0701136ca129f837d7ed494d2',
            message: 'feat: a new feature\n\nDescription of the new feature',
            committerDate: new Date('2018-07-22T20:52:44.000Z'),
        },
    ],
    nextRelease: {
        type: 'minor',
        gitHead: '68eb2c4d778050b0701136ca129f837d7ed494d2',
        version: '1.1.0',
        gitTag: 'v1.1.0',
        notes: 'Release notes for version 1.1.0...',
        channel: 'next',
    },
    releases: [
        {
            name: 'GitHub release',
            url: 'https://github.com/me/my-package/releases/tag/v1.1.0',
            type: 'minor',
            gitHead: '68eb2c4d778050b0701136ca129f837d7ed494d2',
            version: '1.1.0',
            gitTag: 'v1.1.0',
            notes: 'Release notes for version 1.1.0...',
            pluginName: '@semantic-release/github',
            channel: 'next',
        },
        {
            name: 'npm package (@latest dist-tag)',
            url: 'https://www.npmjs.com/package/my-package',
            type: 'minor',
            gitHead: '68eb2c4d778050b0701136ca129f837d7ed494d2',
            version: '1.1.0',
            gitTag: 'v1.1.0',
            notes: 'Release notes for version 1.1.0...',
            pluginName: '@semantic-release/npm',
            channel: 'next',
        },
    ],
// typing does not match documented output
} as unknown as Extract<SemanticRelease.Result, {[k: string]: unknown }>
