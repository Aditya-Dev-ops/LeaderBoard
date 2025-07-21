import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

export interface User{
    _id:string
    username:string;
    email:string;
    password:string;
    totalPoints?:number;
}

export interface claimpointstypes{
     claimedBy:string;
     awardedBy:string;
     claimedPoints:number;
}

interface ClaimHistoryType {
    _id: string;
    claimedBy: User;
    awardedBy: User;
    claimedPoints: number;
    claimedAt: string;
    createdAt: string;
    updatedAt: string;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/user',

    prepareHeaders: async (headers , {getState} ) => {
      const accessToken = (getState() as RootState).auth.token;
      console.log(accessToken)
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Leaderboard", "Users", "History"],
  endpoints: (builder) => ({
    getLeaderboard: builder.query<{
      currentPage: number;
      totalPages: number;
      totalUsers: number;
      users: User[];
    }, number | void>({
      query: (page = 1) => `/leaderboard?page=${page}`,
      providesTags: ["Leaderboard"],
    }),
    getUsers: builder.query<User[], void>({
      query: () =>({
        url:"users",
        method:"GET"
      }),
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
    }),
    claimPoints:builder.mutation<claimpointstypes, claimpointstypes>({
        query:({claimedBy, awardedBy, claimedPoints})=>({
           url:"/claim",
           method:"POST",
           body:{claimedBy, awardedBy , claimedPoints},
        }),
        invalidatesTags:["Leaderboard","History"],
    }),
    getClaimHistory: builder.query<ClaimHistoryType[], string>({
        query: (userId) =>({
            url:`/history/${userId}`,
            method:"GET"
        }), 
        providesTags: ['History'],
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation , useGetLeaderboardQuery, useClaimPointsMutation,useGetClaimHistoryQuery} = usersApi;