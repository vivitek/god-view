import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Fab, makeStyles } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import DatabaseViewer from '../../components/DatabaseViewer/DatabseViewer'
import { GET_ROUTERS, DELETE_ROUTER } from "./queries/router"
import { GET_USERS, DELETE_USER } from "./queries/user"
import './Database.css'
import '../Page.css'
import RessourceCreationForm from '../../components/RessourceCreationForm/RessourceCreationForm';


const useStyles = makeStyles({
  fabBotLeft: {
    position: 'absolute',
    margin: 20,
    bottom: 0,
    left: 0
  }
})


const Database = () => {
  const classes = useStyles()

  const [modalOpen, setModalOpen] = useState(false)

  const [routers, setRouters] = useState([])
  const [users, setUsers] = useState([])

  const {loading: routerLoading, error: routerErr, data: routerData} = useQuery(GET_ROUTERS)
  const [deleteRouter] = useMutation(DELETE_ROUTER)

  const {loading: userLoading, error: userErr, data: userData} = useQuery(GET_USERS)
  const [deleteUser] = useMutation(DELETE_USER)

  const deleteRouterCb = (routerId) => {
    deleteRouter({variables: { id: routerId }})
    setRouters(routers.filter(router => router._id !== routerId))
  }

  const deleteUserCb = (userId) => {
    deleteUser({variables: { id: userId }})
    setUsers(users.filter(user => user._id !== userId))
  }

  useEffect(() => {
    if (routerData)
      setRouters(routerData.getRouters)
    if (userData)
      setUsers(userData.getUsers)
  }, [routerData, userData])



  return (
    <div className="page main">
      <div className="card">
        {routerLoading && <div>Loading...</div>}
        {routerErr && <div>Loading...</div>}
        {!routerErr && !routerLoading && <DatabaseViewer
          rows={routers}
          header={[
            {field: "_id", headerName: "Router ID", flex: 15},
            {field: "name", headerName: "Name", flex: 12},
            {field: "url", headerName: "URL", flex: 12}
          ]}
          deleteCb={deleteRouterCb}
        />}
      </div>
      <div className="card">
        {userLoading && <div>Loading...</div>}
        {userErr && <div>Loading...</div>}
        {!userErr && !userLoading && <DatabaseViewer
          rows={users}
          header={[
            {field: "_id", headerName: "User ID", flex: 15},
            {field: "username", headerName: "Userame", flex: 12},
            {field: "email", headerName: "Email", flex: 12}
          ]}
          deleteCb={deleteUserCb}
        />}
      </div>
      <div className="card">Cette div est là pour tester mon css</div>
      <div className="card">Cette div est là pour tester mon css</div>
      <div className="card">Cette div est là pour tester mon css</div>
      {/* Ressource creation button */}
      <Fab color="secondary"
        aria-label="add"
        className={classes.fabBotLeft}
        onClick={() => {setModalOpen(true)}}
      >
        <AddIcon />
      </Fab>
      {/* Ressource creation modal */}
      <RessourceCreationForm
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  )
}

export default Database
