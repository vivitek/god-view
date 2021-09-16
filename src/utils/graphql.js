import { gql } from "@apollo/client"

const LOGIN = gql`
  mutation($loginData: LoginInput!) {
    loginGodView(loginData: $loginData) {
      access_token
      user {
        email
        username
      }
    }
  }
`

const GET_BOXES = gql`
  query {
    getRouters {
      _id
      name
      url
    }
  }
`

const GET_BOX_BY_UUID = gql`
  query($id: String!) {
    getRouter(id: $id) {
      name
      url
    }
  }
`
const DELETE_BOX = gql`
    mutation($id: String!) {
        deleteRouter(id: $id) {
            _id
        }
    }
`
const CREATE_BOX = gql`
    mutation($createRouterData: RouterCreationInput!) {
        createRouter(createRouterData: $createRouterData) {
            name
            url
            _id
        }
    }
`

const GET_USERS = gql`
  query {
    getUsers {
      _id
      username
      email
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
  LOGIN,
  GET_BOXES,
  GET_BOX_BY_UUID,
  DELETE_BOX,
  CREATE_BOX,
  GET_USERS,
  DELETE_USER,
  CREATE_USER
}