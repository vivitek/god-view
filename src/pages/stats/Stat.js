import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import '../Page.css'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
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

  return (
    <div className="homePage">
      <div className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Rule</TableCell>
                <TableCell align="left">Entrypoints</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Service</TableCell>
                <TableCell align="left">Provider</TableCell>
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