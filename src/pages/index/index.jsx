import { View, Text } from "@tarojs/components";
import React, { useState, useEffect, useRef } from "react";
import TabsImageList from "./TabsImageList";
import AlbumsCard from "./AlbumsCard";
import { useData } from "../../hooks/useData.js";
import { getPhotoPath, URL_BACK, get_all_images } from "../../api/index.js";
import TopBanner from "./TopBanner.jsx";
import Buttons from "./Buttons.jsx";
import CustomNavBar from "./CustomNavBar.jsx";

const App = () => {
  let [allImages, setAllImages] = useState({ albums: {}, tags_image: {} });
  const getAllImages = async () => {
    let allImages = await get_all_images();
    if (allImages) {
      setAllImages(allImages);
    }
  };
  // const allImages = useData(() => get_all_images(), {
  //   albums: {},
  //   tags_image: {},
  // });
  useEffect(() => {
    getAllImages();
  }, []);
  return (
    <>
      {/* <NavBar>
        <span onClick={e => Taro.showtoast({ title: "标题" })}>ai写真</span>
      </NavBar> */}
      {/* <Tabs1/> */}
      <CustomNavBar></CustomNavBar>
      <View
        style={{
          background: "linear-gradient(to left, #2d7948, #6d8a78)" /* 渐变 */,
        }}
      >
        <TopBanner banners={allImages?.banners} />
        <Buttons />
        <AlbumsCard albums={allImages?.albums} />
        <TabsImageList tags_image={allImages?.tags_image} />
      </View>
      {/* <Images /> */}
      {/* <Home /> */}
    </>
  );
};
export default App;
