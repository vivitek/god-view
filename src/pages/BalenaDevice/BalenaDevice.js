import './BalenaDevice.css'
import '../Page.css'
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_DEVICES } from './queries/device'
import BalenaDeviceCard from '../../components/BalenaDeviceCard/BalenaDeviceCard'


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
      {loading && <div>Loading...</div>}
      {err && <div>An error occured, please fix me</div>}
      {devices && devices.map((device, i) => {
        return (
          <BalenaDeviceCard key={device.id} device={device}/>
        )
      })}
    </div>
  )
}

export default BalenaDevices
