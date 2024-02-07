import { api } from '../../api/index.js';
export async function fetchProcessedImages(userInfo) {
  try {
    if (userInfo) {
      let downLoadUserImages = await api.getUserProcessImage(userInfo);
      if (downLoadUserImages.data) {
        let processedImages = [];
        for (let i = 0; i < downLoadUserImages.data.length; i++) {
          let entry = downLoadUserImages.data[i];
          let pathParts = entry['outputImagePath'].split(
            '/home/ubuntu/code/server/sd_make_images/'
          );
          let fileName = pathParts[pathParts.length - 1];
          let imageInfo = {
            url: 'https://facei.top/user-pic/' + fileName,
            request_id: entry['request_id'],
          };
          processedImages.push(imageInfo);
        }
        return processedImages;
      } else {
        console.log('downLoadUserImages is null');
        return [];
      }
    } else {
      console.error('Error input ', userInfo);
      return [];
    }
  } catch (error) {
    console.error('Error fetching processed images:', error);
    return [];
  }
}
