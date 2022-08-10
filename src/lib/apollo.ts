 import { ApolloClient, InMemoryCache } from "@apollo/client"
 
 export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.hygraph.com/v2/cl6f6lcue21qc01uq9xjw02vk/master',
    cache: new InMemoryCache()
 })