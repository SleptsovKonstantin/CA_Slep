# Exceed CRM

node version 14.19.1

### Provides

- react ^16.x
- react-router 4.x
- react-helmet 5.x
- redux 4.x
- redux-saga 0.16.x
- redux-persist 5.x

### Development

- webpack-dev-server 3.x
- react-hot-loader 4.x
- redux-devtools (with browser plugfin)

`npm start`

### Building

- webpack 4.x
- babel 7.x

`npm run build`

### Code Quality

- eslint 5.x
- stylelint 9.x

`npm run lint` / `npm run lint:styles`

### Unit Testing

- jest 23.x
- enzyme 3.x

`npm test`

### End 2 End Testing

- cypress 3.0.x

`npm run test:e2e`

'docker run -it --rm -p 1337:80 sample:prod'

##SETUP WEBSTORM

- go to Setting(Preferences) -> JS -> Code quality tools -> ESlint
- set checkbox enabled
- select used at project node version
- select installed eslint module (use eslint version 5 for IDE version lower when 2019.2)
- select Use specific config file and select .eslintrc file inside your root project folder
