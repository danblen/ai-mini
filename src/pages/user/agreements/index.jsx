import React from "react";
import { View } from "@tarojs/components";

export default () => {
  return (
    <View>
      <View style={styles.paragraph}>
        感谢您使用AI写真。本协议为您与本小程序管理者之间所订立的契约，具有合同的法律效力，请您仔细阅读。
      </View>

      <View style={styles.heading}>一、免责声明</View>
      <View style={styles.paragraph}>
        1.1
        使用本服务时请确保您所输入的内容未侵害他人权益，未涉及不良信息及情色内容，同时未输入与政治相关的内容，且所有输入内容均合法合规。
      </View>
      <View style={styles.paragraph}>
        1.2
        若平台发现您故意输入1.1中所含的内容，引导AI生成不良内容并进行传播造谣，对公司造成影响，我们有权对您的账号进行永久封禁并追究相关法律责任。
      </View>
      <View style={styles.paragraph}>
        1.3
        您确认并知悉当前体验服务生成的所有内容均由人工智能模型生成，写真Al对其生成内容的准确性、完整性和功能性不做任何保证，并且其生成的内容均不代表我们的态度或观点。AI模型发出的信息是由计算机生成，可能是虚构的，也请您自行辨别是非。我们不承担由使用本应用而产生的任何责任。
      </View>
      <View style={styles.paragraph}>
        1.4
        我们的服务来自于法律法规允许的范围，包括但不限于公开互联网等信息积累，并已经过不断的自动及人工敏感数据过滤，但仍不排除其中部分信息具有瑕疵、不合理或引发不快的问题存在。如遇相关情形，欢迎您随时通过本平台的邮箱）
        向我们进行反馈，我们将对您的意见进行高度重视并采取及时有效的处理措施，同时对您表示十分感谢。
      </View>
      <View style={styles.paragraph}>
        1.6无论您是否已实际阅读本声明，当您通过网络页面点击确认同意本声明或实际使用本平台（“我方”）提供的本服务时，均表示您与我方已就本声明达成一致并同意接受本声明的全部约定内容。如果您不同意本声明的任意内容，或者无法准确理解我方对本声明条款的解释，请点击不同意或停止使用本服务。否则即表示您已接受本申明所述的所有条款及其适用条件，同意受本声明约束。
      </View>
      <View style={styles.paragraph}>
        1.7我们尊重并保护您及所有使用本服务用户的个人隐私，在此提醒您：请您确认使用本服务时输入的内容将不包含您本人及他人的个人信息。
      </View>

      <View style={styles.heading}>二、本协议内容、生效、变更</View>
      <View style={styles.paragraph}>
        本协议内容包括协议正文及所有本小程序已经发布的或将要发布的各类规则。本协议自您同意使用本服务之日起生效，对于您之前的使用行为不产生法律效力。
      </View>
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
