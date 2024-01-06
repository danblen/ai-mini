import { View, Text } from "@tarojs/components";
import React, { useState, useEffect, useRef } from "react";
import TabsImageList from "./TabsImageList";
import AlbumsCard from "./AlbumsCard";
import { useData } from "../hooks/useData.js";
import { getPhotoPath, URL_BACK, get_all_images } from "../../api/index.js";
import TopBanner from "./TopBanner.jsx";
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
      <View
        style={{
          background:
            "linear-gradient(to left, #fdfdfd, #61866f)" /* 设置为橙色渐变 */,
        }}
      >
        <TopBanner banners={allImages?.banners} />
        <AlbumsCard albums={allImages?.albums} />
        <TabsImageList tags_image={allImages?.tags_image} />
      </View>
      {/* <Images /> */}
      {/* <Home /> */}
    </>
  );
};
export default App;
