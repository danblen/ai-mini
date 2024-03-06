import { Image, Text, View } from '@tarojs/components';
import { navigateTo } from '../../base/global';

export default ({ background, buttons }) => {
  const handleButtonClick = (button) => {
    if (button.onClick) {
      button.onClick();
      return;
    }
    // 对参数进行编码
    const encodedParams =button.params&& Object.entries(button.params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    const url = `${button.pagePath}?${encodedParams}`;

    navigateTo({
      url: url,
    });
  };

  return (
    <View
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        background: background || '#dcdadacf',
        width: '96%',
      }}
    >
      <View style={{ display: 'flex', justifyContent: 'space-around' }}>
        {buttons.map((button, index) => (
          <View key={index} onClick={() => handleButtonClick(button)}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Image
                style={{
                  width: 40,
                  height: 40,
                }}
                src={button.imageUrl}
              />
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: '5px',
                  fontSize: 12,
                }}
              >
                {button.text}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
