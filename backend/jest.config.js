/** @type {import('jest').Config} */
const config = {
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  verbose: true,
  collectCoverage: true, // Habilitar la recolección de cobertura
  collectCoverageFrom: [
    "src/**/*.{js,jsx}", // Especificar los archivos de los que se debe recolectar la cobertura
  ],
  coverageDirectory: "coverage", // Directorio donde se almacenarán los informes de cobertura
  coverageReporters: ["json", "lcov", "text", "clover"], // Formatos de los informes de cobertura
};

export default config;