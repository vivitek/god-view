import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Accordion, AccordionSummary, AccordionDetails, Typography}  from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

const rows = [
  {service: "1", title: "Serveur", codeCov: "https://codecov.io/gh/vivitek/backend/branch/master/graph/badge.svg", travis: "https://api.travis-ci.com/vivitek/backend.svg?branch=master"},
  {service: "1", title: "Interface Utilisateur", codeCov: "https://codecov.io/gh/vivitek/dashboard/branch/master/graph/badge.svg", travis: "https://codecov.io/gh/vivitek/dashboard/branch/master/graph/badge.svg"},
  {service: "1", title: "Xana", codeCov: "https://codecov.io/gh/vivitek/god-view/branch/master/graph/badge.svg", travis: "https://api.travis-ci.com/vivitek/god-view.svg?branch=master"},
  {service: "null", title: "Box", codeCov: "https://codecov.io/gh/vivitek/box/branch/master/graph/badge.svg", travis: "https://api.travis-ci.com/vivitek/box.svg?branch=master"},
];

function Home() {
  const classes = useStyles();

  return (
    <div className="homePage">
      <div className={classes.root}>
        {rows.map((row, index) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading} key={index}>
                {row.service ? (
                  <div className={classes.greenCircle}></div>
                ) : (
                  <div className={classes.redCircle}></div>
                )} 
                <span key={index}>{row.title}</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <img key={index} alt={"travis " + row.title + " project compil"} src={row.travis}/>
                <img key={index} alt={"codecov " + row.title + " code test"} src={row.codeCov} />
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default Home