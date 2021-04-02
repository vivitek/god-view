import { useQuery } from "@apollo/client"
import {Card, CardContent, makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { GET_DEVICE_BY_UUID, GET_ENV_VAR } from "../../pages/BalenaDevice/queries/device"
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { MAPBOX_API_KEY } from "../../constant"
import "./BalenaDeviceDetails.css"

const Map = ReactMapboxGl({
  accessToken: MAPBOX_API_KEY
});

const useStyles = makeStyles({
  container: {
    width: "calc(100% - 20px)",
    height: "calc(92vh - 20px)",
    display: "flex",
    padding: "10px"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "50%"
  },
  card: {
    display: "flex",
    height: "calc(100% - 40px)",
    alignItems: "center",
    backgroundColor: "#343332",
    color: "white"
  },
  bigCard: {
    margin: "10px",
    height: "60%"
  },
  smallCard: {
    margin: "10px",
    height: "40%"
  }
})

const BalenaDeviceDetails = () => {
  const classes = useStyles()
  const { uuid } = useParams()
  const [device, setDevice] = useState()
  const {loading: loadDevice, err: errDevice, data: dataDevice} = useQuery(GET_DEVICE_BY_UUID, {variables: {uuid}})

  useEffect(() => {
    if (dataDevice)
      setDevice(dataDevice.getBalenaDeviceByUuid)
  }, [dataDevice])

  const getChartStyle = (current, max) => {
    const percentage = current * 100 / max
    let color
    if (percentage <= 40)
      color = "#7dc176"
    else if (percentage <= 75)
      color = "#ffda93"
    else
      color = "#ea5858"
    return {
      "--percentage": percentage,
      "--fill": color
    }
  }

  const getCpuTempStyle = () => {
    const temp = Number(device.cpu_temp)
    let color
    if (temp <= 65)
      color = "#7dc176"
    else if (temp <= 80)
      color = "#ffda93"
    else
      color = "#ea5858"

    return {
      color,
    }
  }

  return (
    <>
      {loadDevice && <div>Loading...</div>}
      {errDevice && <div>An error occured, please fix me</div>}
      {device &&
        <div className={classes.container}>
          <div className={classes.column}>
            <Card className={classes.bigCard}>
              <CardContent>
                info
              </CardContent>
            </Card>
            <Card className={classes.smallCard}>
              <CardContent className={classes.card}>
                {loadEnvVar && <div>Loading</div>}
                {errEnvVar && <div>An error occured, please fix me</div>}
                  env var
              </CardContent>
            </Card>
          </div>
          <div className={classes.column}>
            <Card className={classes.smallCard}>
              <CardContent className={classes.card} style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                  <div className="title" style={{fontSize: "20px"}}>
                    CPU temperature :
                    <span style={getCpuTempStyle()}>{` ${device.cpu_temp}°C`} </span>
                  </div>
                  <div style={{display: "flex"}}>
                    <div>
                      <div className="semi-donut" style={getChartStyle(device.cpu_usage, 100)}>
                        <span> {`${Math.trunc(device.cpu_usage)} %`} </span>
                      </div>
                      <span className="title"> CPU </span>
                    </div>
                    <div>
                      <div className="semi-donut" style={getChartStyle(device.memory_usage, device.memory_total)}>
                        <span> {`${Math.trunc(device.memory_usage * 100 / device.memory_total)} %`} </span>
                      </div>
                      <span className="title"> Memory </span>
                    </div>
                    <div>
                      <div className="semi-donut" style={getChartStyle(device.storage_usage, device.storage_total)}>
                        <span> {`${Math.trunc(device.storage_usage * 100 / device.storage_total)} %`} </span>
                      </div>
                      <span className="title"> Storage </span>
                    </div>
                  </div>
              </CardContent>
            </Card>
            <Card className={classes.bigCard}>
              <Map
                style={`mapbox://styles/mapbox/dark-v10`}
                containerStyle={{
                  height: '100%',
                  width: '100%'
                }}
                zoom={[12]}
                center={[device.longitude, device.latitude]}
              >
                <Marker coordinates={[device.longitude, device.latitude]} anchor="bottom">
                  <img src="/marker.png" alt="marker" style={{width: "32px", height: "32px"}}/>
                </Marker>
              </Map>
            </Card>
          </div>
        </div>
      }
    </>
  )
}

export default BalenaDeviceDetails