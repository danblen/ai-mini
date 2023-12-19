import { View } from "@tarojs/components";
import Taro, { useTabItemTap } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtTabs, AtTabsPane } from "taro-ui";
import { QueryUserDataAPI } from "../../api/index.js";
import FinishedTask from "./FinishedTask.jsx";

export default ({ images }) => {
  const [current, setCurrent] = useState(0);
  let [allImages, setAllImages] = useState({ albums: {}, tags_image: {} });
  useEffect(async () => {
    const userInfo = Taro.getStorageSync("userInfo");
    if (userInfo) {
      let allImages = await QueryUserDataAPI({
        user_id: userInfo.data.user_id,
      });
      if (allImages) {
        setAllImages(allImages);
      }
    } else {
    }
  });
  const fetchUserImage = async () => {
    // let userInfo = Taro.getStorageSync("userInfo");
    // console.log(userInfo);
    // if (!userInfo) {
    //   let res = await QueryUserDataAPI({
    //     user_id: userInfo.data.user_id,
    //   });
    //   if (res) {
    //     setAllImages(res);
    //   }
    // } else {
    //   setAllImages(userInfo);
    // }
  };

  useTabItemTap(() => {
    fetchUserImage();
  });
  return (
    <View>
      <AtTabs
        current={current}
        tabList={[{ title: "进行中" }, { title: "已完成" }]}
        swipeable={true}
        onClick={(value) => {
          setCurrent(value);
        }}
      >
        <AtTabsPane current={current} index={0}>
          <View style="">
            <FinishedTask images={images} />
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View style="">
            <FinishedTask />
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  );
};
