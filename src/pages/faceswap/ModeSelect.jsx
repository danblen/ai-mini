import { Text, View } from '@tarojs/components';
import { useState } from 'react';
import { AtActionSheet, AtActionSheetItem, AtButton, AtIcon } from 'taro-ui';
export default function ({ selectedOption, handleOptionSelect }) {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 99,
        }}
      >
        <View style={{ position: 'relative', display: 'inline-block' }}>
          <AtButton
            type="primary"
            style={{
              background: 'linear-gradient(to right, #00467f, #a5cc82)',
              animation: 'swap 1s infinite',
              opacity: 0.8,
              fontWeight: 'bold',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column', // 设置按钮内容竖向排列
            }}
            shape="circle"
            onClick={() => {
              setShowOptions(!showOptions);
            }} // 点击按钮时触发handleClick
          >
            {selectedOption.text}
            <AtIcon
              value={showOptions ? 'chevron-up' : 'chevron-down'}
              size="18"
              color="#FFF"
            ></AtIcon>
          </AtButton>
        </View>
      </View>
      <AtActionSheet
        isOpened={showOptions}
        cancelText="取消"
        onClose={() => setShowOptions(false)}
      >
        <AtActionSheetItem
          onClick={() => {
            setShowOptions(false);
            handleOptionSelect({ text: '快速模式', usePoint: 1 });
          }}
        >
          <View
            style={{
              display: 'flex',
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              background:
                selectedOption.text === '快速模式' ? '#f2f2f2' : '#fff',
            }}
          >
            <Text
              style={{
                color: selectedOption.text === '快速模式' ? '#6190E8' : '#666',
              }}
            >
              快速模式(1积分)
            </Text>
          </View>
        </AtActionSheetItem>
        <AtActionSheetItem
          onClick={() => {
            setShowOptions(false);
            handleOptionSelect({ text: '数字分身模式', usePoint: 5 });
          }}
        >
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 40,
              justifyContent: 'center',
              background:
                selectedOption.text === '数字分身模式' ? '#f2f2f2' : '#fff',
            }}
          >
            <Text
              style={{
                color:
                  selectedOption.text === '数字分身模式' ? '#6190E8' : '#666',
              }}
            >
              数字分身模式(5积分)
            </Text>
          </View>
        </AtActionSheetItem>
        <AtActionSheetItem
          onClick={() => {
            setShowOptions(false);
            handleOptionSelect({ text: '精修模式', usePoint: 3 });
          }}
        >
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              background:
                selectedOption.text === '精修模式' ? '#f2f2f2' : '#fff',
            }}
          >
            <Text
              style={{
                color: selectedOption.text === '精修模式' ? '#6190E8' : '#666',
              }}
            >
              精修模式(3积分)
            </Text>
          </View>
        </AtActionSheetItem>
      </AtActionSheet>
    </>
  );
}
