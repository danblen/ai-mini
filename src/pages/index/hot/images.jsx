import React, { useState, useEffect, useCallback } from 'react'
import { VirtualList } from '@nutui/nutui-react-taro';
import { data } from "./const";
import { View, Text, Image } from "@tarojs/components";

const App =() => {
  const [list, setsourceData] = useState([1,2]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemStyel2 = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    background: "#fff",
    borderRadius: "10px"
  };
  const getData = useCallback(() => {
    const datas = [];
    const pageSize = 90;

    for (let i = 0; i < 10; i++) {
      datas.push(data[i]);
    }
    setsourceData(list => {
      return [...list, ...datas];
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const itemVariable = (data, dataIndex) => ( 
    <View
      style={{
        height: `${dataIndex % 2 === 0 ? "200px" : "200px"}`,
        ...itemStyel2
      }}
    >
      <View style={{ flex: 1 }}>
        <Image  style={{width:'100%',height:'100%'}} src={data} alt="" />
      </View>
      <View style={{ flex: 1 }}>
        <Image  style={{width:'100%',height:'100%'}} src={data} alt="" />
      </View>
    </View>
  );

  const onScroll = () => {
    if (pageNo > 50 || isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setPageNo(pageNo + 1);
      setIsLoading(false);
    }, 30);
  };
  return (
    <View style={{ height: '100%' }}> 
      <VirtualList
        itemHeight={80}
        list={list}
        itemRender={itemVariable}
        onScroll={onScroll}
        itemEqual={false}
        // containerHeight={500}
      />
    </View>
  )
}
export default App;