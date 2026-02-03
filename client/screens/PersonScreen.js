import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon } from '@react-native-icons/heroicons/24/outline'
import { HeartIcon } from '@react-native-icons/heroicons/24/solid'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../theme'
import MovieList from '../components/MovieList'
import Loading from '../components/loading'
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../api/MoviesDb'
export default function PersonScreen() {
    const personName = "Tom Hardy"
  const { width, height } = Dimensions.get('window')
  const ios = Platform.OS === 'ios'
  const verticalMargin = ios ? '' : 'my-3'
  const navigation = useNavigation()
  const { params } = useRoute()
  // Support both shapes: params = person OR params = { person: ..., item: ... }
  const personParam = params?.person || params?.item || params
  const [isFavourite, toggleFavourite] = useState(false)
  const [personMovies, setPersonMovies] = useState([])
  const [person, setPerson] = useState({})
  const [loading, setLoading] = useState(false)

useEffect(() => {
  if (!personParam || !personParam.id) {
    console.log('[PersonScreen] No valid person id in route params:', params)
    return
  }
  setLoading(true)
  getPersonDetails(personParam.id)
  getPersonMovies(personParam.id)
}, [personParam])

const getPersonDetails = async id => {
  const data = await fetchPersonDetails(id)
  console.log('[PersonScreen] got person details:', data)
  if (data) setPerson(data)
  setLoading(false)
}

const getPersonMovies = async id => {
  const data = await fetchPersonMovies(id)
  console.log('[PersonScreen] got person movies:', data)
  if (data && Array.isArray(data.cast)) setPersonMovies(data.cast)
}



  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >

      {/* back button */}
      <SafeAreaView
        className={`z-20 w-full flex-row justify-between items-center px-4 ${verticalMargin}`}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1"
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size={35} color={isFavourite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      {
        loading ? (
          <Loading />
        ) : (
          <View>
        <View 
          className="flex-row justify-center"
          style={{
            ...(ios ? {
              shadowColor: '#000',
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.8,
            } : {
              elevation: 20,
            }),
          }}
        >
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
            <Image
              source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
              style={{ height: height * 0.43, width: width * 0.74 }}
              resizeMode="cover"
            />
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
            {person?.name}
          </Text>
          <Text className="text-base text-neutral-500 text-center">
            {person?.place_of_birth}
          </Text>
        </View>
        <View 
          className="mx-2 p-1 mt-6 flex-row items-center rounded-full "
          style={{ backgroundColor: '#404040',height:55 }}
        >
          <View 
            className="flex-1 items-center"
            style={{ 
              borderRightWidth: 2, 
              borderRightColor: '#a3a3a3',
              paddingRight: 8,
              paddingLeft: 8,
            }}
          >
            <Text className="text-white font-semibold">Gender</Text>
        <Text className="text-neutral-300 text-sm">{person?.gender === 1 ? 'Female' : 'Male'
}</Text>
          </View>

          <View 
            className="flex-1 items-center"
            style={{ 
              borderRightWidth: 2, 
              borderRightColor: '#a3a3a3',
              paddingRight: 1,
              paddingLeft: 1,
            }}
          >
            <Text className="text-white font-semibold">Birthday</Text>
            <Text className="text-neutral-300 text-sm">
              {person?.birthday || 'N/A'}
            </Text>
          </View>

          <View 
            className="flex-1 items-center"
            style={{ 
              borderRightWidth: 2, 
              borderRightColor: '#a3a3a3',
              paddingRight: 12,
              paddingLeft: 12,
            }}
          >
            <Text className="text-white font-semibold">Known for</Text>
            <Text className="text-neutral-300 text-sm">{person?.known_for_department}</Text>
          </View>

          <View 
            className="flex-1 items-center"
            style={{ 
              paddingLeft: 12,
              paddingRight: 8,
            }}
          >
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300 text-sm">
              {person?.popularity != null ? `${person.popularity.toFixed(2)} %` : 'N/A'}
            </Text>
          </View>
        </View>

<View className="my-6 mx-4 space-y-2">
  <Text className="text-white text-lg">Biography</Text>
  <Text className="text-neutral-400 tracking-wide">
    {person?.biography || 'N/A'}
  </Text>
</View>

    {/* movies */}
    <MovieList title="Movies" hideSeeAll={true} data={personMovies} />

          </View>
        )
      }
    </ScrollView>
  )
}
