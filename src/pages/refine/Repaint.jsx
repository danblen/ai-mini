import { Button, View } from '@tarojs/components';

export default ({ isEraserActivated }) => {
  return (
    <View>
      <Button
        onClick={async () => {
          console.log(lineWidth);
          if (lineWidth >= 40) setlineWidth(lineWidth);
          else setlineWidth(lineWidth + 5);
        }}
      >
        笔画+
      </Button>
      <Button
        onClick={async () => {
          if (lineWidth <= 5) setlineWidth(5);
          else setlineWidth(lineWidth - 5);
        }}
      >
        笔画-
      </Button>
      <Button
        onClick={async () => {
          initCanvas();
        }}
      >
        清屏
      </Button>
      <Button
        onClick={async () => {
          setIsEraserActivated(!isEraserActivated);
        }}
      >
        {isEraserActivated ? '取消橡皮擦' : '橡皮擦'}
      </Button>
      <Button onClick={async () => {}}>比较</Button>
      <Button
        onClick={async () => {
          inpaitUseSD();
        }}
      >
        开始重绘
      </Button>
    </View>
  );
};
