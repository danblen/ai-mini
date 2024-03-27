import { ScrollView, Text, View } from '@tarojs/components';
export default ({ images }) => {
  return (
    <View
      style={{
        height: '100vh',
        paddingTop: 40,
      }}
    >
      <ScrollView style={{}}>
        <View
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              width: '96%',
            }}
          >
            {images?.length === 0 && (
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ textAlign: 'center' }}>
                  没有作品可显示,快去首页试试吧~
                </Text>
              </View>
            )}
            {images?.map((image) => (
              <>
                {image.status === 'pending' && (
                  <View
                    style={{
                      width: '49%',
                      height: 230,
                      marginBottom: 6,
                      borderRadius: 5,
                      border: '1px solid #888',
                      boxSizing: 'border-box',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {/* <Loading /> */}
                    <View
                      style={{
                        padding: 10,
                      }}
                    >
                      制作中...
                    </View>
                  </View>
                )}
                {image.status === 'waiting' && (
                  <View
                    style={{
                      border: '1px solid #888',
                      borderRadius: 5,
                      boxSizing: 'border-box',
                      width: '49%',
                      height: 230,
                      marginBottom: 6,
                      borderRadius: '10rpx',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        padding: 10,
                      }}
                    >
                      后台排队处理中
                    </View>
                  </View>
                )}
              </>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
