import { api } from '../../api/index.js';
export async function fetchProcessedImages(userInfo) {
  try {
    if (userInfo) {
      let downLoadUserImages = await api.getUserProcessImage(userInfo);
      if (downLoadUserImages.data) {
        let processedImages = [];
        for (let i = 0; i < downLoadUserImages.data.length; i++) {
          let entry = downLoadUserImages.data[i];
          if (
            entry['outputImagePath'] &&
            entry['outputImagePath'].includes('/home/ubuntu/code/server/')
          ) {
            // 进行处理
            let pathParts = entry['outputImagePath'].split(
              '/home/ubuntu/code/server/'
            );

            let fileName = pathParts[pathParts.length - 1];
            let imageInfo = {
              url: 'https://facei.top/' + fileName,
              requestId: entry['requestId'],
            };
            processedImages.push(imageInfo);
          }
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
