// import { useTextSelection } from "@reactuses/core";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import React, { useState, useEffect, useCallback } from "react";
import { AtList, AtListItem } from "taro-ui";
import { data } from "./const";
export default () => {
  const handleClick = () => {};
  return (
    <AtList>
      {data.map(src => (
        <AtListItem height="1000px">
          <Image className="w100 h100" src={src}></Image>
        </AtListItem>
      ))}
    </AtList>
  );
};
