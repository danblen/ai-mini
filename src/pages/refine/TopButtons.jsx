import { View } from "@tarojs/components";

export default ({onBack,onForward,onSave}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 90,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <View style={{ flex: 2 }}></View>
      <View
        style={{ flex: 1, display: 'flex', justifyContent: 'space-around' }}
      >
        <View
          className="at-icon at-icon-chevron-left"
          onClick={onBack}
        ></View>
        <View
          className="at-icon at-icon-chevron-right"
          onClick={onForward}
        ></View>
      </View>

      <View
        style={{
          flex: 2,
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: 10,
        }}
      >
        <View
          onClick={onSave}
          style={{
            width: 60,
            height: 30,
            background: '#fff',
            borderRadius: 15,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          保存
        </View>
      </View>
    </View>
  );
};
