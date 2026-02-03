import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, Image, Text, TouchableWithoutFeedback, View } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { image500 } from '../api/MoviesDb'
const { width, height } = Dimensions.get('window')

export default function TrendingMovies({ data = [] }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    // Navigate with the movie object directly so MovieScreen gets params = item
    navigation.navigate('Movie', item)
  }
  
  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ color: 'white', fontSize: 20, marginHorizontal: 16, marginBottom: 20 }}>
        Trending
      </Text>

      <Carousel
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <MovieCard item={item} onPress={() => handleClick(item)} />}
        sliderWidth={width}
        itemWidth={width * 0.62}
        inactiveSlideScale={0.95}
        inactiveSlideOpacity={0.7}
        activeSlideAlignment="center"
        enableMomentum
        decelerationRate={0.9}
        contentContainerCustomStyle={{
          paddingHorizontal: (width - width * 0.8) / 2,
        }}
        removeClippedSubviews={false}
      />
    </View>
  )
}


const MovieCard = ({ item, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        source={{uri: image500(item.poster_path)}}
        style={{
          width: '100%',
          height: height * 0.43,
          borderRadius: 24,
        }}
        resizeMode="cover"
      />
    </TouchableWithoutFeedback>
  )
}

