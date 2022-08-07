interface Props {
  list: ExchangeRecord[]
}

export const ExchangeRecordList = ({ list }: Props) => {
  return (
    <>
      <h3 className='my-4 text-2xl'>您的兌換記錄</h3>
      <ul>
        {(
          list.map(item => {
            return (
              <li key={item.rateFromTWD + item.twdValue}>
                {`使用${item.twdValue} 台幣，兌換 ${Number(item.twdValue) * Number(item.rateFromTWD)} 的 ${item.name}`}
              </li>
            )
          })
        )}
      </ul>
    </>
  )
}