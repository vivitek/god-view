import './Database.css'
import '../Page.css'
import { GET_ROUTERS } from "./queries/router"
import { GET_USERS } from "./queries/user"
import { useQuery } from '@apollo/client'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  grid: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "19px",
    border: "none"
  }
})

const Database = () => {
  const classes = useStyles()

  const {loading: routerLoading, error: routerErr, data: routerData} = useQuery(GET_ROUTERS)
  const {loading: userLoading, error: userErr, data: userData} = useQuery(GET_USERS)

  return (
    <div className="page main">
      <div className="card">
        {routerLoading && <div>Loading...</div>}
        {routerErr && <div>An error occured...</div>}
        <DataGrid
          className={classes.grid}
          pageSize={6}
          rows={routerData ? routerData.getRouters.map((router, idx) => ({...router, id: idx})) : []}
          columns={
            [
              {field: "_id", headerName: "Router ID", flex: 18},
              {field: "name", headerName: "Name", flex: 11},
              {field: "url", headerName: "URL", flex: 19}
            ]
          }
        />
      </div>
      <div className="card">
        {userLoading && <div>Loading...</div>}
        {userErr && <div>An error occured...</div>}
        <DataGrid
          className={classes.grid}
          pageSize={6}
          rows={userData ? userData.getUsers.map((user, idx) => ({...user, id: idx})) : []}
          columns={
            [
              {field: "_id", headerName: "User ID", flex: 18},
              {field: "email", headerName: "Email", flex: 18},
              {field: "username", headerName: "Username", flex: 11},
            ]
          }
        />
      </div>
      <div className="card">config</div>
      <div className="card">ban</div>
    </div>
  )
}

export default Database