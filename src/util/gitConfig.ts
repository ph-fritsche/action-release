import { spawn } from './spawn'

export async function gitConfig(env: {[k: string]: string | undefined}): Promise<void> {
    const name = env.GITHUB_ACTOR || 'github-actions[bot]'

    const email = env.GITHUB_ACTOR
        ? `${env.GITHUB_ACTOR}@users.noreply.github.com`
        : '41898282+github-actions[bot]@users.noreply.github.com'

    await spawn('git', ['config', '--global', 'user.name', name])
    await spawn('git', ['config', '--global', 'user.email', email])
}
