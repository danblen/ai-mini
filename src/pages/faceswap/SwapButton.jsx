import Taro from "@tarojs/taro";
import { faceSwap } from "../../api";
import { useState } from "react";
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import { wxPathToBase64 } from "../../utils/imageTools";
import { data } from "../../const/sdApiParams.js";

export default ({
  canSwap,
  imageUrl,
  selectedImageUrl,
  onUpdateTaskImages,
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <View
      style={{
        width: "95%",
      }}
    >
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
          if (canSwap) {
            setLoading(true);
            const srcBase64 = await wxPathToBase64(imageUrl);
            const tarBase64 = await wxPathToBase64(selectedImageUrl);
            const storageUserInfo = Taro.getStorageSync("userInfo");
            data.user_id = storageUserInfo.data.user_id;
            data.init_images = [srcBase64];
            data.alwayson_scripts.roop.args[0] = tarBase64;
            let res = await faceSwap(data)
              .catch(() => {})
              .finally(() => {
                setLoading(false);
              });
            if (res.status === "pending") {
              onUpdateTaskImages(res.request_id);
            } else {
              Taro.showToast({
                title: res.error_message,
                icon: "none",
              });
            }
          } else {
            Taro.showToast({
              title: `请点击+号,选择人脸图像~`,
              icon: "none",
            });
          }
        }}
      >
        一键换脸
      </AtButton>
    </View>
  );
};
