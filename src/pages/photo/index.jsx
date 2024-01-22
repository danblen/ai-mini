import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { AtDrawer } from "taro-ui";
import TaskList from "../comps/TaskList";
import ActionButton from "./ActionButton";
import { clearTimers, getTaskImage } from "../../common/getTaskImage";
import ImagePicker from "../comps/ImagePicker";
import CustomNavBar from "../index/CustomNavBar.jsx";

export default () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    const eventChannel = Taro.getCurrentInstance().page.getOpenerEventChannel();
    eventChannel.on("acceptDataFromOpenerPage", (data) => {
      const albumData = data.albumData;
      setAlbumData(albumData);
    });
    return () => {
      clearTimers();
    };
  }, []);
  const [showDrawer, setShowDrawer] = useState(false);
  const [startX, setStartX] = useState(0);
  const [images, setImages] = useState([]);

  const onUpdateTaskImages = async (requestId) => {
    const newImage = {
      src: "",
      status: "pending",
      requestId,
    };
    setImages((prevImages) => [...prevImages, newImage]);

    const res = await getTaskImage(requestId);
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.requestId === requestId
          ? {
              ...image,
              src: "data:image/png;base64," + res.result.images[0],
              status: "SUCCESS",
            }
          : image
      )
    );
  };

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
    <>
      <CustomNavBar></CustomNavBar>
      <View
        onTouchstart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className=""
        style={{
          marginBottom: "200rpx",
        }}
      >
        <View className="">
          <View
            style={{
              height: "50vh",
              overflow: "hidden",
              position: "relative",
              marginBottom: "20rpx",
            }}
          >
            <Image
              style={{
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              mode="widthFix"
              src={albumData.index}
            />
          </View>
          {albumData.urls?.map((url) => (
            <View className="" style={Styles.imageWrap}>
              <Image
                style={Styles.image}
                className=" "
                mode="scaleToFill"
                // onClick={() => {
                //   Taro.navigateTo({
                //     url: faceswapPage,
                //   });
                // }}
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
              opacity: 0.8,
              color: "white",
            }}
          >
            <ImagePicker
              onFilesChange={(images) => setUploadedFiles(images)}
              onSelectImage={(index) => {
                setSelectedIndex(index);
              }}
            />
          </View>
          <View
            style={{
              width: "95%",
            }}
          >
            <ActionButton
              albumUrls={albumData.urls}
              selfUrl={uploadedFiles[selectedIndex]?.url}
              onUpdateTaskImages={onUpdateTaskImages}
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
        <View style={{ height: "200rpx" }}></View>
      </View>
    </>
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
