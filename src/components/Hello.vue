<template>
  <div class="hello">
    <div class="hello_header">
      <div class="hello_header_wrapper">
        <span>ETHStats</span>
        <el-input
          placeholder="Block number or hash"
          prefix-icon="el-icon-search"
          @keyup.enter.native="searchBlock"
          v-model="blockToSearch">
        </el-input>
      </div>
    </div>
    <div class="hello_content">
      <div class="hello_blocks"  >
        <div id="blocks" class="hello_blocks_blocks"> 
          <eth-block 
            v-for="(block, number) in lastBlocks"
            :key="number"
            :number="number"
            @details="displayBlockDetails(block)"
            :block="block"></eth-block>
        </div>
        <div class="hello_blocks_explanation">
          <i class="el-icon-back" style="margin-right:20px"></i> Here are the latests blocks of the blockchain. Scroll to check them all.
        </div>        
      </div>
      <div class="hello_stats">
        <h1> Some stats over the last {{Object.keys(blocks).length}} blocks</h1>
        <div class="hello_stats_content" v-if="stats.transactions">
          <div class="hello_stats_bignum">
            {{stats.transactions.avg}}
            <span> ETH on average per transaction </span>
          </div>
          <div class="hello_stats_bignum">
            {{stats.transactions.max}}
            <span> ETHs sent in the biggest transaction </span>
          </div>
          <div class="hello_stats_bignum">
            {{stats.transactions.total}}
            <span> transactions sent</span>
          </div>
          <div class="hello_stats_bignum">
            {{stats.transactions.transactionsBlock}}
            <span> transactions / block on average </span>
          </div>
          <div class="hello_stats_bignum">
            {{stats.transactions.avgGasPrice}}
            <span>gwei is the average gas price</span>
          </div>
          <div class="hello_stats_bignum">
            {{stats.transactions.avgGasLimit}}k
            <span> average gas limit </span>
          </div>
          <bar-chart 
            class="hello_stats_chart"
            :chart-data="stats.transactions.histogram"></bar-chart>
          <pie-chart 
            class="hello_stats_chart"          
            :chart-data="stats.transactions.economicPurpose"></pie-chart>
     
        </div>
        
      </div>
    </div>
    
    <el-dialog
      :title="'Block '+ selectedBlock.number"
      :visible.sync="dialogVisible"
      width="60%">
      <eth-details :block="selectedBlock"></eth-details>
    </el-dialog>
    <el-dialog
      title="Ehem, ehem"
      :visible.sync="dialogError"
      width="60%">
      <el-alert
        title="The block number/hash introduced does not match any result"
        type="error"
        show-icon></el-alert>
    </el-dialog>
  </div>
</template>

<script>
import EthBlock from './EthBlock'
import EthDetails from './EthDetails'
import calcStats from '../workers/StatsWorker'
import BarChart from './BarChart'
import PieChart from './PieChart'
const REFRESH_INTERVAL = 20000
const BLOCKS_BUFFER = 100

export default {
  name: 'hello',
  components: {
    EthBlock,
    EthDetails,
    BarChart,
    PieChart
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      currentBlockNumber: 0,
      selectedBlock: {},
      blockToSearch: null,
      dialogVisible: false,
      dialogError: false,
      blocks: {},
      scrolled: false,
      stats: {}
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    lastBlocks () {
      let lastBlocks = {}
      const currentNum = this.currentBlockNumber
      const lastTwelve = Array.from(Array(12).keys())
      lastTwelve.forEach(num => {
        let blockNumber = currentNum - num
        lastBlocks[blockNumber] = this.blocks[blockNumber]
      })
      return lastBlocks
    }
  },
  methods: {
    async init () {
      this.retrieveLatestBlocks()
    },
    async retrieveLatestBlocks () {
      this.currentBlockNumber = await this.$eth.getBlockNumber()
      const lastTwelve = Array.from(Array(12).keys())
      await Promise.all(lastTwelve.map(num => {
        let blockNumber = this.currentBlockNumber - num
        return this.retrieveBlock(blockNumber)
      }))
      if (!this.scrolled) {
        const container = document.getElementById('blocks')
        container.scrollLeft = 4000
        this.scrolled = true
      }
      setTimeout(this.retrieveLatestBlocks, REFRESH_INTERVAL)
    },
    async retrieveBlock (blockNumber) {
      if (this.blocks[blockNumber] === undefined || this.blocks[blockNumber] === null) {
        try {
          let block = await this.$eth.getBlock(blockNumber, true)
          if (block) this.addAndCheck(block, blockNumber)
          return block
        } catch (err) {
          console.error('there was an error')
        }
      } else {
        return this.blocks[blockNumber]
      }
    },
    async searchBlock () {
      let block = await this.retrieveBlock(this.blockToSearch)
      if (block) {
        this.displayBlockDetails(block)
      } else {
        this.displayErrorDetails()
      }
    },
    addAndCheck (block, blockNumber) {
      this.$set(this.blocks, blockNumber, block)
      if (this.blocks[blockNumber - BLOCKS_BUFFER] !== undefined) {
        this.$delete(this.blocks, blockNumber - BLOCKS_BUFFER)
      }
      this.calcStats()
    },
    async calcStats () {
      // let stats = await this.$worker.run(calcStats, [this.blocks])
      this.stats = calcStats(this.blocks)
    },
    displayBlockDetails (block) {
      this.selectedBlock = block
      this.dialogVisible = true
    },
    displayErrorDetails () {
      this.dialogError = true
    }
  }
}
</script>

<style lang="scss">
.hello {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f6f6f6;

  &_content {
    max-width: 1080px;
    width: 100%;
  }

  &_header {
    margin: 0;
    width: 100%;
    margin-bottom: 40px;
    height: 56px;
    background-color: #35495E;
    

    &_wrapper {
      width: 100%;
      height: 100%;
      max-width: 1080px;
      display: flex;
      margin: 0 auto;
      color: #ffffff;
      font-size: 20px;
      padding: 0 20px;
      align-items: center;
      justify-content: space-between;
    }
  }

  &_blocks {
    display: flex;
    flex-direction: row;

    &_explanation {
      max-width: 250px;
      padding: 10px;
      margin-left: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 50px;

      @media(max-width: 600px) {
        max-width: 150px;
        margin-left: 20px;
      }
    }
    &_blocks {
      display: flex;
      max-width: 650px;
      flex: 1;
      overflow-x: scroll;
      flex-direction: row;
      padding-bottom: 50px;
    }
  }

  &_stats {
    align-self: center;
    background-color: white;
    padding: 20px;
    margin: 10px;
    border: 1px solid rgba(0,0,0,0.1);
    
    &_content {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;  
    }

    &_bignum {
      margin: 40px;
      font-size: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      @media(max-width: 600px) {
        font-size: 40px;
      }

      & span {
        font-size: 14px;
      }
    }

    &_chart {
      margin: 40px;
    }
  }
}

.el-input {
  max-width: 200px;
  font-size: 14px;

  &__inner {
    background-color: transparent;
    border: 0px;
    color: white;
    border-bottom: 1px solid white;
  }
}
</style>
