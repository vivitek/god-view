import { gql } from "@apollo/client"

const GET_DEVICES = gql`
  query {
    getBalenaDevices {
      device_name
      is_online
      last_connectivity_event
      uuid
      id
      os_variant
      os_version
      location
      ip_address
      mac_address
    }
  }
`

const GET_DEVICE_BY_UUID = gql`
  query($uuid: String!) {
    getBalenaDeviceByUuid(uuid: $uuid) {
      id
      device_name
      uuid
      is_online
      is_connected_to_vpn
      last_connectivity_event
      ip_address
      mac_address
      vpn_address
      public_address
      os_version
      os_variant
      is_web_accessible
      longitude
      latitude
      location
      created_at
      memory_usage
      memory_total
      storage_usage
      storage_total
      cpu_temp
      cpu_usage
      env {
        id
        name
        value
      }
    }
  }
`

const GET_ENV_VAR = gql`
  query($id: String!) {
    getEnvVarByDeviceId(id: $id) {
      id
      name
      value
    }
  }
`

export {
  GET_DEVICES,
  GET_DEVICE_BY_UUID,
  GET_ENV_VAR
}