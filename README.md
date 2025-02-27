# YnovDeploiementFormulaireAngular

[![codecov](https://codecov.io/gh/Hugo-Gehringer/deploiement-angular-form/graph/badge.svg?token=A1NUV73I0R)](https://codecov.io/gh/Hugo-Gehringer/deploiement-angular-form)

Lien du déploiement : [https://hugo-gehringer.github.io/ynov-ci-groupe/](https://hugo-gehringer.github.io/ynov-ci-groupe)
Lien de la doc : [https://hugo-gehringer.github.io/ynov-ci-groupe/docs](https://hugo-gehringer.github.io/ynov-ci-groupe/docs)
Lien du back sur vercel : https://ynov-ci-groupe.vercel.app/
## Frontend

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io).

### Code Coverage

Run `npm run test:coverage` to generate the code coverage report. The report will be available in the `coverage/` directory.

### Docker

To build and run the frontend using Docker:

1. Build the Docker image:
    ```sh
    docker build -t frontend-image -f front/Dockerfile .
    ```

2. Run the Docker container:
    ```sh
    docker run -p 4200:80 frontend-image
    ```

## Backend

### Development server

Run `npm start` to start the backend server. The server will be available at `http://localhost:3000/`.

### Running unit tests

Run `npm test` to execute the unit tests via [Jest](https://jestjs.io).

### Code Coverage

Run `npm run test:coverage` to generate the code coverage report. The report will be available in the `coverage/` directory.

### Docker

To build and run the backend using Docker:

1. Build the Docker image:
    ```sh
    docker build -t backend-image -f back/Dockerfile .
    ```

2. Run the Docker container:
    ```sh
    docker run -p 3000:3000 backend-image
    ```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
