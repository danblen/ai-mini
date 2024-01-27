import { ConfigProvider, Grid } from "@nutui/nutui-react-taro";
import React, { useRef, useState } from "react";
import { data } from "./const";
const darkTheme = {
  nutuiGridItemContentPadding: "0px"
};
const App = () => {
  return (
    <>
      <ConfigProvider theme={darkTheme}>
        <Grid columns={2}>
          {data.map((imageUrl, index) => (
            <Grid.Item key={index}>
              <img width="100%" src={imageUrl} alt="" />
            </Grid.Item>
          ))}
        </Grid>
      </ConfigProvider>
    </>
  );
};
export default App;
