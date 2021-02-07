import { DataGrid } from '@material-ui/data-grid';
import { Button, Icon } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import RessourceEditionForm from "../RessourceEditionForm/RessourceEditionForm"
import Swal from 'sweetalert2'
import { useState } from 'react';

const useStyles = makeStyles({
  grid: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "19px",
    border: "none"
  },
  actionButton: {
    maxWidth: "40px",
    minWidth: "1px"
  }
})

const DatabaseViewer = ({rows, header, deleteCb, updateCb}) => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRessource, setSelectedRessource] = useState({})
  const [selectedRessourceType, setSelectedRessourceType] = useState({})

  return (
    <div style={{height: "100%"}}>
      <DataGrid
        className={classes.grid}
        pageSize={6}
        rows={rows.map((row, idx) => ({...row, id: idx}))}
        columns={
          [...header, {
              field: "",
              sortable: false,
              flex: 5,
              renderCell: (params) => {
                return (
                  <>
                    <Button className={classes.actionButton} color="secondary" onClick={() =>  {
                      console.log(params.row)
                      setSelectedRessource(params.row)
                      setSelectedRessourceType(params.row.__typename.toLowerCase())
                      setModalOpen(true)
                    }}>
                    <Icon aria-label="edit" color="secondary">
                      <EditIcon />
                    </Icon>
                    </Button>
                    <Button className={classes.actionButton} color="secondary" onClick={() =>  {
                      Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#f50057',
                        confirmButtonText: 'Yes, delete it!',
                        cancelButtonColor: '#3085d6',
                      }).then((result) => {
                        if (result.isConfirmed)
                          deleteCb(params.row._id)
                      })
                    }
                    }>
                    <Icon aria-label="delete" color="secondary">
                      <DeleteIcon />
                    </Icon>
                    </Button>
                  </>
                )
              }
            }
          ]
        }
      />
      <RessourceEditionForm
        open={modalOpen}
        setOpen={setModalOpen}
        toEditElemType={selectedRessourceType}
        values={selectedRessource}
        updateCb={(values) => {
          updateCb(values)
          setModalOpen(false)
        }}
      />
    </div>
  )
}

export default DatabaseViewer