import { useState } from 'react'
import { currencyDataList } from './constants/currencyData.const'
import { generateRandomId } from './utils'
import { CurrencyAdder } from './components/CurrencyAdder'
import { CurrencyConverter } from './components/CurrencyConverter'
import { ExchangeRecordList } from './components/ExchangeRecordList'
import './App.css'

function App () {
  const [balance, setBalance] = useState(5000)
  const [currencyList, setCurrencyList] = useState([...currencyDataList])
  const [recordList, setRecordList] = useState<ExchangeRecord[]>([])

  const addCurrency: AddCurrencyFunc = (currencyName, currencyRate) => {
    if (currencyName && currencyRate) {
      setCurrencyList([
        ...currencyList,
        {
          key: generateRandomId(),
          name: currencyName,
          rateFromTWD: currencyRate
        }
      ])
    }
  }

  const exchange: ExchangeCurrencyFunc = (currencyItem) => {
    const { value, name, rateFromTWD } = currencyItem
    setRecordList([
      ...recordList,
      {
        twdValue: value.toString(),
        name,
        rateFromTWD
      }
    ])
    setBalance(balance - Number(value))
  }

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-4xl'>
        匯率轉換器
      </h1>

      <CurrencyAdder addCurrencyFunc={addCurrency}/>

      <h3 className='my-4 text-2xl'>您錢包還有 {balance} 元</h3>

      <CurrencyConverter 
        list={currencyList}
        exchangeFunc={exchange}
      />

      <ExchangeRecordList 
        list={recordList}
      />
    </div>
  )
}

export default App
