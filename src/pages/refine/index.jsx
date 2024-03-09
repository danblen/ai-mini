import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtIcon } from 'taro-ui';
import React, { useRef, useState } from 'react';
import IconTri from '../../static/image/my/triangle.png';
import Icon1080 from '../../static/image/my/full1080.png';
import Icon4k from '../../static/image/my/full.png';
import IconAI from '../../static/image/my/artificial-intelligence.png';
import IconCartoon from '../../static/image/my/success.png';

const srcHD1 = 'https://facei.top/static/allImages/index/HD.jpg';
const srcHD = 'https://facei.top/static/allImages/index/HD+.jpg';
const srcAI = 'https://facei.top/static/allImages/index/woman_cartoon.jpg';
const srcMan = 'https://facei.top/static/allImages/index/man_cartoon.jpg';

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState('HD');
  const [iconPosition, setIconPosition] = useState('15%'); // 初始化iconPosition为20%
  const [borderColor0, setBorderColor0] = useState('#024c8c');
  const [borderColor1, setBorderColor1] = useState('#808080');
  const [borderColor2, setBorderColor2] = useState('#808080');
  const [borderColor3, setBorderColor3] = useState('#808080');
  const [src, setSrc] = useState(srcHD);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === 'HD') {
      setSrc(srcHD);
      setIconPosition('15%');
      setBorderColor0('#024c8c');
      setBorderColor1('#808080');
      setBorderColor2('#808080');
      setBorderColor3('#808080');
    } else if (option === 'HD+') {
      setSrc(srcHD1);
      setIconPosition('38%');
      setBorderColor0('#808080');
      setBorderColor1('#024c8c');
      setBorderColor2('#808080');
      setBorderColor3('#808080');
    } else if (option === 'Fix') {
      setSrc(srcHD);
      setIconPosition('59%');
      setBorderColor0('#808080');
      setBorderColor1('#808080');
      setBorderColor2('#024c8c');
      setBorderColor3('#808080');
    } else if (option === 'CTON') {
      setSrc(srcMan);
      setIconPosition('83%');
      setBorderColor0('#808080');
      setBorderColor1('#808080');
      setBorderColor2('#808080');
      setBorderColor3('#024c8c');
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Text
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        AI修图
      </Text>
      <Text
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '14px',
        }}
      >
        一键拯救低画质
      </Text>
      <View
        style={{
          width: '100%',
          height: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          mode="aspectFill"
          src={src}
          style={{ maxWidth: '100%', height: '300px', objectFit: 'contain' }}
        />
      </View>
      <View>
        <View
          style={{
            position: 'relative',
            left: iconPosition,
            top: '20px',
          }}
        >
          <Image
            src={IconTri}
            style={{
              width: '15px',
              height: '15px',
            }}
          />
          {/* <AtIcon value="chevron-up" size="20" color="#033561" /> */}
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: '5%',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '4px solid transparent',
            borderColor: borderColor0,
            borderRadius: '10px',
            padding: '4px',
          }}
          onClick={() => handleOptionClick('HD')}
        >
          <Image src={Icon1080} style={{ width: '80px', height: '80px' }} />
          <Text
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            高清
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '4px solid transparent',
            borderColor: borderColor1,
            borderRadius: '10px',
            padding: '4px',
          }}
          onClick={() => handleOptionClick('HD+')}
        >
          <Image src={Icon4k} style={{ width: '80px', height: '80px' }} />
          <Text
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            超清
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '4px solid transparent',
            borderColor: borderColor2,
            borderRadius: '10px',
            padding: '4px',
          }}
          onClick={() => handleOptionClick('Fix')}
        >
          <Image src={IconAI} style={{ width: '80px', height: '80px' }} />
          <Text
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            涂鸦修图
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '4px solid transparent',
            borderColor: borderColor3,
            borderRadius: '10px',
            padding: '4px',
          }}
          onClick={() => handleOptionClick('CTON')}
        >
          <Image src={IconCartoon} style={{ width: '80px', height: '80px' }} />
          <Text
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            漫画
          </Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            background: '#00adff',
            borderRadius: '10px',
            padding: '10px',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        >
          立即体验
        </Text>
      </View>
    </View>
  );
};

export default HomePage;
