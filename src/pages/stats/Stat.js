import React, { useState, useEffect } from 'react';
import './Stat.css'
import '../Page.css'
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: 600,
  },
  root: {
    width: '98%',
    margin: '1%',
  },
});

function createData(Status, Rule, Entrypoints, Name, Service, Provider) {
  return {Status, Rule, Entrypoints, Name, Service, Provider};
}

const rows = [
  createData('ok', 'PathPrefix(/api)', 'traefik', 'api@internal', 'api@internal', 'Internal'),
  createData('ok', 'PathPrefix(`/`)', 'traefik', 'dashboard@internal', 'dashboard@internal', 'Internal'),
  createData('ok', 'Host(`grafana.server.vincipit.com`)', 'secureweb', 'grafana@docker', 'grafana', 'Docker'),
  createData('ok', 'Host(`influxdb.server.vincipit.com`)', 'secureweb', 'influx-r@docker', 'influx-svr', 'Docker'),
  createData('ok', 'Host(`mongo-backend`)', 'secureweb web', 'mongo-backend@docker', 'mongo-backend', 'Docker'),
  createData('ok', 'hostregexp(`{host:.+}`)', 'web', 'redirs@docker', 'traefik-backend', 'Docker'),
  createData('ok', 'Host(`api.server.vincipit.com`)', 'secureweb', 'server-api@docker', 'server-api-svc', 'Docker'),
  createData('ok', 'Host(`dashboard.server.vincipit.com`)', 'secureweb', 'traefik@docker', 'api@internal', 'Docker'),
];

function Stat() {
  const classes = useStyles();
  const [service, setService] = useState([]);

  useEffect(() => {
    fetch("http://dashboard.docker.localhost/api/http/routers")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setService(result.service);
        }
      )
  }, [])

  return (
    <div className="homePage">
      <div className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.header}>
                <TableCell align="left" size="medium">Status</TableCell>
                <TableCell align="left" size="medium">Rule</TableCell>
                <TableCell align="left" size="medium">Entrypoints</TableCell>
                <TableCell align="left" size="medium">Name</TableCell>
                <TableCell align="left" size="medium">Service</TableCell>
                <TableCell align="left" size="medium">Provider</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="left">{row.Status}</TableCell>
                  <TableCell align="left">{row.Rule}</TableCell>
                  <TableCell align="left">{row.Entrypoints}</TableCell>
                  <TableCell align="left">{row.Name}</TableCell>
                  <TableCell align="left">{row.Service}</TableCell>
                  <TableCell align="left">{row.Provider}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default Stat