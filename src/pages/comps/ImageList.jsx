import { Image, View } from '@tarojs/components';

export default ({ imageUrls, onClick }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <View className="" style={Styles.imageList}>
        {imageUrls?.map?.((src, index) => {
          return (
            <Image
              key={index}
              style={Styles.image}
              mode="aspectFill"
              lazyLoad={true}
              className=" "
              onClick={onClick}
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
    width: '49%',
    borderRadius: 5,
    marginBottom: 8,
  },
  imageList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '96%',
  },
};
