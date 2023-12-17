import { View } from "@tarojs/components";
import { useState } from "react";
import { AtButton } from "taro-ui";
import { faceSwap } from "../../api/index.js";
import { wxPathToBase64 } from "../../utils/image-tools.js";
export default () => {
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
          setLoading(true);
          const srcBase64 = await wxPathToBase64(imageUrl);
          const tarBase64 = await wxPathToBase64(
            uploadedFiles[selectedIndex].url
          );
          data.init_images = [srcBase64];
          data.alwayson_scripts.roop.args[0] = tarBase64;
          let res = await faceSwap(data);
          setLoading(false);
          if (res.status === "pending") {
            getTaskImages(res.request_id);
          } else {
            Taro.showToast({
              title: res.error_message,
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
