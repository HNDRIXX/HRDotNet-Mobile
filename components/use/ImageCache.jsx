import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import * as FileSystem from 'expo-file-system';

const ImageCache = ({ source, style }) => {
  const [cachedSource, setCachedSource] = useState(null);

  useEffect(() => {
    const cacheImage = async () => {
      try {
        let localUri

        if (source.uri) {
          const { uri } = source

          const cachedImage = await FileSystem.getInfoAsync(uri)

          if (cachedImage.exists) {
            setCachedSource({ uri: cachedImage.uri })
            return
          }

          const { uri: downloadedImage } = await FileSystem.downloadAsync(
            uri,
            FileSystem.cacheDirectory + 'images/' + uri.split('/').pop()
          );
          localUri = downloadedImage;
        } else {
          // Local image, no need to download
          localUri = source;
        }

        setCachedSource({ uri: localUri });
      } catch (error) {
        console.error('Error caching image:', error);
      }
    };

    cacheImage();
  }, [source]);

  return (
    <View>
      {cachedSource ? (
        <Image source={cachedSource} style={style} />
      ) : (
        <View style={style} /> // Placeholder while loading
      )}
    </View>
  )
}


export default ImageCache;
