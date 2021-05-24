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

const rows = [
  {status: "ok", rule: "PathPrefix(/api)", entrypoints: "traefik", name: "api@internal", service: "api@internal", provider: "Internal"},
  {status: "ok", rule: "PathPrefix(`/`)", entrypoints: "traefik", name: "dashboard@internal", service: "dashboard@internal", provider: "Internal"},
  {status: "ok", rule: "Host(`grafana.server.vincipit.com`)", entrypoints: "secureweb", name: "grafana@docker", service: "grafana", provider: "Docker"},
  {status: "ok", rule: "Host(`influxdb.server.vincipit.com`)", entrypoints: "secureweb", name: "influx-r@docker", service: "influx-svr", provider: "Docker"},
  {status: "ok", rule: "Host(`mongo-backend`)", entrypoints: "secureweb web", name: "mongo-backend@docker", service: "mongo-backend", provider: "Docker"},
  {status: "ok", rule: "hostregexp(`{host:.+}`)", entrypoints: "web", name: "redirs@docker", service: "traefik-backend", provider: "Docker"},
  {status: "ok", rule: "Host(`api.server.vincipit.com`)", entrypoints: "secureweb", name: "server-api@docker", service: "server-api-svc", provider: "Docker"},
  {status: "ok", rule: "Host(`dashboard.server.vincipit.com`)", entrypoints: "secureweb", name: "traefik@docker", service: "api@internal", provider: "Docker"}
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
              {rows.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell align="left" >{row.status}</TableCell>
                  <TableCell align="left" key={index}>{row.rule}</TableCell>
                  <TableCell align="left" key={index}>{row.entrypoints}</TableCell>
                  <TableCell align="left" key={index}>{row.name}</TableCell>
                  <TableCell align="left" key={index}>{row.service}</TableCell>
                  <TableCell align="left" key={index}>{row.provider}</TableCell>
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