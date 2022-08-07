import { useState, MouseEventHandler } from 'react'
import { currencyDataList } from './constants/currencyData.const'
import './App.css'

function generateRandomId () {
  return Math.random().toString(16).slice(2)
}

function getValueById (id: string) {
  return (document.getElementById(id) as HTMLInputElement | null)?.value || ''
}

function resetValueById (id: string) {
  const el = (document.getElementById(id) as HTMLInputElement | null)
  if (el) {
    el.value = ''
  }
}

function App () {
  const [ownPrice, setOwnPrice] = useState(5000)
  const [price, setPrice] = useState<number>(0)
  const [currencyList, setCurrencyList] = useState([...currencyDataList])
  const [recordList, setRecordList] = useState<string[]>([])

  const setCurrentPrice: MouseEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    const price = getValueById('price')
    setPrice(Number(price))
  }

  const addCurrency: MouseEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    const currencyName = getValueById('currencyName')
    const currencyRate = getValueById('currencyRate')
    if (currencyName && currencyRate) {
      setCurrencyList([
        ...currencyList,
        {
          key: generateRandomId(),
          name: currencyName,
          rateFromTWD: currencyRate
        }
      ])
      resetValueById('currencyName')
      resetValueById('currencyRate')
    }
  }

  function exchange (currencyItem: CurrencyData) {
    const { name, rateFromTWD } = currencyItem
    setRecordList([
      ...recordList,
      `您用${price}元台幣，兌換了${(price * Number(rateFromTWD)).toFixed(2)}${name}`
    ])
    setOwnPrice(ownPrice - price)
  }

  return (
    <>
      <h3>新增幣種</h3>
      <form>
        <input type="text" placeholder="幣種名稱" id="currencyName" required/>
        <input type="number" placeholder="匯率" id="currencyRate" required step=".001"/>
        <input type="submit" value="新增幣種" onClick={addCurrency}/>
      </form>
      <hr></hr>

      <h3>您錢包還有 {ownPrice} 元</h3>

      <form>
        <div>
          請輸入您要換的台幣
        </div>
        <input type="number" placeholder="台幣" id="price" required/>
        <input type="submit" value="計算" onClick={setCurrentPrice}/>
      </form>

      <p>可以換算</p>
      <ul>
        {(
          currencyList.map(item => {
            return (
              <li key={item.key}>
                {item.name}：{(price * Number(item.rateFromTWD)).toFixed(2) || ''}
                <input type="button" value="兌換" onClick={() => exchange(item)}/>
              </li>
            )
          })
        )}
      </ul>

      <h3>您的兌換記錄</h3>
      <ul>
        {(
          recordList.map(item => {
            return (
              <li key={item}>{item}</li>
            )
          })
        )}
      </ul>
    </>
  )
}

export default App
