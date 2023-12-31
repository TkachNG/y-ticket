import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/",
  }),
  endpoints: (builder) => ({
    getCinemas: builder.query({ query: () => "cinemas" }),
    getMovies: builder.query({
      query: (cinemaId = null) => {
        return "movies" + (cinemaId ? `?cinemaId=${ cinemaId }` : '');
      }
    }),
    getMovie: builder.query({ query: (movieId) => `movie?movieId=${ movieId }` }),
    getReviews: builder.query({ query: (movieId) => `reviews?movieId=${ movieId }` }),
  })
});

export const { useGetMoviesQuery, useGetMovieQuery, useGetCinemasQuery, useGetReviewsQuery } = movieApi;
