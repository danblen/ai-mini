import { View } from '@tarojs/components';
import FoldPanel from './FoldPanel';
import Prompt from './Prompt';

export default ({ negativePrompt, setNegativePrompt }) => {
  return (
    <FoldPanel title={'更多选项'}>
      <View>
        <Prompt
          title={'反向描述'}
          value={negativePrompt}
          onChange={(value) => {
            setNegativePrompt(value);
          }}
        />
      </View>
    </FoldPanel>
  );
};
