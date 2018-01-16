<template>
  <div id="app">
    <main>
      <template v-if="hasEthProvider">
        <hello></hello>
      </template>
      <template v-else>
        <metamask></metamask>
      </template>
    </main>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Metamask from './components/Metamask'

export default {
  name: 'app',
  data () {
    return {
      hasEthProvider: false
    }
  },
  beforeMount () {
    this.checkForMetamask()
  },
  methods: {
    checkForMetamask () {
      this.hasEthProvider = !!this.$web3.givenProvider
    }
  },
  components: {
    Hello,
    Metamask
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
