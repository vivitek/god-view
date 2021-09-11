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

const GET_USERS = gql`
  query {
    getUsers {
      _id
      username
      email
    }
  }
`

export {
  LOGIN,
  GET_BOXES,
  GET_BOX_BY_UUID,
  GET_USERS
}