<template>
  <div class="eth-table">
    <el-checkbox v-model="onlyMoney">Show only money transactions</el-checkbox>
    <el-table
    :data="filteredTransactions"
    :show-header="false"
    stripe
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <div class="eth-table_item"
        v-for="(val, prop) in props.row"
        :key="prop">
          <div class="eth-table_item_prop">
            {{prop}}
          </div>
          <div class="eth-table_item_val">
            {{val}}
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="Hash"
      prop="hash">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  name: 'ethTable',
  props: ['transactions'],
  data () {
    return {
      onlyMoney: true
    }
  },
  computed: {
    filteredTransactions () {
      if (!this.onlyMoney) {
        return this.transactions
      } else {
        return this.transactions.filter(transaction => transaction.value !== '0')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.eth-table {
  max-height: 400px;
  overflow-y: scroll;

  &_item {
    display: flex;

    &_prop {
      min-width: 140px;
      text-align: left;
    }

    &_val {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>

