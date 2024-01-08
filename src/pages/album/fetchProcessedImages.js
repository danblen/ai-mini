export async function fetchProcessedImages(userInfo) {
  try {
    // console.log("userInfo:", userInfo); // 打印用户信息
    if (userInfo) {
      let downLoadUserImages = await QueryUserDataAPI(userInfo);
      // console.log("downLoadUserImages:", downLoadUserImages); // 打印获取到的图片数据1

      if (downLoadUserImages) {
        let processedImages = [];
        for (let i = 0; i < downLoadUserImages.length; i++) {
          let entry = downLoadUserImages[i];
          let pathParts = entry["output_image_path"].split(
            "/home/ubuntu/code/ai-flask/sd_make_images/"
          );
          let fileName = pathParts[pathParts.length - 1];
          let imageInfo = {
            url: "https://facei.top/user-pic/" + fileName,
            request_id: entry["request_id"],
          };
          processedImages.push(imageInfo);
          // console.log(
          //   "output_image_path:",
          //   "https://facei.top/user-pic/" + fileName
          // );
        }
        return processedImages;
      } else {
        console.log("downLoadUserImages is null");
        return [];
      }
    } else {
      console.error("Error input ", userInfo);
      return [];
    }
  } catch (error) {
    console.error("Error fetching processed images:", error);
    return [];
  }
}
