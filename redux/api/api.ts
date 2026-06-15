import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  id: number;
  name: string;
  email: string;
};
type GetUsersResponse = {
  users: User[];
};
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, void>({
      query: () => "/users",
    }),

createUser: builder.mutation<User, Partial<User>>({
  query: (user) => ({
    url: "/users",
    method: "POST",
    body: user,
  }),
})
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
} = api;