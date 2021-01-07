import { spawn } from './spawn'

export async function updateTags(
    ref: string,
    versionString: string,
    version: {
        major: string,
        minor: string,
        patch: string,
        revision: string | undefined,
        revisionType: string | undefined,
    },
    tagPrefix = '',
): Promise<string[]> {
    const tags: string[] = []

    if (!version.revision) {
        const minorTag = `${tagPrefix}${version.major}.${version.minor}`
        tags.push(minorTag)

        const nextMinor = `${tagPrefix}${version.major}.${Number(version.minor) + 1}.0`
        const hasNextMinor = await spawn('git', ['ls-remote', 'origin', `refs/tags/${nextMinor}`])
        if (!hasNextMinor) {
            const majorTag = `${tagPrefix}${version.major}`
            tags.push(majorTag)
        }
    } else if (version.revisionType) {
        const revisionTag = `${tagPrefix}${version.major}.${version.minor}.${version.patch}-${version.revisionType}`
        tags.push(revisionTag)
    }

    if (tags.length) {
        for (const tag of tags) {
            await spawn('git', ['tag', '-fam', versionString, tag, ref])
        }
        await spawn('git', ['push', '-f', 'origin',
            ...tags.map(t => `refs/tags/${t}:refs/tags/${t}`),
        ])
    }

    return tags
}
