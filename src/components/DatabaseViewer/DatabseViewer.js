import { DataGrid } from '@material-ui/data-grid';
import { Button, Icon } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'

const useStyles = makeStyles({
  grid: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "19px",
    border: "none"
  }
})

const DatabaseViewer = ({rows, header, deleteCb}) => {
  const classes = useStyles()

  return (
    <DataGrid
      className={classes.grid}
      pageSize={6}
      rows={rows.map((row, idx) => ({...row, id: idx}))}
      columns={
        [...header, {
            field: "",
            sortable: false,
            flex: 4,
            renderCell: (params) => {
              return (
                <Button color="secondary" onClick={() =>  {
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
              )
            }
          }
        ]
      }
    />
  )
}

export default DatabaseViewer