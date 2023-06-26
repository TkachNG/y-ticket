import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { Movie } from "@/components/movie/Movie";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/",
  }),
  endpoints: (builder) => ({
    getCinemas: builder.query({ query: () => "cinemas" }),
    getMovies: builder.query({
      query: (cinemaId = null) => {
        return "movies" + (Boolean(cinemaId) ? `?cinemaId=${cinemaId}` : '');
      }
    }),
    getMovie: builder.query<Movie, string>({ query: (movieId) => `movie?movieId=${movieId}` }),
    getReviews: builder.query({ query: (movieId) => `reviews?movieId=${movieId}` }),
  })
});

export const { useGetMoviesQuery, useGetMovieQuery, useGetCinemasQuery, useGetReviewsQuery } = movieApi;
