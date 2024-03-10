const { useState, useEffect, useRef } = require('react');
const { View, Image } = require('@tarojs/components');
const { AtImagePicker } = require('taro-ui');
const Taro = require('@tarojs/taro');
const { wxPathToBase64 } = require('../../utils/imageTools');

export default function ImagePicker({ onFilesChange, onSelectImage }) {
  const [files, setFiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const filesRef = useRef(files);
  const selectedIndexRef = useRef(selectedIndex);

  useEffect(() => {
    filesRef.current = files;
    selectedIndexRef.current = selectedIndex;
  }, [files, selectedIndex]);

  useEffect(() => {
    // 获取本地缓存数据
    wx.getStorage({
      key: 'filesData',
      success: function (res) {
        const storedFiles = res.data;
        if (storedFiles && storedFiles.files) {
          setFiles(storedFiles.files);
          setSelectedIndex(storedFiles.selectedIndex);
          onFilesChange(storedFiles.files);
          onSelectImage(storedFiles.selectedIndex);
        }
      },
      fail: function (err) {
        console.log('本地缓存数据无数据', err);
      },
    });
    return () => {
      const dataToStore = {
        files: filesRef.current,
        selectedIndex: selectedIndexRef.current, // 将 selectedIndex 存储为当前选中的索引
      };
      wx.setStorage({
        key: 'filesData', // 设置存储的key，用于后续获取数据
        data: dataToStore, // 要保存的数据
        // success: function (res) {
        //   console.log("数据保存成功");
        // },
        fail: function (err) {
          console.error('数据保存失败', err);
        },
      });
    };
  }, []);

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomString}`;
  };

  const compressInputImage = async (file) => {
    try {
      let compressedFile;
      let srcBase64;
      let src_size = file.file.size;

      let quality = Math.floor((-0.0738 * src_size) / 1024 + 113.75);
      // 当文件大于200KB时循环压缩
      if (quality < 0) quality = 5;
      while (src_size > 200 * 1024 && quality > 0) {
        console.log('src_size', src_size, quality);
        compressedFile = await Taro.compressImage({
          src: file.url,
          quality,
        });
        srcBase64 = await wxPathToBase64(compressedFile.tempFilePath);
        src_size = srcBase64.length;
        // 根据线性关系调整压缩质量

        quality = Math.floor(-0.0738 * src_size + 113.75); // 动态调整压缩质量

        // 防止负数或过大的压缩质量值
        if (quality > 99) {
          quality = 99;
        }
        console.log('compressed siez', src_size);
      }

      return {
        base64: srcBase64,
      };
    } catch (error) {
      console.error('图片压缩失败：', error);
      return file;
    }
  };

  const handleImageChange = async (newFiles) => {
    try {
      let curIndex = newFiles.length - 1;
      // 添加文件时才进行压缩处理
      if (newFiles.length > files.length) {
        const compressedFile = await compressInputImage(newFiles[curIndex]);
        newFiles[curIndex].id = generateUniqueId();
        newFiles[curIndex].compressBase64 = compressedFile.base64
          ? compressedFile.base64
          : null;
      }

      const dataToStore = {
        files: newFiles,
        selectedIndex: curIndex, // 将 selectedIndex 存储为当前选中的索引
      };
      wx.setStorage({
        key: 'filesData', // 设置存储的key，用于后续获取数据
        data: dataToStore, // 要保存的数据
        // success: function (res) {
        //   console.log("数据保存成功");
        // },
        fail: function (err) {
          console.error('数据保存失败', err);
        },
      });
      setFiles(newFiles);
      setSelectedIndex(curIndex);
      onFilesChange(newFiles);
      onSelectImage(newFiles.length - 1);
    } catch (error) {
      console.error('处理图片失败：', error);
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View>
        {files.map(
          (file, index) =>
            index === selectedIndex && (
              <View
                key={index}
                style={{
                  position: 'relative',
                  margin: '5px',
                  marginRight: '20px', // 间距以确保三角形与 AtImagePicker 有一定距离
                }}
              >
                <Image
                  src={file.url}
                  style={{
                    width: 80,
                    height: 80,
                    border: '2px solid #06638e', // 图像边框样式
                    borderRadius: 5,
                  }}
                  mode="aspectFill"
                />
                {/* 添加倒三角形 */}
                <View
                  style={{
                    position: 'absolute',
                    top: '50%', // 上下居中
                    right: '-20px', // 贴近图像右侧
                    transform: 'translateY(-50%)', // 上下居中
                    width: 0,
                    height: 0,
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderRight: '8px solid #06638e', // 右侧三角形指向 AtImagePicker
                  }}
                />
              </View>
            )
        )}
      </View>
      <AtImagePicker
        length={4}
        count={2}
        files={files}
        onChange={handleImageChange}
        onFail={(mes) => {}}
        onImageClick={(index, file) => {
          setSelectedIndex(index);
          onSelectImage(index);
        }}
      />
    </View>
  );
}
