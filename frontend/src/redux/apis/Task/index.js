import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_URL;

export const taskApiService = createApi({
    reducerPath: 'taskApi',
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
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: (args) => {
                let {id, page, perPage, search, filterStatus, sortBy} = args

                if (id) {
                    return `tasks`
                }

                return `tasks?page=${page}&perPage=${perPage}${(search && search !== '') ? `&search=${search}` : ``}${(filterStatus && filterStatus !== '') ? `&status=${filterStatus}` : ``}${(sortBy && sortBy !== '') ? `&sortBy=${sortBy}` : ``}`
            },
            keepUnusedDataFor: 0
        }),
        createTask: builder.mutation({
            query: args => ({
                url: 'tasks',
                method: 'POST',
                body: args
            })
        }),
        updateTask: builder.mutation({
            query: (args) => {

                let {id, payload} = args
                let url = `tasks/${id}`

                return ({
                    url,
                    method: 'PUT',
                    body: payload
                })

            }
        })
    })
})

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateProductMutation
} = taskApiService