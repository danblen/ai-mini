import TabsImageList from './TabsImageList';

export default ({ tags_image, onNavigateToTab, titleParam }) => {
  return (
    <TabsImageList
      tags_image={tags_image}
      onNavigateToTab={onNavigateToTab}
      titleParam={titleParam}
    ></TabsImageList>
  );
};
