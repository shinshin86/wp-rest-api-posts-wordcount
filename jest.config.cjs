module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.cjs.json',
    },
  },
  testMatch: ['**/test/**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.+)': '<rootDir>/src/$1',
  },
};
