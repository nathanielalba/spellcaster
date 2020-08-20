import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';

import { VideoListItem } from '../components/video-list';
import theme from '../theme';

const tempData = [
  {
    id: 1,
    title: 'Harry Potter Magic Spell - Wingardium Leviosa',
    thumbnail: 'https://i.ytimg.com/vi/nAQBzjE-kvI/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCGmH9fGkaqyGu7jYu2Bq9RGW2RXg',
  },
  {
    id: 2,
    title: 'The Lord of the Rings - "You Have No Power Here)',
    thumbnail: 'https://i.ytimg.com/vi/m_mPE9gcQJo/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC8N99V5BH6ssku-ms8R-vyknXjfA',
  },
  {
    id: 3,
    title: 'How To Start Casting Spells Safely',
    thumbnail: 'https://i.ytimg.com/vi/e3sfFQ5Hjos/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC4Ch2kWOv6VqXCFj6KkwahWGtt7g',  },
  {
    id: 4,
    title: 'How To Cast A Spell',
    thumbnail: 'https://i.ytimg.com/vi/HWOr7o0tk9M/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCZ0Sp4kqmeLlqSftOvW8rWZ7oa2A',
  },
];

const VideoListScreen = () => {
  const renderItem = ({ item }) => {
    return (
      <VideoListItem
        thumbnail={item.thumbnail}
        title={item.title}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={item => item.id}
      renderItem={renderItem}
      data={tempData}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
});

export default VideoListScreen;
