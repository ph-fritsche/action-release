export default {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
    ],
    testMatch: [
        '<rootDir>/test/**/*.{js,jsx,ts,tsx}',
    ],
    testPathIgnorePatterns: [
        '/_.*(?<!.test.[jt]sx?)$',
    ],
    transform: {
        '\\.([tj]sx?)$': ['ts-jest', {
            tsconfig: 'test/tsconfig.json',
        }],
    },
    transformIgnorePatterns: [
        '/node_modules/',
    ],
}
