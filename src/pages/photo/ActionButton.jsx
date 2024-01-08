import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import { AtButton } from "taro-ui";
import { faceSwap, getSwapQueueResult } from "../../api/index.js";
import { downloadImages, wxPathToBase64 } from "../../utils/imageTools.js";
import { data } from "../../const/sdApiParams.js";
import Taro from "@tarojs/taro";
import { getTaskImage } from "../../common/getTaskImage.js";
let isSwaped = false;
export default ({ albumUrls, selfUrl, onUpdateTaskImages }) => {
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

  const swapOneFace = async (originUrl) => {
    const originBase64 = await wxPathToBase64(originUrl);
    const selfBase64 = await wxPathToBase64(selfUrl);
    const storageUserInfo = Taro.getStorageSync("userInfo");
    if (storageUserInfo?.data?.user_id) {
      data.user_id = storageUserInfo?.data?.user_id;
    }
    data.init_images = [originBase64];
    data.alwayson_scripts.roop.args[0] = selfBase64;
    let res = await faceSwap(data).catch((err) => {});
    if (res?.status === "pending") {
      onUpdateTaskImages(res.request_id);
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
        if (selfUrl && albumUrls?.length && !isSwaped) {
          isSwaped = true;
          setLoading(true);
          imageUrls.forEach((albumUrl) => swapOneFace(albumUrl));
          setLoading(false);
        }
      }}
    >
      一键换脸
    </AtButton>
  );
};
