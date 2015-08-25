# rippled-peers-webapp
Web dashboard for rippled peer network data

````
git clone https://github.com/ripple/rippled-peers-webapp
cd rippled-peers-webapp
npm install
````

## Development

````
npm start
````

Will start the development server on port 3000

## Production Build
````
npm run build
````

## Configuration

All configuration is injected with `config/config.json`

For the staging and production environments Circle CI will copy
the corresponding config file to override config/config.json

