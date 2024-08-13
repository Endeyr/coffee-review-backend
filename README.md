# Express + TypeScript Template

This template provides a robust setup for an Express backend application with TypeScript. It follows best practices for backend development, utilizing TypeScript for type safety, Jest for testing, and ESLint for code quality.

## Getting Started

1. Clone the repository

   ```nodejs
   git clone https://github.com/Endeyr/express-template
   ```

2. Install dependencies:

   ```nodejs
    npm install
   ```

3. Run the development server:
   ```
    npm run dev
   ```

## Scripts

- npm run dev: Starts the development server using nodemon for hot-reloading.
- npm start: Runs the compiled JavaScript file for production.
- npm run test: Runs the Jest test suite with coverage reporting.
- npm run lint: Runs ESLint to check for code quality and style issues.

## Dependencies

The project uses the following main dependencies:

- Express: A fast, unopinionated web framework for Node.js.
- bcryptjs: A library for hashing passwords.
- jsonwebtoken: An implementation of JSON Web Tokens for authentication.
- zod: A TypeScript-first schema declaration and validation library.
- cors: Middleware to enable CORS in Express applications.
- dotenv: A zero-dependency module that loads environment variables from a .env file.

## Dev Dependencies

The development dependencies include tools and libraries to aid in development:

- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- ESLint: A tool for identifying and fixing problems in JavaScript and TypeScript code.
- Jest: A delightful JavaScript Testing Framework with a focus on simplicity.
- Nodemon: A utility that monitors for any changes in your source and automatically restarts your server.
- Supertest: A library for testing HTTP assertions.

## Project Structure

```bash
root/
├── api/ # api folder due to vercel requirement
│ └── index.ts # start the express app
├── test/ # home for jest test
├── .env # env variables
├── .eslintrc.js # eslint config
├── jest.config.js # jest config
├── tsconfig.json # typescript config
└── package.json # project metadata and dependencies
```

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js version 22.3.0 or later
- npm version 10.8.2 or later

## License

This project is licensed under the MIT License.
