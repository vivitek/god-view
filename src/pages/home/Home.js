import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Accordion, AccordionSummary, AccordionDetails, Typography, ExpandMoreIcon}  from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '98%',
    margin: '1%',
  },
  heading: {
    display: "flex",
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  greenCircle: {
    width: "20px",
    height: "20px",
    borderRadius: "20px",
    background: "green",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  redCircle: {
    width: "20px",
    height: "20px",
    borderRadius: "20px",
    background: "red",
    paddingLeft: "5px",
    paddingRight: "5px",
  }
}));

function createData(service, title, codeCov, travis) {
  return {service, title, codeCov, travis};
}

const rows = [
  createData(1, 'Serveur', 'https://codecov.io/gh/vivitek/backend/branch/master/graph/badge.svg', 'https://api.travis-ci.com/vivitek/backend.svg?branch=master'),
  createData(1, 'Interface Utilisateur', 'https://codecov.io/gh/vivitek/dashboard/branch/master/graph/badge.svg', 'https://api.travis-ci.com/vivitek/dashboard.svg?branch=master'),
  createData(1, 'Xana', 'https://codecov.io/gh/vivitek/god-view/branch/master/graph/badge.svg', 'https://api.travis-ci.com/vivitek/god-view.svg?branch=master'),
  createData(null, 'Box', 'https://codecov.io/gh/vivitek/box/branch/master/graph/badge.svg', 'https://api.travis-ci.com/vivitek/box.svg?branch=master'),
];

function Home() {
  const classes = useStyles();

  return (
    <div className="homePage">
      <div className={classes.root}>
        {rows.map((row) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                {row.service ? (
                  <div className={classes.greenCircle}></div>
                ) : (
                  <div className={classes.redCircle}></div>
                )} 
                <span>{row.title}</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <img alt="travis project compil" src={row.travis}/>
                <img alt="codecov code test" src={row.codeCov} />
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default Home