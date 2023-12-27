import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import { AtButton } from "taro-ui";
import { faceSwap, getSwapQueueResult } from "../../api/index.js";
import { downloadImages, wxPathToBase64 } from "../../utils/imageTools.js";
import { data } from "../faceswap/const.js";
import Taro from "@tarojs/taro";
let timers = {};
const getTaskImage = async (requestId) => {
  return new Promise((resolve, reject) => {
    timers[requestId] = setInterval(async () => {
      const requestData = {
        user_id: "",
        request_id: requestId,
        sql_query: {
          request_status: "",
          user_id: "",
        },
      };

      try {
        // 调用getSwapQueueResult函数获取结果
        let res = await getSwapQueueResult(requestData);

        if (res.status === "finishing") {
          // 更新图像数组中对应请求的图像状态和数据
          resolve(res);
          clearInterval(timers[requestId]);
        }
      } catch (error) {
        reject(error);
        clearInterval(timers[requestId]);
      }
    }, 3000);
  });
};
export default ({ albumUrls, selfUrl }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    const down = async (urls) => {
      if (urls?.length) {
        let res = await Promise.all(
          urls.map(async (image) => {
            return await downloadImages(image);
          })
        );
        setImageUrls(res);
      }
    };
    down(albumUrls);
    let ignore = false;
    return () => {
      ignore = true;
    };
  }, [albumUrls]);

  const swapOne = async (originUrl) => {
    const originBase64 = await wxPathToBase64(originUrl);
    const selfBase64 = await wxPathToBase64(selfUrl);
    const storageUserInfo = Taro.getStorageSync("userInfo");
    if (storageUserInfo?.data?.user_id) {
      data.user_id = storageUserInfo?.data?.user_id;
    }
    data.init_images = [originBase64];
    data.alwayson_scripts.roop.args[0] = selfBase64;
    let res = await faceSwap(data).catch((err) => {
      console.log(err);
    });
    if (res) {
      if (res?.status === "pending") {
        const res1 = await getTaskImage(res.request_id);
        setImages((prevImages) =>
          prevImages.map((image) =>
            image.requestId === requestId
              ? {
                  ...image,
                  src: "data:image/png;base64," + res1.result.images[0],
                  status: "SUCCESS",
                }
              : image
          )
        );
      }
    } else {
      Taro.showToast({
        title: res?.error_message,
        icon: "none",
      });
    }
  };
  return (
    <AtButton
      type="primary"
      style={{
        background: "linear-gradient(to right, #00467f, #a5cc82)",
        animation: "swap 1s infinite",
        opacity: 0.8,
        fontWeight: "bold",
      }}
      shape="circle"
      loading={loading}
      onClick={async () => {
        if (selfUrl && albumUrls?.length) {
          setLoading(true);
          imageUrls.forEach((albumUrl) => swapOne(albumUrl));
        }
      }}
    >
      一键换脸
    </AtButton>
  );
};
