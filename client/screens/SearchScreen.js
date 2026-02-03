import React, { useCallback, useRef, useState } from 'react'
import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from '@react-native-icons/heroicons/24/solid'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import { fallbackMoviePoster, image185, searchMovies } from '../api/MoviesDb'

const { width, height } = Dimensions.get('window')

export default function SearchScreen() {
  const navigation = useNavigation()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const debounceTimeout = useRef(null)

  const handleSearch = value => {
    if (value && value.length > 2) {
      setLoading(true)
      searchMovies({
        query: value,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
      }).then(data => {
        setLoading(false)
        console.log('got movies: ', data)
        if (data && Array.isArray(data.results)) setResults(data.results)
        else setResults([])
      })
    } else {
      setLoading(false)
      setResults([])
    }
  }

  // simple debounce without external dependency
  const handleTextDebounce = useCallback((value) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    debounceTimeout.current = setTimeout(() => {
      handleSearch(value)
    }, 400)
  }, [])


  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor="lightgray"
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider mb-2"
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>

      </View>
        
            
              {
        loading ? (
          <Loading />
        ) : (
          results.length > 0 ? (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                className="space-y-3"
                >
  <Text className="text-white font-semibold ml-1 mt-2">
    Results ({results.length})
  </Text>

  <View className="flex-row justify-between flex-wrap mt-5">
    {
      results.map((item, index) => {
        const title = item?.title || item?.name || ''
        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => navigation.push("Movie", item)}
          >
            <View className="space-y-2 mb-4">
              <Image
                className="rounded-3xl"
                source={{ uri: image185(item?.poster_path) || fallbackMoviePoster }}
                style={{ width: width * 0.44, height: height * 0.3 }}
              />
              <Text className="text-neutral-300 ml-1">
               {
                    title.length > 22
                      ? title.slice(0, 22) + '...'
                      : title
                    }

              </Text>
            </View>
          </TouchableWithoutFeedback>
            )
            })
            }
        </View>
    </ScrollView>
          ) : (
        <View className="flex-row justify-center">
          <Image
            source={require('../assets/images/movieTime.png')}
            className="h-96 w-96"
            resizeMode="contain"
          />
        </View>
          )
        )
      }


    </SafeAreaView>
  )
}
