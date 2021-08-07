import { gql } from "@apollo/client"

const LOGIN = gql`
  mutation($loginData: LoginInput!) {
    login(loginData: $loginData) {
      access_token
      user {
        email
        username
      }
    }
  }
`

export { LOGIN }