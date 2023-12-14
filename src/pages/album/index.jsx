import { View, Image } from "@tarojs/components";
import { useState, useRef } from "react";
import { AtTabs, AtTabsPane } from "taro-ui";
import FinishedTask from "./FinishedTask.jsx";
import { get_album_images } from "../../api/index.js";
import PendingTask from "./PendingTask.jsx";

export default ({ images }) => {
  const [current, setCurrent] = useState(0);
  let [allImages, setAllImages] = useState({ albums: {}, tags_image: {} });
  const getAllImages = async () => {
    let allImages = await get_album_images();
    if (allImages) {
      setAllImages(allImages);
    }
  };
  const onClick = (value) => {
    setCurrent(value);
  };
  return (
    <View>
      <AtTabs
        current={current}
        tabList={[{ title: "进行中" }, { title: "已完成" }]}
        swipeable={true}
        onClick={onClick}
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
