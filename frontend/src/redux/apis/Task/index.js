import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.REACT_APP_BASE_URL}/tasks/`

export const taskApiService = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, {getState}) => {
            const token = getState().authSlice.token

            headers.set('Authorization', `Bearer ${token}`)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: (args) => {
                let {id, currentPage, itemsPerPage, search, sortBy} = args

                if (id) {
                    return `tasks`
                }

                return `tasks?page=${currentPage}&rowsPerPage=${itemsPerPage}&role=${role}${(search && search !== '') ? `&search=${search}` : ``}${(sortBy && sortBy !== '') ? `&sortBy=${sortBy}` : ``}`
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