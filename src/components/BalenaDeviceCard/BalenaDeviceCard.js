import * as moment from "moment"
import { useHistory } from "react-router-dom"
import {
  Card,
  CardContent,
  Typography,
  Chip,
  makeStyles
} from "@material-ui/core"

const useStyles = makeStyles({
  card: {
    width: "30%",
    height: "40%",
    margin: "10px 10px 20px 10px",
    cursor: "pointer",
    minWidth: "350px",
    backgroundColor: "#343332",
    color: "white"
  },
  field: {
    display: "flex",
    marginBottom: '5px'
  },
  left: {
    width: '33%',
    fontWeight: "bold",
    fontSize: '18px',
    textAlign: "left"
  },
  right: {
    width: '67%',
    fontSize: "18px",
    textAlign: "left"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  circle: {
    display: "flex",
    height: "25px",
    width: "25px",
    borderRadius: "50%",
    fontSize: "15px",
    color: "white"
  },
  osVariant: {
    borderRadius: "25%",
    backgroundColor: "#3F51B5",
    color: "white",
    padding: "0px 20px",
    fontSize: "15px"
  },
  location: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    fontSize: "16px"
  }
})


const BalenaDeviceCard = ({device}) => {
  const history = useHistory()
  const classes = useStyles()
  return (
    <Card className={classes.card} onClick={() => history.push(`/balena/${device.uuid}`)}>
      <CardContent style={{height: "calc(100% - 40px)", position: "relative"}}>
        <Typography
          variant="h5"
          className={classes.title}
        >
          <Chip
            label={device.is_online ? "Online" : "Offline"}
            className={classes.cicle}
            style={{
              backgroundColor: device.is_online ? "#7dc176" : "#ea5858",
            }}
          />
          {device.device_name}
          <Chip
            label={device.os_variant}
            style={{
              backgroundColor: device.os_variant === "prod" ? "#FFDA93" : "#F1CDFF"
            }}
          />
        </Typography>
        <Typography className={classes.field}>
          <span className={classes.left}> Id </span>
          <span className={classes.right}> {device.id} </span>
        </Typography>
        <Typography className={classes.field}>
          <span className={classes.left}> Last seen </span>
          <span className={classes.right}> {moment(device.last_connectivity_event).format("DD/MM/YYYY HH:mm")} </span>
        </Typography>
        <Typography className={classes.field}>
          <span className={classes.left}> Os version </span>
          <span className={classes.right}> {device.os_version} </span>
        </Typography>
        <Typography className={classes.field}>
          <span className={classes.left}> Mac addr </span>
          <span className={classes.right}> {device.mac_address} </span>
        </Typography>
        <Typography className={classes.field}>
          <span className={classes.left}> Uuid </span>
          <span className={classes.right}> {device.uuid} </span>
        </Typography>
        <span className={classes.location}> {device.location} </span>
      </CardContent>
    </Card>
  )
}

export default BalenaDeviceCard