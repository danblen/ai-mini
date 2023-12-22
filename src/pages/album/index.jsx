import { View } from "@tarojs/components";
import Taro, { useTabItemTap } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtTabs, AtTabsPane } from "taro-ui";
import { QueryUserDataAPI } from "../../api/index.js";
import FinishedTask from "./FinishedTask.jsx";
import { fetchProcessedImages } from "../../utils/imageTools.js";
export default ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [allImages, setAllImages] = useState([]);

  useEffect(async () => {
    try {
      // const userInfo = Taro.getStorageSync("userInfo");
      const userInfo = {
        user_id: "123456",
        request_status: "finishing",
      };
      console.log("userInfo:", userInfo); // 打印用户信息

      const processedImages = await fetchProcessedImages(userInfo);
      if (processedImages.length > 0) {
        setAllImages(processedImages);
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, []);
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
      <AtTabsPane current={current} index={0}>
        <View style="">
          <FinishedTask images={allImages} />
        </View>
      </AtTabsPane>
      {/* <AtTabs
        current={current}
        tabList={[{ title: "进行中" }, { title: "已完成" }]}
        swipeable={true}
        onClick={(value) => {
          setCurrent(value);
        }}
      >
        <AtTabsPane current={current} index={0}>
          <View style="">
            <FinishedTask images={allImages} />
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View style="">
            <FinishedTask images={allImages} />
          </View>
        </AtTabsPane>
      </AtTabs> */}
    </View>
  );
};
