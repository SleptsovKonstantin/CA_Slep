# RECRUITING CRM BACKEND

node version 14.5

### Getting started
1. Install all dependencies with `npm i`
2. `npm install apidoc-swagger -g`

Generate doc

` apidoc-swagger -i ./src -o doc/`


### Testing
1. Run tests with `npm test`

### Starting app locally
1. Start app in dev mode with `npm start`

### Starting in standalone mode
add to .env file line FAKE_AUTH=true

### Logging
Use `res.logger` object if need save additional logs info

###Docker
 docker-compose build
 docker-compose up -d
