import { Textarea, View } from '@tarojs/components';
export default function Prompt({ value, placeholder, onChange }) {
  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Textarea
          style={{
            width: '96%',
            height: '200rpx',
            marginBottom: '20rpx',
            borderRadius: '20rpx',
            background: 'transparent', // 将背景改为透明
            opacity: 1,
            color: 'black',
            border: '1px solid #bbb',
          }}
          maxlength={1024}
          placeholder="请输入文字"
          value={value}
          onInput={(e) => {
            onChange(e.target.value);
          }}
        ></Textarea>
      </View>
    </>
  );
}
