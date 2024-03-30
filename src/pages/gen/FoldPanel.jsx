import { useState } from 'react';
import { View, Text } from '@tarojs/components';

const FoldPanel = ({ title, children }) => {
  const [isFolded, setIsFolded] = useState(true);

  const toggleFold = () => {
    setIsFolded(!isFolded);
  };

  return (
    <View style={foldPanelStyle}>
      <View style={headerStyle} onClick={toggleFold}>
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
        <Text style={iconStyle}>{isFolded ? '▼' : '▲'}</Text>
      </View>
      {!isFolded && <View style={{ marginTop: '10px' }}>{children}</View>}
    </View>
  );
};

export default FoldPanel;
const foldPanelStyle = {
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f8f8f8',
  padding: '10px',
  width: '96%',
  boxSizing: 'border-box',
  margin: '0 auto',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer',
};

const iconStyle = {
  marginLeft: '5px',
};
