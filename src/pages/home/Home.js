import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Home.css'

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
}));

function Home() {
  const classes = useStyles();
  const [xana, setXana] = useState(null);
  const [serv, setServ] = useState(null);
  const [app, setApp] = useState(null);

  useEffect(() => {
    fetch("https://api.server.vincipit.com/")
      .then(
        (serv) => {
          setServ(serv);
        }
      )
    fetch("https://dashboard.vincipit.com/")
      .then(
        (app) => {
          setApp(app);
        }
      )  
    fetch("https://api.xana.vincipit.com/")
      .then(
        (xana) => {
          setXana(xana);
        }
      )
    
  }, [])

  return (
    <div className="homePage">
      <div className={classes.root}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              {serv ? (
                <div className="cercleG"></div>
              ) : (
                <div className="cercleR"></div>
              )} 
              <span className="title">Backend</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <img src={"https://api.travis-ci.com/vivitek/backend.svg?branch=master"}/>
              <img src={"https://codecov.io/gh/vivitek/backend/branch/master/graph/badge.svg"} />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>
            {app ? (
                <div className="cercleG"></div>
              ) : (
                <div className="cercleR"></div>
              )} 
              <span className="title">Dashboard</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <img src={"https://api.travis-ci.com/vivitek/dashboard.svg?branch=master"}/>
              <img src={"https://codecov.io/gh/vivitek/dashboard/branch/master/graph/badge.svg"}/>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>
            {xana ? (
                <div className="cercleG"></div>
              ) : (
                <div className="cercleR"></div>
              )} 
              <span className="title">API Xana Serve</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <img src={"https://api.travis-ci.com/vivitek/god-view.svg?branch=master"}/>
              <img src={"https://codecov.io/gh/vivitek/god-view/branch/master/graph/badge.svg"}/>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>
              <div className="cercleGr"></div>
              <span className="title">Box</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <img src={"https://api.travis-ci.com/vivitek/box.svg?branch=master"}/>
              <img src={"https://codecov.io/gh/vivitek/box/branch/master/graph/badge.svg"}/>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default Home