# eesa-electricity-price-demo

## Environment setup
```angular2html
node: v18.18.2
pnpm: 8.15.5
```

## Project setup
```
# install dependencies
pnpm install

# update .env file
VITE_APP_ID=your_app_id
VITE_APP_SECRET=your_app_secret

# serve with hot reload at localhost:3001
pnpm dev
```

## Code example
```javascript
#src/request/index.js
config.headers = {
    appId: import.meta.env.VITE_APP_ID,
    timestamp: new Date().getTime(),
    nonce: Array.from({length: 10}, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('')
}
const originSign = `appId=${config.headers.appId}&appSecret=${import.meta.env.VITE_APP_SECRET}&nonce=${config.headers.nonce}&timestamp=${config.headers.timestamp}`
config.headers.sign = md5(originSign)
```

