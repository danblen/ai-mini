import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';

export default ({ title, data }) => {
  const [items, setItems] = useState(data);

  const handleItemClick = (index) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, selected: true };
      } else {
        return { ...item, selected: false };
      }
    });
    setItems(updatedItems);
  };

  return (
    <View
      style={{
        backgroundColor: '#f4f4f4',
        borderRadius: '5px',
        padding: '10px',
      }}
    >
      <Text style={{ fontWeight: 'bold', marginBottom: 40, fontSize: '18px' }}>
        {title}
      </Text>
      {items.map((item, index) => (
        <View
          key={index}
          style={{
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: item.selected ? '#E0E0E0' : '#fff',
            borderRadius: '5px',
            boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)',
          }}
          onClick={() => handleItemClick(index)}
        >
          <Text>{item.name}</Text>
        </View>
      ))}
    </View>
  );
};
