import axios from 'axios';

const END_POINT = `https://yts.mx/api/v2/`;
const LIST_MOVIES_URL = `${END_POINT}list_movies.json`;
const MOVIE_DETAILS_URL = `${END_POINT}movie_details.json`;
const MOVIE_SUGGESTION_URL = `${END_POINT}movie_suggestions.json`;

export const getMovies = async (limit, rating) => {
  try {
    const { data: {
      data: { movies }
    }
    } = await axios.get(LIST_MOVIES_URL, {
      params: {
        limit,
        minimum_rating: rating,
      }
    });
    return movies;
  } catch (error) {
    throw error;
  }
}

export const getById = async (id) => {
  try {
    const { data: {
      data: { movie }
    } } = await axios.get(MOVIE_DETAILS_URL, {
      params: {
        movie_id: id
      }
    });
    return movie;
  } catch (error) {
    throw error;
  }
}

export const getSuggestions = async (id) => {
  try {
    const { data: {
      data: { movies }
    } } = await axios.get(MOVIE_SUGGESTION_URL, {
      params: {
        movie_id: id,
      }
    })
    return movies;
  } catch (error) {
    throw error;
  }
}
