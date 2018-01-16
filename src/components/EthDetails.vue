<template>
  <div class="eth-details">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Details" name="details">
        <div class="eth-details_item"
        v-for="(val, prop) in block"
        v-if="!Array.isArray(val)"
        :key="prop">
          <div class="eth-details_item_prop">
            {{prop}}
          </div>
          <div class="eth-details_item_val">
            {{val}}
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Transactions" name="transactions">
        <eth-table :transactions="block.transactions"></eth-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import EthTable from './EthTable'
export default {
  name: 'ethDetails',
  components: {
    EthTable
  },
  props: ['block'],
  data () {
    return {
      activeTab: 'details'
    }
  }
}
</script>

<style lang="scss" scoped>
.eth-details {
  &_item {
    display: flex;

    &_prop {
      min-width: 140px;
      text-align: left;
    }

    &_val {
      overflow: hidden;
      overflow-x: scroll;
    }
  }
}
</style>
