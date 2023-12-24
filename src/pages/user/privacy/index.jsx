import React from "react";
import { View, Text } from "@tarojs/components";

export default () => {
  return (
    <View>
      <View style={styles.paragraph}>
        欢迎使用《AI写真》（以下简称“本应用”）。本应用非常重视您的隐私保护，并承诺为您提供安全、可靠的服务。
        本隐私政策旨在帮助您了解本应用收集、使用、存储和共享您的个人信息的方式，以及您享有的相关权利。
      </View>
      <View style={styles.heading}>一、适用范围</View>
      <View style={styles.paragraph}>
        本隐私政策适用于本应用的所有产品和服务。
      </View>
      <View style={styles.heading}>二、收集的信息</View>
      <View style={styles.paragraph}>1.用户授权信息</View>
      <View style={styles.paragraph}>
        为了提供更好的服务，本应用需要获取您的相册和视频权限。本应用不会收集您的其他个人信息。
      </View>
      {/* <View style={styles.paragraph}>2.第三方SDK信息</View>
      <View style={styles.paragraph}>
        本应用使用阿里云的SDK，为了使用该SDK，本应用需要获取您的设备信息、网络信息等信息。本应用不会将这些信息用于其他目的。
      </View> */}
      <View style={styles.heading}>三、使用的信息</View>
      <View style={styles.paragraph}>1.用户授权信息</View>
      <View style={styles.paragraph}>
        本应用将使用您的相册和视频信息进行AI人脸合成，以提供更好的服务。本应用不会将您的个人信息用于其他目的。
      </View>
      {/* <View style={styles.paragraph}>2.第三方SDK信息</View>
      <View style={styles.paragraph}>
        本应用使用阿里云的SDK，为了使用该SDK，本应用需要获取您的设备信息、网络信息等信息。本应用不会将这些信息用于其他目的。
      </View> */}
      <View style={styles.heading}>四、存储的信息</View>
      <View style={styles.paragraph}>
        本应用将存储您的相册和视频信息，以便您下次使用时更快地访问。本应用将采取必要的安全措施，保护您的个人信息不被泄露、篡改或丢失。
      </View>
      <View style={styles.heading}>五、共享的信息</View>
      <View style={styles.paragraph}>
        本应用不会将您的个人信息共享给任何第三方，除非： 1.获得您的明确同意；
        2.根据法律法规、法院裁定或政府部门要求； 3.为了保护本应用的合法权益。
      </View>
      <View style={styles.heading}>六、信息安全</View>
      <View style={styles.paragraph}>
        本应用将采取必要的安全措施，保护您的个人信息不被泄露、篡改或丢失。本应用将采用加密技术、安全协议等措施，保障您的个人信息安全。
      </View>
      <View style={styles.heading}>七、未成年人信息保护</View>
      <View style={styles.paragraph}>
        本应用非常重视未成年人信息保护。如果您是未成年人，请在法定监护人的指导下使用本应用。
      </View>
      <View style={styles.heading}> 八、隐私政策的修改</View>
      <View style={styles.paragraph}>
        本应用可能会不时更新本隐私政策。如果本隐私政策发生重大变更，本应用将在网站上发布通知。
      </View>
      <View style={styles.heading}> 九、联系我们</View>
      <View style={styles.paragraph}>
        如果您对本隐私政策有任何疑问或意见，请通过以下方式联系我们：
      </View>
      <View style={styles.heading}> 十、生效日期</View>
      <View style={styles.paragraph}>本隐私政策自2023年12月1日起生效。</View>
    </View>
  );
};

const styles = {
  paragraph: {
    fontSize: 14,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
  },
};
