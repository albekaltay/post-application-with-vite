import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User, Post, CreateUserRequest, UpdateUserRequest, CreatePostRequest, UpdatePostRequest } from '@/types'
import type { PaginationParams, PaginatedResponse } from '@/types/pagination'

export const jsonPlaceholderApi = createApi({
  reducerPath: 'jsonPlaceholderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['User', 'Post'],
  endpoints: (builder) => ({
    // Users endpoints
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      providesTags: ['User'],
    }),
    getUsersPaginated: builder.query<PaginatedResponse<User>, PaginationParams>({
      query: ({ page, limit }) => {
        const start = (page - 1) * limit
        return `users?_start=${start}&_limit=${limit}`
      },
      transformResponse: (response: User[], meta, { page, limit }) => {
        const totalCount = Number(meta?.response?.headers?.get('x-total-count') || 100)
        return {
          data: response,
          total: totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
        }
      },
      providesTags: ['User'],
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `users/${id}`,
      providesTags: (_, __, id) => [{ type: 'User', id }],
    }),
    createUser: builder.mutation<User, CreateUserRequest>({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'User', id }],
    }),

    // Posts endpoints
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    getPostsPaginated: builder.query<PaginatedResponse<Post>, PaginationParams>({
      query: ({ page, limit }) => {
        const start = (page - 1) * limit
        return `posts?_start=${start}&_limit=${limit}`
      },
      transformResponse: (response: Post[], meta, { page, limit }) => {
        const totalCount = Number(meta?.response?.headers?.get('x-total-count') || 100)
        return {
          data: response,
          total: totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
        }
      },
      providesTags: ['Post'],
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
      providesTags: (_, __, id) => [{ type: 'Post', id }],
    }),
    getPostsByUserId: builder.query<Post[], number>({
      query: (userId) => `posts?userId=${userId}`,
      providesTags: (_, __, userId) => [
        { type: 'Post', id: `USER_${userId}` },
      ],
    }),
    createPost: builder.mutation<Post, CreatePostRequest>({
      query: (newPost) => ({
        url: 'posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation<Post, UpdatePostRequest>({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Post', id }],
    }),
    deletePost: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Post', id }],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetUsersPaginatedQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetPostsQuery,
  useGetPostsPaginatedQuery,
  useGetPostByIdQuery,
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = jsonPlaceholderApi