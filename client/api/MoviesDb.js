
const apiBaseUrl = 'https://api.themoviedb.org/3'
const apiKey = '797e8cf27f10586bb620b22f8e1c47e3'



const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`


// dynamic endpoints
const movieDetailsEndpoint = id =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`

const movieCreditsEndpoint = id =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`

const similarMoviesEndpoint = id =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`


export const image500 = path =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null

export const image342 = path =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null

export const image185 = path =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null

export const fallbackMoviePoster =
  'https://ui-avatars.com/api/?name=Unknown&size=512';

export const fallbackPersonImage =
  'https://ui-avatars.com/api/?name=Unknown&size=512';


const personDetailsEndpoint = id =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`

const personMoviesEndpoint = id =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`

const searchMoviesEndpoint = query =>
  `${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`


const apiCall = async (endpoint, params) => {
  try {
    const url =
      params && Object.keys(params).length
        ? `${endpoint}&${new URLSearchParams(params).toString()}`
        : endpoint

    console.log('[TMDB] Fetching URL:', url)

    const response = await fetch(url)

    console.log('[TMDB] Response status:', response.status)

    const data = await response.json()

    console.log(
      '[TMDB] Parsed response keys:',
      data ? Object.keys(data) : 'NO DATA'
    )
    if (data && Array.isArray(data.results)) {
      console.log('[TMDB] results length:', data.results.length)
    } else {
      console.log('[TMDB] results is missing or not an array')
    }

    return data
  } catch (error) {
    console.log('[TMDB] api error:', error)
    return {}
  }
}

export const fetchTrendingMovies = () => apiCall(trendingMoviesEndpoint)
export const fetchUpcomingMovies = () => apiCall(upcomingMoviesEndpoint)
export const fetchTopRatedMovies = () => apiCall(topRatedMoviesEndpoint)



export const fetchMovieDetails = id => {
  return apiCall(movieDetailsEndpoint(id))
}

export const fetchMovieCredits = id => {
  return apiCall(movieCreditsEndpoint(id))
}

export const fetchSimilarMovies = id => {
  return apiCall(similarMoviesEndpoint(id))
}


export const fetchPersonDetails = id => {
  return apiCall(personDetailsEndpoint(id))
}

export const fetchPersonMovies = id => {
  return apiCall(personMoviesEndpoint(id))
}


export const searchMovies = params => {
  return apiCall(searchMoviesEndpoint(params.query), params)
}
