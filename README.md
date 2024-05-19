<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# linter
$ npm run lint
```

```
TODO: 
- rmq
- elastic
- graylog
...
```

## Setup (temporary solution, script will be upgraded)

```
# 1: sudo mariadb or mariadb
# 2: GRANT ALL PRIVILEGES ON *.* TO 'filipozbolt'@'localhost' IDENTIFIED BY '123' WITH GRANT OPTION;
# 3: FLUSH PRIVILEGES;
# 4: chmod +x createDatabase.sh
# 5: ./createDatabase.sh

# run migration:run
```