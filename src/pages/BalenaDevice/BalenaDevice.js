import './BalenaDevice.css'
import '../Page.css'
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_DEVICES } from './queries/device'
import BalenaDeviceCard from '../../components/BalenaDeviceCard/BalenaDeviceCard'
import { CircularProgress } from "@material-ui/core"


const BalenaDevices = () => {
  const [devices, setDevices] = useState([])
  const {loading, err, data } = useQuery(GET_DEVICES)

  useEffect(() => {
    if (data) {
      setDevices(data.getBalenaDevices)
    }
  }, [data])

  return (
    <div className="balenaDevice" style={{paddingTop: "20px"}}>
      {loading &&
        <div style={{
          height: "92vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {<CircularProgress size={100}/>}
        </div>
      }
      {err &&
        <div style={{
          height: "92vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <img alt="error" src="https://www.flaticon.com/svg/vstatic/svg/463/463612.svg?token=exp=1617383749~hmac=3cf44afd0d39b921c07e913d14ec82fe" />
        </div>
      }
      {devices && devices.map((device, i) => {
        return (
          <BalenaDeviceCard key={device.id} device={device}/>
        )
      })}
    </div>
  )
}

export default BalenaDevices
