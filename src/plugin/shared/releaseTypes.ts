export enum releaseTypes {
    'major' = 'major',
    'premajor' = 'premajor',
    'minor' = 'minor',
    'preminor' = 'preminor',
    'patch' = 'patch',
    'prepatch' = 'prepatch',
    'prerelease' = 'prerelease',
}

export function getReleaseType(k: string): releaseTypes | undefined {
    return Object.keys(releaseTypes).includes(k as releaseTypes) ? releaseTypes[k as releaseTypes] : undefined
}
