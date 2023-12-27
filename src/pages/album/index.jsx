import { View } from "@tarojs/components";
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
  const [isOpened, setIsOpened] = useState(false);
  const [interval, setIntervalVlu] = useState(false);
  const [userInfo, setUserInfo] = useState({
    data: {
      points: 0,
      user_id: "",
      is_check: false,
      avatarUrl: "https://danblen.github.io/static/index.jpg",
    },
  });

  const fetchData = async () => {
    const storageUserInfo = Taro.getStorageSync("userInfo");
    if (storageUserInfo?.data?.user_id) {
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
      setIsOpened(true);
    }
  };

  useDidShow(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000);
    setIntervalVlu(interval);
  });

  // useDidHide 钩子，在页面隐藏时执行
  useDidHide(() => {
    clearInterval(interval);
  });
  return (
    <View>
      <AtTabs
        current={current}
        tabList={[{ title: "已完成" }, { title: "进行中" }]}
        swipeable={true}
        onClick={(value) => {
          setCurrent(value);
        }}
      >
        <AtTabsPane current={current} index={0}>
          <View
            style={{
              marginTop: "10rpx",
            }}
          >
            <FinishedTask images={allImages} />
          </View>
        </AtTabsPane>
        {/* <AtTabsPane current={current} index={1}>
          <View style="">
            <FinishedTask images={allImages} />
          </View>
        </AtTabsPane> */}
      </AtTabs>
      <LoginModal
        isOpened={isOpened}
        onConfirmLogin={async () => {
          const res = await wechatLogin();
          console.log("wechatLogin res:", res);
          if (res) {
            setUserInfo({
              isLogin: true,
              data: res.data,
            });
            Taro.setStorageSync("userInfo", {
              isLogin: true,
              data: res.data,
            });
            setIsOpened(false);
            if (res.data.user_id) {
              const userInfo = {
                user_id: res.data.user_id,
                request_status: "finishing",
              };
              console.log("userInfo:", userInfo); // 打印用户信息

              const processedImages = await fetchProcessedImages(userInfo);
              if (processedImages.length > 0) {
                setAllImages(processedImages);
              }
            }
          }
        }}
        onClose={() => {
          setIsOpened(false);
        }}
      />
    </View>
  );
};
