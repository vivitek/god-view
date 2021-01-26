import './Database.css'
import '../Page.css'
import { GET_ROUTERS } from "./queries/router"
import { useQuery } from '@apollo/client'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
} from "@material-ui/core"

const Database = () => {
  const {loading, error, data} = useQuery(GET_ROUTERS)

  if (loading) return <div className="page"> Loading...</div>
  if (error) return <div className="page"> Error, please contact Matteo</div>

  return (
    <div className="page main">
      <div className="card">
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>name</TableCell>
                <TableCell>url</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.getRouters.map(router => {
                  return (
                    <TableRow key={router.id}>
                      <TableCell>{router._id}</TableCell>
                      <TableCell>{router.name}</TableCell>
                      <TableCell>{router.url}</TableCell>
                    </TableRow>
                  )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="card">user</div>
      <div className="card">config</div>
      <div className="card">ban</div>
      {
        console.log(data.getRouters)
      }
    </div>
  )
}

export default Database