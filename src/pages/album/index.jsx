import { View } from "@tarojs/components";
import Taro, { useTabItemTap } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtTabs, AtTabsPane } from "taro-ui";
import { QueryUserDataAPI } from "../../api/index.js";
import FinishedTask from "./FinishedTask.jsx";
import LoginModal from "../user/LoginModal";
import { fetchProcessedImages } from "../../utils/imageTools.js";
import { clearUserInfo, setUserInfo, wechatLogin } from "../../common/user";

export default ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [allImages, setAllImages] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [userInfo, setUserInfo] = useState({
    data: {
      points: 0,
      user_id: "",
      is_check: false,
      avatarUrl: "https://danblen.github.io/static/index.jpg",
    },
  });

  let interval;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storageUserInfo = Taro.getStorageSync("userInfo");
        if (storageUserInfo.data.user_id) {
          const userInfo = {
            user_id: storageUserInfo.data.user_id,
            request_status: "finishing",
          };

          const processedImages = await fetchProcessedImages(userInfo);
          if (processedImages.length > 0) {
            setAllImages(processedImages);
          }
        } else {
          // console.log("storageUserInfo:", storageUserInfo);
          setIsOpened(true);
        }
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };

    // 获取初始数据
    fetchData();

    // 设置定时器，每隔一段时间更新数据
    interval = setInterval(fetchData, 3000); // 60秒刷新一次
    return () => clearInterval(interval); // 清除定时器
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
