import {
    Bars3CenterLeftIcon,
    MagnifyingGlassIcon,
} from "@react-native-icons/heroicons/24/solid";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react"; // ✓ Added useEffect
import {
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/loading";

import { useNavigation } from "@react-navigation/native";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/MoviesDb";
import MovieList from "../components/MovieList";
import TrendingMovies from "../components/TrendingMovies";
import { styles } from "../theme";


const ios = Platform.OS == 'ios'
export default function HomeScreen() {
  const [trending ,setTrending] = useState([1,2,3])
  const [movieList ,setMovieList] = useState([1,2,3])
  const [topRatedMovies ,settopRatedMovies] = useState([1,2,3])
  const [loading , setLoading] = useState(true)

  const navigation = useNavigation()

  useEffect(() => {
    console.log('[Home] useEffect mounted, starting fetches')
    getTrendingMovies()
    getUpcomingMovies()
    getTopRatedMovies()
  }, [])

  const getTrendingMovies = async () => {
    setLoading(true)
    const data = await fetchTrendingMovies()
    console.log('[Home] Trending movies raw response:', data)
    if (data && Array.isArray(data.results)) {
      console.log('[Home] Trending results length:', data.results.length)
      setTrending(data.results)
    } else {
      console.log('[Home] Trending results missing or invalid')
      setTrending([])
    }
    setLoading(false)
  }

  const getUpcomingMovies = async () => {
    setLoading(true)
    const data = await fetchUpcomingMovies()
    console.log('[Home] Upcoming movies raw response:', data)
    if (data && Array.isArray(data.results)) {
      console.log('[Home] Upcoming results length:', data.results.length)
      setMovieList(data.results) 
    } else {
      console.log('[Home] Upcoming results missing or invalid')
      setMovieList([])
    }
    setLoading(false)
  }

  const getTopRatedMovies = async () => {
    setLoading(true)
    const data = await fetchTopRatedMovies()
    console.log('[Home] Top Rated movies raw response:', data)
    if (data && Array.isArray(data.results)) {
      console.log('[Home] Top Rated results length:', data.results.length)
      settopRatedMovies(data.results) 
    } else {
      console.log('[Home] Top Rated results missing or invalid')
      settopRatedMovies([])
    }
    setLoading(false)
  }

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios? "-mb-2":" "} >
        <StatusBar style="light"/>
        <View className ="flex-row justify-between items-center mx-4 mt-2 ">
         <Bars3CenterLeftIcon size="35" strokeWidth={2} color={"white"}/>
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
            </Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"/>
         </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading?(
            <Loading/>
        ):(
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
            nestedScrollEnabled
          >
            {/* Trending Movies*/}
            {trending.length > 0 && <TrendingMovies data={trending} />}

            {/* Upcoming Movies*/}
            <MovieList title="Upcoming Movies" data = {movieList} />

            {/* Top-Rated Movies*/}
            <MovieList title="Top-Rated Movies" data = {topRatedMovies} />
          </ScrollView>
        )
      }
    </View >
  );
}