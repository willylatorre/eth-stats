<template>
  <div class="block">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{number}}</span>
      </div>
      <template v-if="block">
        <el-button type="default" icon="el-icon-document" @click="$emit('details')">Check Block</el-button>
      </template>
      <template v-else>
        <el-button type="text" :loading="true">In progress</el-button>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ethBlock',
  props: ['block', 'number'],
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.block {
  width: 180px;
  margin: 10px;
  flex: 0 0 180px;
  position: relative;

  &:before {
    content: '';
    width: 20px;
    border-bottom: dashed 1px #080808;
    position: absolute;
    left: -20px;
    top: 48%;
    z-index: 1;
  }
}
</style>




