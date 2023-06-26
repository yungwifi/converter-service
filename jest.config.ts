export default {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  extensionsToTreatAsEsm: ['.ts'],
  testMatch: ['**/__tests__/**/*.test.ts'],
};
