import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_URL;


export const authApiService = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            // Get token from Redux store
            const token = getState().auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
        credentials: 'include'}),

    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            })
        }),
        logoutApi: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
    })
})

export const {
    useLoginMutation,
    useLogoutApiMutation,
} = authApiService