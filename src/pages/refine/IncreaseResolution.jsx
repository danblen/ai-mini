import { Button, View } from '@tarojs/components';

export default ({ sdWith2KParams, sdWith4KParams }) => {
  return (
    <View
      style={{
        bottom: 30,
        position: 'absolute',
      }}
    >
      <Button
        onClick={async () => {
          sdWith2KParams();
        }}
      >
        高清画质
      </Button>
      <Button
        onClick={async () => {
          sdWith4KParams();
        }}
      >
        超清画质
      </Button>
    </View>
  );
};
