import { Button, View } from "@tarojs/components";
import Taro, { useTabItemTap, useDidShow, useDidHide } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtTabs, AtTabsPane } from "taro-ui";
import { wechatLogin } from "../../common/user";
import { fetchProcessedImages } from "../../utils/imageTools.js";
import LoginModal from "../user/LoginModal";
import FinishedTask from "./FinishedTask.jsx";

export default ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [allImages, setAllImages] = useState([]);
  const [interval, setIntervalVlu] = useState(false);
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    data: {
      points: 0,
      user_id: "",
      is_check: false,
    },
  });

  const fetchData = async () => {
    const storageUserInfo = Taro.getStorageSync("userInfo");
    setUserInfo(storageUserInfo);
    if (storageUserInfo?.isLogin) {
      const userInfo = {
        user_id: storageUserInfo.data.user_id,
        request_status: "finishing",
      };

      const processedImages = await fetchProcessedImages(userInfo).catch();
      if (processedImages?.length > 0) {
        setAllImages(processedImages);
      }
    } else {
      setAllImages([]);
    }
  };

  useDidShow(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    setIntervalVlu(interval);
  });

  // useDidHide 钩子，在页面隐藏时执行
  useDidHide(() => {
    clearInterval(interval);
  });
  return (
    <View>
      {userInfo.isLogin ? (
        <View
          style={{
            marginTop: "10rpx",
          }}
        >
          <FinishedTask images={allImages} />
        </View>
      ) : (
        <View
          style={{
            paddingTop: "20rpx",
          }}
        >
          <View
            style={{
              textAlign: "center",
              fontSize: "40rpx",
            }}
          >
            您还未登陆，请先登陆
          </View>
          <Button
            type="primary"
            style={{
              position: "relative",
              width: "40%",
              animation: "swap 1s infinite",
            }}
            onClick={() => {
              Taro.switchTab({
                url: "/pages/user/index",
              });
            }}
          >
            去登陆
          </Button>
        </View>
      )}
    </View>
  );
};
