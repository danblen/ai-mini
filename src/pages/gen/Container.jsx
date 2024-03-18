import { View } from '@tarojs/components';
import { useState } from 'react';
import { AtDrawer } from 'taro-ui';
import TaskList from '../comps/TaskList';
import TaskListTip from '../faceswap/TaskListTip';

const viewStyle = { marginTop: 90 };
const drawerStyle = { background: 'black', height: '100%', zIndex: 10 };

export default ({ images, children }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (event) => {
    setStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;
    if (deltaX < -50) {
      setShowDrawer(true);
    } else if (deltaX > 50) {
      setShowDrawer(false);
    }
  };

  return (
    <View
      onTouchstart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="container"
      style={viewStyle}
    >
      {children}
      <TaskListTip onClick={() => setShowDrawer(true)} />
      <AtDrawer
        show={showDrawer}
        right
        mask
        width="80%"
        onClose={() => setShowDrawer(false)}
        style={drawerStyle}
      >
        <TaskList images={images} />
      </AtDrawer>
    </View>
  );
};
