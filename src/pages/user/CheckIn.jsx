// import React, { useState } from "react";
// import Taro from "@tarojs/taro";
// import { View, RichText, Modal } from "@tarojs/components";
// import { getPointsByCheck } from "../../api";
// import "./style.scss"; // 确保您的样式文件与此路径匹配

// export default ({ isCheck, onCheckUserInfoChange }) => {
//   const [showModal, setShowModal] = useState(false);
//   const content = "成功分享给群好友也可以获得1次自定义机会哦";

//   const onGetPoint = async () => {
//     const userId = Taro.getStorageSync("userInfo").userId;
//     if (!userId) {
//       Taro.showToast({
//         title: "请先登录",
//         icon: "none",
//         duration: 2000,
//       });
//       return;
//     }

//     if (isCheck) {
//       Taro.showToast({
//         title: "今日已签到啦~",
//         icon: "none",
//         duration: 2000,
//       });
//       return;
//     }

//     const res = await getPointsByCheck({ user_id: userId });
//     if (res) {
//       onCheckUserInfoChange({
//         isCheck: true,
//         points: res.user.points,
//       });
//       setShowModal(true);
//     }
//   };

//   return (
//     <View>
//       <CellItem
//         title="点击签到"
//         icon="star"
//         value={isCheck ? "已签到" : ""}
//         onClick={onGetPoint}
//       />
//       <Modal
//         isOpened={showModal}
//         title="恭喜你，获得1次自定义机会"
//         content={content}
//         showCancel={false}
//         onClose={() => setShowModal(false)}
//       >
//         <View className="slot-content">
//           <RichText nodes={content} />
//         </View>
//       </Modal>
//     </View>
//   );
// };
