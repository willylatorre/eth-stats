# ethstats

> A little vue.js project to test the possibilities of web3.js

## Demo
Check the demo at [https://eth-stats.herokuapp.com/](https://eth-stats.herokuapp.com/) and be sure to have Metamask installed

## About

This is a little project to test the possibilities of web3.js. For now, it does the following things:

- Connects to the ETH network
- Retrieves the latest 12 blocks
- Continues to retrieve blocks as they are mined. There is a maximum buffer size of 100 blocks to prevails the performance
- Calculates a bunch of stats about the blocks. Ideally, those stats calculations are done in a Web worker to free the main thread.
- You can check the details of a block.
- You can check the transactions of a block

A lot of more interesting things will be added for sure!

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
