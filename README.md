# YnovDeploiementFormulaireAngular

[![codecov](https://codecov.io/gh/Hugo-Gehringer/deploiement-angular-form/graph/badge.svg?token=A1NUV73I0R)](https://codecov.io/gh/Hugo-Gehringer/deploiement-angular-form)

Lien du déploiement : [https://hugo-gehringer.github.io/ynov-ci-groupe/](https://hugo-gehringer.github.io/ynov-ci-groupe)

Lien de la doc : [https://hugo-gehringer.github.io/ynov-ci-groupe/docs](https://hugo-gehringer.github.io/ynov-ci-groupe/docs)

Lien du back sur vercel : https://ynov-ci-groupe.vercel.app/

lien du swagger back : https://ynov-ci-groupe.vercel.app/api-docs

## Frontend

 ```sh
 cd front
 ```
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
To build and run the frontend using Docker, go to the docker directory:

Build and run the Docker image:
```sh
docker compose -f docker-compose-frontend.yml up -d --build
```
If you want change the api url, you can change the variable in the environment.ts file in the front/src/app/environment.
## Backend

 ```sh
 cd back
 ```

**Initialisation de la base de données dans le script init-db.js**

Admin : 
   
   username : **admin@admin.com**

   password : **a**

### Development server

Run `npm start` to start the backend server. The server will be available at `http://localhost:3000/`.

### Running unit tests

Run `npm test` to execute the unit tests via [Jest](https://jestjs.io).

### Code Coverage

Run `npm run test:coverage` to generate the code coverage report. The report will be available in the `coverage/` directory.

### Docker

To build and run the backend using Docker, go to the docker directory:

Build and run the Docker image:
```sh
docker compose -f docker-compose-backend.yml up -d --build
```