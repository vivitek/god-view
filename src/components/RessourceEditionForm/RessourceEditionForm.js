import { makeStyles, Modal, Fab } from "@material-ui/core"
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

const RessourceEditionForm = ({open, setOpen, toEditElemType, values, updateCb}) => {
  const classes = useStyles()


  return (
    <Modal
      style={{border: "none"}}
      open={open}
      onBackdropClick={() => {setOpen(false)}}
    >
      <div className={classes.modal}>
        <span className="modal-title">
          Edit ressource
          <Fab size="small"
            aria-label="close"
            className={classes.fabTopRight}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </Fab>
        </span>
        <div className="modal-body">
          {toEditElemType === "router" &&
            <RouterForm
              formClass={classes.form}
              fieldClass={classes.formField}
              btnClass={classes.formBtn}
              defaultValues={values}
              callback={updateCb}
            />
          }
          {toEditElemType === "user" &&
            <UserForm
              formClass={classes.form}
              fieldClass={classes.formField}
              btnClass={classes.formBtn}
              defaultValues={values}
              callback={updateCb}
            />
          }
        </div>
      </div>
    </Modal>
  )

}

export default RessourceEditionForm