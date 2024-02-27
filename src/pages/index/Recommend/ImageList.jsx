import { Image, View } from '@tarojs/components';

export default ({ imageUrls }) => {
  // const getRandomImage = () => {
  //   if (!imageUrls || imageUrls.length === 0) {
  //     return ''; // 如果图片列表为空，返回空字符串或其他默认值
  //   }
  //   const randomUserValue = Math.floor(Math.random() * 14) + 1;
  //   // 获取本地路径下的所有图片列表
  //   const imageList = imageUrls; // 请替换成实际获取本地路径下图片的方法

  //   // 随机选择第n个图片
  //   const randomImage = imageList[randomUserValue - 1];
  //   return randomImage;
  // };
  return (
    <View style={{
      display: 'flex',
      justifyContent:'center'
    }}>

      <View className="" style={Styles.imageList}>
        {imageUrls?.map?.((src, index) => {
          // Extracting file name from the URL
          // const fileNameWithoutExtension = src.substring(
          //   src.lastIndexOf('/') + 1,
          //   src.lastIndexOf('.')
          // );
          // Generating a random number between 1 and 10000 for heat value
          // const randomHeatValue = Math.floor(Math.random() * 500) + 1;

          return (
              <Image
                key={index}
                style={Styles.image}
                mode="aspectFill"
                lazyLoad={true}
                className=" "
                onClick={() => {
                  navigateTo({
                    url: '/pages/faceswap/index?imageUrl=' + src,
                  });
                }}
                src={src}
              ></Image>

          );
        })}
      </View>
      </View>
  );
};
const Styles = {
  image: {
    width:'49%',
    borderRadius: 5,
    marginBottom: 8,
  },
  imageList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width:'96%'
  },
};
