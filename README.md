This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

#### Configure your .env
```
cp .env.sample .env
# Populate values
source .env
```

#### Install the dependencies
You can install the dependencies with one of the following options:
```
npm install
```

#### Run the development server
You can run the development server manually with **Makefile** commands:
* `make run-dev`: Runs the development environment using npm.
* `make run-prod`: Builds the project and starts the production server using npm.
* `docker-build-dev`: Builds the development environment Docker image with specified configurations.
* `make docker-run-dev`: Runs the development environment using Docker, mapping the container port to 3000 and mounting necessary volumes.
* `make docker-build-prod`: Builds the production environment Docker image with specified build arguments.
* `make docker-run-prod`: Runs the production environment Docker container with specified configurations.
* `make docker-run-beta`: Runs the beta environment Docker container with specified configurations.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Conventions

### Branches

When creating a new branch, we must use the following convention:

- `feat/<<semantic description>>`: For new features
- `fix/<<semantic description>>`: For bux fixes
- `refact/<<semantic description>>`: For code refactoring
- `test/<<semantic description>>`: For new tests implementations
- `docs/<<semantic description>>`: For new documentation

### Commits

When adding a new commit to our branch, we must use the following convention (similar to branch creation):

- `feat: implementing new feature for ...` or `feat(<<context>>): implementing new feature for ...`
- `fix: fixing bug on ...` or `fix(<<context>>): fixing bug on ...`
- `refact: refactoring ... logic` or `refactor(<<context>>): refactoring ... logic`
- `test: implementing new tests for ...`
- `docs: "new method or new function" documentation`

> Credit Card IIN Ranges & Spacing Patterns information from: <https://baymard.com/checkout-usability/credit-card-patterns>

## Learn More

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
