import { useState, useEffect } from 'react'

interface Props {
  list: CurrencyData[],
  exchangeFunc: ExchangeCurrencyFunc
}

export const CurrencyConverter = ({ list, exchangeFunc }: Props) => {
  const [price, setPrice] = useState<number | string>('0')
  const [currencyList, setCurrencyList] = useState<CurrencyDataWithValue[]>(list.map(item => ({ ...item, value: 0 })))

  const convert = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const newList = list.map(item => ({
      ...item,
      value: price
    }))
    setCurrencyList(newList)
  }

  useEffect(() => {
    setCurrencyList(list.map(item => ({ ...item, value: price })))
  }, [list])

  return (
    <>
      <form>
        <div>
          請輸入您要換的台幣
        </div>
        <input 
          type="number" 
          placeholder="台幣"
          required
          onChange={(e) => setPrice(Number((e.target as HTMLInputElement).value))}
          value={price}
        />
        <button
          type="submit"
          onClick={(e) => convert(e)}
        >
          計算
        </button>
      </form>

      <hr />

      <p>可以換算</p>
      <ul>
        {(
          currencyList.map(item => {
            return (
              <li key={item.key}>
                {item.name}：{(Number(item.value) * Number(item.rateFromTWD)).toFixed(2).toString() || ''}
                <input type="button" value="兌換" onClick={() => exchangeFunc(item)}/>
              </li>
            )
          })
        )}
      </ul>
    </>
  )
}