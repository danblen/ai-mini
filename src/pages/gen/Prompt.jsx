import { Text, Textarea, View } from '@tarojs/components';

export default function Prompt({ title, value, placeholder, onChange }) {
  return (
    <View
      style={{
        width: '96%',
        margin: '0 auto',
      }}
    >
      <View style={headerStyle}>
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        <Text onClick={() => {}}> </Text>
      </View>
      <Textarea
        style={{
          width: '100%',
          height: 200,
          marginBottom: '20rpx',
          borderRadius: '20rpx',
          background: '#f5f5f5', // 将背景改为透明
          opacity: 1,
          padding: 10,
          boxSizing: 'border-box',
          color: 'black',
        }}
        maxlength={1024}
        placeholder="请输入文字"
        value={value}
        onInput={(e) => {
          onChange(e.target.value);
        }}
      ></Textarea>
    </View>
  );
}
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer',
};
