import { Image, Text, View } from '@tarojs/components';

export default () => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '96%',
          justifyContent: 'space-between',
        }}
      >
        {/* 左边大图 */}
        <View
          style={{
            width: '49%',
            position: 'relative',
          }}
        >
          <Image
            src="https://facei.top/static/allImages/activity_tags/%E6%B8%AF%E9%A3%8E/lszu7ifdfwjkb-1.jpg"
            style={{
              width: '100%',
              height: 200,
              borderRadius: 10,
            }}
          />
          <Text
            style={{
              position: 'absolute',
              bottom: 13,
              right: 0,
            }}
          >
            sadads
          </Text>
        </View>
        {/* 右侧布局 */}
        <View
          style={{
            width: '49%',
            // marginLeft: '5px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* 上半部分两个小图 */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Image
              // mode="widthFix"
              src="https://facei.top/static/allImages/activity_tags/%E6%B8%AF%E9%A3%8E/lszu7ifdfwjkb-1.jpg"
              style={{ width: '48%', height: 95, borderRadius: 5 }}
            />
            <Image
              // mode="widthFix"
              src="https://facei.top/static/allImages/activity_tags/%E6%B8%AF%E9%A3%8E/lszu7ifdfwjkb-1.jpg"
              style={{ width: '48%', height: 95, borderRadius: 5 }}
            />
          </View>
          <View>
            {/* 下半部分长方形图 */}
            <Image
              src="https://facei.top/static/allImages/activity_tags/%E6%B8%AF%E9%A3%8E/lszu7ifdfwjkb-1.jpg"
              style={{
                width: '100%',
                height: 95,
                borderRadius: 5,
                // marginTop: '5px',
                // objectFit: 'cover',
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
