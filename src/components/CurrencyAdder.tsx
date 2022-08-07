import { useState } from 'react'

interface Props {
  addCurrencyFunc: AddCurrencyFunc
}

export const CurrencyAdder = ({ addCurrencyFunc }: Props) => {
  const [currencyName, setCurrencyName] = useState('')
  const [currencyRate, setCurrencyRate] = useState('')

  const reset = () => {
    setCurrencyName('')
    setCurrencyRate('')
  }

  const submit = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault()
    addCurrencyFunc(currencyName, currencyRate)
    reset()
  }

  return (
    <>
      <h3 className='text-2xl'>新增幣種</h3>
      <form className='mb-4'>
        <input 
          type="text" 
          placeholder="幣種名稱" 
          required
          onChange={(e) => setCurrencyName((e.target as HTMLInputElement).value)}
          value={currencyName}
        />
        <input 
          type="number" 
          placeholder="匯率" 
          required 
          step=".001"
          onChange={(e) => setCurrencyRate((e.target as HTMLInputElement).value)} 
          value={currencyRate}
        />
        <input type="submit" value="新增幣種" onClick={(e) => submit(e)}/>
      </form>
    </>
  )
}