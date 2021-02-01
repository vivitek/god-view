
import { gql } from "@apollo/client"

const GET_ROUTERS = gql`
    query {
        getRouters {
            _id
            name
            url
        }
    }
`


export {
    GET_ROUTERS
}