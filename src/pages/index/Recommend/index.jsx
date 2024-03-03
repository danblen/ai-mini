import TabsImageList from './TabsImageList';

export default ({ tags_image, onNavigateToHot }) => {
  return (
    <TabsImageList
      tags_image={tags_image}
      onNavigateToHot={onNavigateToHot}
    ></TabsImageList>
  );
};
