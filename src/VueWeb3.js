import Web3 from 'web3'
// TODO if web3 is supported
let web3 = window.web3

const install = function (Vue, initConf = {}, mixin) {
  let web3js = null
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider)
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    if (initConf.provider) {
      web3js = new Web3(new Web3.providers.HttpProvider(initConf.provider))
    } else if (initConf.noFallback) {
      web3js = new Web3()
    } else {
      web3js = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    }
  }
  // const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546')

  Vue.prototype.$web3 = web3js
  Vue.prototype.$eth = web3js.eth
}

export default { install }
