import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useState } from "react";
import { AtDrawer } from "taro-ui";
import TaskList from "../comps/TaskList";
import ActionButton from "./ActionButton";
import ImagePicker from "./ImagePicker";
const faceswapPage = "/pages/faceswap/index";

export default () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const eventChannel = Taro.getCurrentInstance().page.getOpenerEventChannel();
  eventChannel.on("acceptDataFromOpenerPage", (data) => {
    const albumData = data.albumData;
    setAlbumData(albumData);
  });
  // useEffect(() => {
  //   const params = Taro.getCurrentInstance().router.params;
  //   console.log(params);
  //   let ignore = false;
  //   if (params && params.albumData) {
  //     setAlbumData(albumData);
  //     down();
  //   }
  // });

  const [showDrawer, setShowDrawer] = useState(false);
  const [startX, setStartX] = useState(0);
  const [images, setImages] = useState([]);
  const onTouchStart = (event) => {
    setStartX(event.touches[0].clientX);
  };
  const onTouchEnd = (event) => {
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (deltaX < -50) {
      setShowDrawer(true);
    } else if (deltaX > 50) {
      setShowDrawer(false);
    }
  };
  return (
    <View onTouchstart={onTouchStart} onTouchEnd={onTouchEnd} className="">
      <View className="">
        <Image
          style={Styles.indexImage}
          className=" "
          mode="scaleToFill"
          onClick={() => {
            Taro.navigateTo({
              url: faceswapPage,
            });
          }}
          src={albumData.index}
        ></Image>
        {albumData.urls?.map((url) => (
          <View className="" style={Styles.imageWrap}>
            <Image
              style={Styles.image}
              className=" "
              mode="scaleToFill"
              onClick={() => {
                Taro.navigateTo({
                  url: faceswapPage,
                });
              }}
              src={url}
            ></Image>
          </View>
        ))}
      </View>

      <View
        style={{
          position: "fixed",
          width: "100%",
          bottom: "60rpx",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "95%",
            marginBottom: "40rpx",
            borderRadius: "20rpx",
            background: "grey",
            opacity: 0.5,
            color: "white",
          }}
        >
          <ImagePicker
            onFilesChange={(images) => setUploadedFiles(images)}
            onSelectImage={(index) => {
              setSelectedIndex(index);
            }}
          ></ImagePicker>
        </View>
        <View
          style={{
            width: "95%",
          }}
        >
          <ActionButton
            albumUrls={albumData.urls}
            selfUrl={uploadedFiles[selectedIndex]?.url}
          />
        </View>
      </View>

      <AtDrawer
        show={showDrawer}
        right
        mask
        width="80%"
        onClose={() => setShowDrawer(false)}
        style={{ background: "black", height: "100%" }}
      >
        <TaskList images={images} />
      </AtDrawer>
    </View>
  );
};
const Styles = {
  indexImage: {},
  image: {
    width: "360rpx",
    borderRadius: "10rpx",
  },
  imageWrap: {
    paddingLeft: "10rpx",
    display: "inline-block",
  },
};
