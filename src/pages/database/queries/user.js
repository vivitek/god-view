import { gql } from "@apollo/client"

const GET_USERS = gql`
    query {
        getUsers {
            _id
            email
            username
        }
    }
`


export {
    GET_USERS
}