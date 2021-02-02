
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

const DELETE_ROUTER = gql`
    mutation($id: String!) {
        deleteRouter(id: $id) {
            _id
        }
    }
`

export {
    GET_ROUTERS,
    DELETE_ROUTER
}