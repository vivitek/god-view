
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

const CREATE_ROUTER = gql`
    mutation($createRouterData: RouterCreationInput!) {
        createRouter(createRouterData: $createRouterData) {
            name
            url
            _id
        }
    }
`

const UPDATE_ROUTER = gql`
    mutation($updateRouterData: RouterUpdateInput!) {
        updateRouter(updateRouterData: $updateRouterData) {
            name
            url
            _id
        }
    }
`

export {
    GET_ROUTERS,
    DELETE_ROUTER,
    CREATE_ROUTER,
    UPDATE_ROUTER
}