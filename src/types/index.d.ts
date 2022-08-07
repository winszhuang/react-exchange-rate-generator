interface CurrencyData {
  key: string,
  name: string,
  rateFromTWD: string
}

interface CurrencyDataWithValue extends CurrencyData {
  value: string | number
}

interface ExchangeRecord {
  twdValue: string,
  name: string,
  rateFromTWD: string
}

type AddCurrencyFunc = (currencyName: string, currencyRate: string) => void
type ExchangeCurrencyFunc = (currencyItem: CurrencyDataWithValue) => void
