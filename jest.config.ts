const config = {
	testEnvironment: 'node',
	transform: {
		'^.+\\.tsx?$': ['ts-jest', {}],
	},
	preset: 'ts-jest',
	// globalSetup: './tests/globalSetup.ts',
	// globalTeardown: './tests/globalTeardown.ts',
	setupFilesAfterEnv: ['./test/setupFile.ts'],
	openHandlesTimeout: 2000,
}

export default config
