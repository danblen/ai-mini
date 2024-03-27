import { View } from '@tarojs/components';
import { AtDrawer } from 'taro-ui';
import List from './List';
import UserBox from './UserBox';
import { useEffect, useState } from 'react';
import { clearUserInfo } from '../../../common/user';

export default ({ showDrawer, onClose }) => {
  const [userInfo, setUserInfo] = useState(global.userInfo);

  useEffect(() => {
    setUserInfo(global.userInfo);
  }, [global.userInfo]);
  return (
    <AtDrawer show={showDrawer} left mask width="60%" onClose={onClose}>
      <View
        style={{
          paddingTop: 50,
          backgroundImage: global.t.bgImage,
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <View style={{ width: '90%' }}>
          <UserBox userInfo={userInfo} />
          <List
            userInfo={userInfo}
            onClose={onClose}
            onLogout={() => {
              setUserInfo({
                isLogin: false,
                data: {},
              });
              clearUserInfo();
              onClose();
            }}
          />
        </View>
      </View>
    </AtDrawer>
  );
};
