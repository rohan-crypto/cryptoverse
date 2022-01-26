import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'cad94acf82msh1465091f1d6047fp1a95b4jsnbddc0cd9f86e'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        // getExchanges: builder.query({
        //     query: () => createRequest(`/exchanges`),
        // }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => 
                createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
        })
    })
})

// here name should be same as in endpoints but put use in beginning
// and Query at end for eg, getCryptos -> useGetCryptosQuery
export const {
    useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery,
    useGetExchangesQuery
} = cryptoApi;