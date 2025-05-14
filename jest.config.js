module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.test.ts"], // Ajuste o caminho para os seus testes
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Mapeamento de alias, se necessário
  },
  transform: {
    "^.+\\.ts$": "ts-jest", // Transpilar arquivos TypeScript
  },
  collectCoverage: true, // Opcional: para gerar relatórios de cobertura
  collectCoverageFrom: ["src/**/*.ts"], // Opcional: arquivos para cobertura
  //ignorar arquivos de teste
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/src/tests/",
    "<rootDir>/src/main.ts",
    "<rootDir>/src/infra/",
  ],
};
