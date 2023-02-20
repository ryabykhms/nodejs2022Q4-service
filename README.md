# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & install Docker](https://www.docker.com/). Once the installation is complete, launch docker.

## Downloading

```
git clone https://github.com/ryabykhms/nodejs2022Q4-service
```

## Installation

- Switch to `develop` branch
- Copy `.env.example` to `.env`
- Run `npm install`

## Running application

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

Build services

```
npm run docker:build
```

Start containers

```
npm run docker:up
```

Run tests in containers

```
npm run docker:test
```

Scan docker images

```
npm run scan:api
npm run scan:db
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

Generate migrations

```
npm run migration:generate
```

Manual migration running

```
npm run migration:run
```

Revert migration

```
npm run migration:revert
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
