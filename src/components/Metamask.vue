<template>
  <div class="metamask">
    <span> To enjoy EthStats you will need to have the MetaMask Chrome Extension </span>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/6Gf_kRE4MJU?rel=0&amp;controls=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_new" rel="norel">
      <el-button type="warning">Install Metamask</el-button>
    </a>
  </div>
</template>
<script>
export default {
  name: 'metamask'
}
</script>
<style lang="scss" scoped>
.metamask {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
</style>

