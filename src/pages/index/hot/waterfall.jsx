import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { useState, useEffect, useRef } from "react";
import { List } from "@taroify/core";
// import { useCascader } from "@taroify/hooks";
import { PullRefresh } from "@taroify/core";
export default function PullRefreshList() {
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const refreshingRef = useRef(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [reachTop, setReachTop] = useState(true);

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop);
    setReachTop(aScrollTop === 0);
  });

  const onLoad = () => {
    setLoading(true);
    const newList = refreshingRef.current ? [] : list;
    setTimeout(() => {
      refreshingRef.current = false;
      for (let i = 0; i < 10; i++) {
        const text = newList.length + 1;
        newList.push(text < 10 ? "0" + text : String(text));
      }
      setList(newList);
      setLoading(false);
      setHasMore(newList.length < 40);
    }, 1000);
  };

  function onRefresh() {
    refreshingRef.current = true;
    setLoading(false);
    onLoad();
  }

  return (
    <PullRefresh
      loading={refreshingRef.current}
      reachTop={reachTop}
      onRefresh={onRefresh}
    >
      <List
        loading={loading}
        hasMore={hasMore}
        scrollTop={scrollTop}
        onLoad={onLoad}
      >
        {list.map(item => (
          <Cell key={item}>{item}</Cell>
        ))}
        {!refreshingRef.current && (
          <List.Placeholder>
            {loading && <Loading>加载中...</Loading>}
            {!hasMore && "没有更多了"}
          </List.Placeholder>
        )}
      </List>
    </PullRefresh>
  );
}
