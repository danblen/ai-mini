import { View } from "@tarojs/components";
import { AtIcon } from "taro-ui";

export default ({ onClick }) => {
  return (
    <View
      style="
        position: fixed;
        right: 0;
        top: 100rpx;
        opacity: 0.3;
        padding-left: 8rpx;
        font-size: 26rpx;
        color: white;
        background: black;
        border-radius: 10rpx 0 0 10rpx;
      "
      onClick={onClick}
    >
      左滑查看作品
      <AtIcon value="chevron-right" size="20"></AtIcon>
    </View>
  );
};
