import { useState } from "react"
import { makeStyles, MenuItem, Modal, Select, Fab } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
import { RouterForm, UserForm } from "../../pages/database/form"

const useStyles = makeStyles({
  modal: {
    position: 'absolute',
    width: "50%",
    height: "60%",
    top: "20%",
    left: "25%",
    border: "none",
    backgroundColor: "white",
    borderRadius: "20px",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "19px",
  },
  fabTopRight: {
    position: "absolute",
    margin: 20,
    top: 0,
    right: 0
  },
  select: {
    width: "80%",
    textAlign: "left"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%"
  },
  formField: {
    width: "20vw",
    marginBottom: "30px",
  },
  formBtn: {
    position: "absolute",
    bottom: "20%",
    height: "5vh",
    width: "20vw"
  }
})

const RessourceCreationForm = ({modalOpen, setModalOpen}) => {
  const classes = useStyles()

  const [newElement, setNewElement] = useState("router")

  return (
    <Modal
      style={{border: "none"}}
      open={modalOpen}
      onBackdropClick={() => {setModalOpen(false)}}
    >
      <div className={classes.modal}>
        <span className="modal-title">
          Create new ressource
          <Fab size="small"
            aria-label="close"
            className={classes.fabTopRight}
            onClick={() => {setModalOpen(false)}}
          >
            <CloseIcon />
          </Fab>
        </span>
        <div className="modal-body">
          <div className="modal-left">
            <Select
              className={classes.select}
              onChange={(e) => setNewElement(e.target.value) }
              defaultValue="router"
            >
              <MenuItem value="router">router</MenuItem>
              <MenuItem value="user">user</MenuItem>
            </Select>
          </div>
          <div className="modal-right">
            {newElement === "router" &&
              <RouterForm
                formClass={classes.form}
                fieldClass={classes.formField}
                btnClass={classes.formBtn}
              />
            }
            {newElement === "user" &&
              <UserForm
                formClass={classes.form}
                fieldClass={classes.formField}
                btnClass={classes.formBtn}
              />
            }
          </div>
        </div>
      </div>
    </Modal>
  )

}

export default RessourceCreationForm