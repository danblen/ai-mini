import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import IconGood from "../../static/image/my/icons-good.png";
import IconGood1 from "../../static/image/my/icons-good1.png";

const Buttons = ({}) => {
  const buttons = [
    {
      imageUrl: require("../../static/image/my/icons8-joker-dc-200.png"),
      text: "反派挑战",
    },
    {
      imageUrl: require("../../static/image/my/icons8-神奇女侠-100.png"),
      text: "名模挑战",
    },
    {
      imageUrl: require("../../static/image/my/icons8-编辑图像-100.png"),
      text: "AI修图",
    },
    {
      imageUrl: require("../../static/image/my/icons8-获得现金-100.png"),
      text: "晒一晒加积分",
    },
    // Add more buttons as needed
  ];

  return (
    <View
      style={{
        padding: "10px",
        marginTop: "20px",
        marginBottom: "20px",
        marginLeft: "20rpx",
        marginRight: "20rpx",
        borderRadius: "10rpx",
        background: "linear-gradient(to right, #02ad6e7a, #02ad6e7a)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <View style={{ display: "flex", justifyContent: "space-between" }}>
        {buttons.map((button, index) => (
          <View key={index} className="button-wrapper">
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Image
                src={button.imageUrl}
                style={{ width: "50px", height: "50px" }}
                className="button-image"
              />
              <Text
                style={{
                  textAlign: "center",
                  marginTop: "5px",
                  flex: 1,
                  color: "#cdcecd",
                }}
              >
                {button.text}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Buttons;
