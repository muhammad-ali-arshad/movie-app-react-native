import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback,Dimensions,Image } from 'react-native'
import React from 'react'
import { styles } from '../theme'
import { useNavigation } from 'expo-router'
import { fallbackMoviePoster, image185 } from '../api/MoviesDb'


export default function MovieList({ title, data = [], hideSeeAll }) {
    const { width, height } = Dimensions.get('window')
    let movieName = 'Mad Max Fury Roads'
    const navigation = useNavigation()
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>

       {
        !hideSeeAll?
         <TouchableOpacity>
          <Text style={styles.text} className="text-lg">
            See All
          </Text>
        </TouchableOpacity>:null
       }
      </View>

      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {data.map((item, index) => {
          const movieTitle = item?.title || item?.name || ''
          return (
                    <TouchableWithoutFeedback
                    key={index}
                    onPress={() => navigation.push('Movie', item)}
                    >
                    <View className="space-y-1 mr-4 mt-5">
                        <Image
                        source={{
                          uri: image185(item?.poster_path) || fallbackMoviePoster,
                        }}
                        className="rounded-3xl"
                        style={{ width: width * 0.33, height: height * 0.22 }}
                        />

                        <Text className="text-neutral-300 ml-1 mt-1">
                        {
                            movieTitle.length > 14
                            ? movieTitle.slice(0, 14) + '...'
                            : movieTitle}
                        </Text>
                    </View>
                    </TouchableWithoutFeedback>

          )
        })}
      </ScrollView>
    </View>
  )
}
