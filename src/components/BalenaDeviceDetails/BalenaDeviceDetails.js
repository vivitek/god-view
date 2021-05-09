import { useMutation, useQuery } from "@apollo/client"
import { Card, CardContent, makeStyles, CircularProgress, Grid, Icon, Fab, Modal, Button, TextField } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { GET_DEVICE_BY_UUID, DELETE_ENV_VAR_BY_ID, CREATE_ENV_VAR } from "../../pages/BalenaDevice/queries/device"
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { MAPBOX_API_KEY } from "../../constant"
import "./BalenaDeviceDetails.css"
import * as moment from "moment"
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AddIcon from "@material-ui/icons/Add"
import SaveIcon from '@material-ui/icons/Save';
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import { Formik, Form, Field } from "formik"

const Map = ReactMapboxGl({
  accessToken: MAPBOX_API_KEY
});

const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "92vh",
    display: "flex",
  },
  loading: {
    height: "92vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "50%"
  },
  card: {
    display: "flex",
    height: "100%",
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
  },
  flexRow : {
    display: 'flex',
    justifyContent: "space-between"
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  },
  fabTopRight: {
    position: "absolute",
    right: "0",
    top: "0",
    margin: "10px"
  },
  modal: {
    backgroundColor: "white",
    border: "none",
    position: "absolute",
    width: "40%",
    height: "30%",
    top: "35%",
    left: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"

  }
})

const InfoDisplay = ({title, value, size, displayCopyBtn = false, targetedLength}) => {
  const classes = useStyles()
  return (
    <Grid item xs={size}>
      <div className={classes.flexColumn}>
        <span style={{fontWeight: "bolder"}}>{title}</span>
        <div style={{display: "flex", alignItems: "center", alignSelf: "center"}}>
          <span> {
            targetedLength
              ? value.substring(0, targetedLength).concat('...')
              : value
          } </span>
          {displayCopyBtn && <Icon
            style={{marginLeft: "5px", height: "16px", width: "16px", cursor: "pointer"}}
            component={FileCopyOutlinedIcon}
            onClick={() =>  navigator.clipboard.writeText(value)}
          />}
        </div>
      </div>
    </Grid>
  )
}

const BalenaDeviceDetails = () => {
  const classes = useStyles()
  const { uuid } = useParams()
  const [device, setDevice] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {loading, err, data, refetch} = useQuery(GET_DEVICE_BY_UUID, {variables: {uuid}})
  const [deleteEnvVar] = useMutation(DELETE_ENV_VAR_BY_ID)
  const [createEnvVar] = useMutation(CREATE_ENV_VAR)

  useEffect(() => {
    if (data)
      setDevice(data.getBalenaDeviceByUuid)
  }, [data])

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

    return { color }
  }

  return (
    <>
      {loading &&
        <div className={classes.loading} >
          {<CircularProgress size={100}/>}
        </div>
      }
      {err &&
        <div className={classes.loading}>
          <img alt="error" src="https://www.flaticon.com/svg/vstatic/svg/463/463612.svg?token=exp=1617383749~hmac=3cf44afd0d39b921c07e913d14ec82fe" />
        </div>
        }
      {device &&
        <div className={classes.container}>
          <div className={classes.column}>
            <Card className={classes.bigCard}>
              <CardContent className={[classes.card, classes.flexColumn].join(' ')}>
                <div style={{width: "100%", height: "30%", borderBottom: "1px solid white", display: "flex", flexDirection: 'column', textAlign: "left", fontSize: "large"}}>
                  <div className={classes.smallCard} style={{margin: "0", textAlign: 'center', fontSize: "larger", fontWeight: "bold", textTransform: "uppercase"}}>
                    {device.device_name}
                  </div>
                  <div style={{height: "70%", width: "95%", display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "center", alignSelf: "center"}}>
                    <InfoDisplay title={"Is online"} value={device.is_online ? "Online" : "Offline"}/>
                    <InfoDisplay title={"Uuid"} value={device.uuid} displayCopyBtn={true} targetedLength={10}/>
                    <InfoDisplay title={"Id"} value={device.id} displayCopyBtn={true}/>
                  </div>
                </div>
                <div style={{width: "100%", height: "60%", margin: "10px", display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <div className={classes.flexColumn}>
                        <span style={{fontWeight: "bold"}}>Mac addresses</span>
                        {device.mac_address.split(' ').map((addr, idx) => (
                          <div style={{display: "flex", alignItems: "center", alignSelf: "center"}}>
                            <span key={idx}>{addr}</span>
                            <Icon
                              style={{marginLeft: "5px", height: "16px", width: "16px", cursor: "pointer"}}
                              component={FileCopyOutlinedIcon}
                              onClick={() =>  navigator.clipboard.writeText(addr)}
                            />
                          </div>
                        ))}
                      </div>
                    </Grid>
                    <InfoDisplay title={"VPN address"} value={device.vpn_address || "Offline"} size={4} displayCopyBtn={device.vpn_address ? true : false}/>
                    <InfoDisplay title={"Public address"} value={device.public_address} size={4}  displayCopyBtn={true}/>
                  </Grid>
                  <Grid container spacing={2}>
                    <InfoDisplay title={"Os version"} value={device.os_version} size={4}  displayCopyBtn={true}/>
                    <InfoDisplay title={"Os variant"} value={device.os_variant} size={4}/>
                    <InfoDisplay title={"Web accessible"} value={device.is_web_accessible ? "true" : "false"} size={4}/>
                  </Grid>
                  <Grid container spacing={2}>
                    <InfoDisplay title={"Last seen"} value={moment(device.last_connectivity_event).format('DD/MM/YYYY HH:mm')} size={6}/>
                    <InfoDisplay title={"Created at"} value={moment(device.created_at).format('DD/MM/YYY HH:mm')} size={6}/>
                  </Grid>
                </div>
              </CardContent>
            </Card>
            <Card className={classes.smallCard}>
              <CardContent className={classes.card} style={{flexDirection: "column", position: "relative"}}>
                <div style={{fontSize: "larger", height: "15%"}}> Environment variable </div>
                <Fab
                  color="primary"
                  aria-label="add"
                  size="small"
                  className={classes.fabTopRight}
                  onClick={() => setIsModalOpen(true)}
                >
                  <AddIcon />
                </Fab>
                <div className="envVar" style={{width: "95%", height: "75%", overflowY: "scroll", overflowX: "hidden"}}>
                  <Grid container spacing={2}>
                    {device.env.map((e, idx) => (
                      <>
                        <Grid item xs={5} style={{textAlign: "left", textTransform: "uppercase"}}> {e.name} </Grid>
                        <Grid item xs={5} style={{textAlign: "left"}}> {e.value.length <= 40 ? e.value : e.value.substring(0, 40).concat('...')} </Grid>
                        <Grid item xs={2}>
                          <Icon
                            style={{marginLeft: "5px", height: "16px", width: "16px", cursor: "pointer"}}
                            component={DeleteOutlineOutlinedIcon}
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: '#f50057',
                                confirmButtonText: 'Yes, delete it!',
                                cancelButtonColor: '#3085d6',
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteEnvVar({variables: {id: e.id.toString()}}).then(async res => {
                                    if (res.data.delEnvVarOnBalenaDevice === "OK") {
                                      await refetch()
                                      toast("It's alright", {
                                        type: "success",
                                        position: toast.POSITION.BOTTOM_RIGHT,
                                        style: {
                                          backgroundColor: "#3fb53f"
                                        }
                                      });
                                    } else
                                      toast("An error occured", {
                                        type: "error",
                                        position: toast.POSITION.BOTTOM_RIGHT,
                                        style: {
                                          backgroundColor: "#b53f3f"
                                        }
                                      });
                                  })
                                }
                              })
                            }}
                          />
                          <Icon
                            style={{marginLeft: "5px", height: "16px", width: "16px", cursor: "pointer"}}
                            component={FileCopyOutlinedIcon}
                            onClick={() => navigator.clipboard.writeText(`${e.name.toUpperCase()}=${e.value}`)}
                          />
                        </Grid>
                      </>
                    ))}
                  </Grid>
                </div>
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
    <Modal
      open={isModalOpen}
      onBackdropClick={() => setIsModalOpen(false)}
    >
      <div className={classes.modal}>
        <div style={{fontSize: "x-large", marginTop: "-10px"}}> Add an environment varible </div>
        <div>
          <Formik
            initialValues={{key: "", value: ""}}
            onSubmit={(values) => {
              createEnvVar({variables: {
                key: values.key.trim().toUpperCase().replace(/[ -]/g, "_"),
                value: values.value.trim(),
                uuid: device.uuid
              }}).then(async res => {
                setIsModalOpen(false)
                await refetch()
                if (res.data.setEnvVarOnBalenaDevice.id) {
                  toast("It's alright", {
                    type: "success",
                    position: toast.POSITION.BOTTOM_RIGHT,
                    style: {
                      backgroundColor: "#3fb53f"
                    }
                  })
                } else
                  toast("An error occured", {
                    type: "error",
                    position: toast.POSITION.BOTTOM_RIGHT,
                    style: {
                      backgroundColor: "#b53f3f"
                    }
                  });
              })
            }}
          >
            <Form style={{display: "flex", flexDirection: "column"}}>
              <div style={{display: "flex", marginBottom: "35px"}}>
                <Field
                  id="key"
                  name="key"
                  label="Name"
                  variant="outlined"
                  style={{marginRight: "4%"}}
                  as={TextField}
                />
                <Field
                  id="value"
                  name="value"
                  label="Value"
                  variant="outlined"
                  as={TextField}
                />
              </div>
              <div style={{display: "flex", justifyContent: "flex-end"}}>
                <Button
                  variant="outlined"
                  style={{margin: "10px"}}
                  onClick={() => {setIsModalOpen(false)}}
                > Cancel </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  style={{margin: "10px"}}
                  type="submit"
                > Submit </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Modal>
    </>
  )
}

export default BalenaDeviceDetails
