import web3 from 'web3'

export default function (blocks) {
  let stats = {}
  stats.transactions = transactionStats(Object.values(blocks))
  return stats

  function transactionStats (blocks) {
    let min = Number.MAX_VALUE
    let max = Number.MIN_VALUE
    let avg = 0
    let total = 0
    let avgGasPrice = 0
    let avgGasLimit = 0
    let histogram = {
      labels: [
        '0 ETH',
        '0.1 - 1 ETH',
        '1 - 2 ETH',
        '2 - 3 ETH',
        '3 - 5 ETH',
        '5 - 10 ETH',
        '10 - 50 ETH',
        '50 - 100 ETH',
        '100 - 500 ETH',
        '500 - 1k ETH',
        '+1k ETH'
      ],
      datasets: [
        {
          label: 'ETHs sent per transaction',
          backgroundColor: 'rgba(255, 194, 68, 0.29)',
          borderColor: '#ffc244',
          borderWidth: 1,
          data: []
        }
      ],
      data: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '5': 0,
        '10': 0,
        '50': 0,
        '100': 0,
        '500': 0,
        '1000': 0,
        '10000': 0
      }
    }

    let economicPurpose = {
      labels: [
        'Sending ETHs',
        'Calling Smart Contratcts'
      ],
      datasets: [
        {
          label: 'Purpose of the transactions',
          backgroundColor: ['rgba(255, 194, 68, 0.29)', 'rgba(215, 124, 68, 0.29)'],
          borderColor: ['#ffc244', '#f121212'],
          borderWidth: 1,
          data: []
        }
      ],
      data: {
        money: 0,
        smart: 0
      }
    }

    blocks.forEach((block) => {
      if (block) {
        block.transactions.forEach((transaction) => {
          const val = parseFloat(web3.utils.fromWei(transaction.value, 'ether'))
          total += 1
          min = Math.min(min, val)
          max = Math.max(max, val)
          avg += val
          avgGasPrice += parseFloat(web3.utils.fromWei(transaction.gasPrice, 'gwei'))
          avgGasLimit += transaction.gas
          fillHistogram(val, histogram.data)
          val === 0 ? economicPurpose.data.smart++ : economicPurpose.data.money++
        })
      }
    })
    // Fill the dataset
    histogram.datasets[0].data = Object.values(histogram.data)
    economicPurpose.datasets[0].data = Object.values(economicPurpose.data)

    return {
      total,
      max: Math.round(max * 100) / 100,
      min,
      avg: Math.round(avg * 100 / total) / 100,
      avgGasLimit: Math.round(avgGasLimit * 100 / (total * 1000)) / 100,
      avgGasPrice: Math.round(avgGasPrice * 100 / total) / 100,
      histogram,
      economicPurpose,
      transactionsBlock: Math.round(total / blocks.length * 100) / 100
    }
  }
}

function fillHistogram (val, data) {
  if (val > 1000) {
    data['10000'] += 1
    return
  }
  if (val > 500) {
    data['1000'] += 1
    return
  }
  if (val > 100) {
    data['500'] += 1
    return
  }
  if (val > 50) {
    data['100'] += 1
    return
  }
  if (val > 10) {
    data['50'] += 1
    return
  }
  if (val > 5) {
    data['10'] += 1
    return
  }
  if (val > 3) {
    data['5'] += 1
    return
  }
  if (val > 2) {
    data['3'] += 1
    return
  }
  if (val > 1) {
    data['2'] += 1
    return
  }
  if (val > 0) {
    data['1'] += 1
    return
  }

  data['0'] += 1
}
