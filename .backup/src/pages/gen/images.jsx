import React, { useState, useEffect, useCallback } from 'react'
import { VirtualList } from '@nutui/nutui-react-taro';

const App =() => {
  const [list, setsourceData] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50px',
    background: '#fff',
    borderRadius: '10px',
  }

  const getData = useCallback(() => {
    const datas = []
    const pageSize = 90
    for (let i = 10; i < pageSize; i++) {
        datas.push(`${i} Item`)
    }
    setsourceData((list) => {
        return [...list, ...datas]
    })
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  const itemRender = (data , dataIndex ) => {
    return <div style={itemStyle}>{data}</div>
  }

  const onScroll = () => {
    if (pageNo > 50 || isLoading) return
    setIsLoading(true)
    setTimeout(() => {
      setPageNo(pageNo + 1)
      setIsLoading(false)
    }, 30)
  }
  return (
    <div style={{ height: '100%' }}>
      <VirtualList
        itemHeight={50}
        list={list}
        itemRender={itemRender}
        onScroll={onScroll}
      />
    </div>
  )
}
export default App;