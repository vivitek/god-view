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

const DELETE_USER = gql`
    mutation($id: String!) {
        deleteUser(id: $id) {
            _id
        }
    }
`

const CREATE_USER = gql`
    mutation($userCreationData: UserCreationInput!) {
        createUser(userCreationData : $userCreationData) {
            username
            email
            _id
        }
    }
`


export {
    GET_USERS,
    DELETE_USER,
    CREATE_USER
}