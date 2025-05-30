import appUrl from '@api/appUrl';
import Config from 'react-native-config';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({baseUrl: `${Config.BASE_URL}`}),
  endpoints: builder => ({
    getTasks: builder.query({
      query: () => `${appUrl.GET_TODOS}?_limit=10`,
    }),
    addTask: builder.mutation({
      query: payload => ({
        url: appUrl.GET_TODOS,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {useGetTasksQuery, useAddTaskMutation} = tasksApi;
