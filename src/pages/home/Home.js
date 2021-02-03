import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
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
              <div id="cercle"></div>
              <span className="title">API Vivi Serve</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Button variant="contained">Restart</Button>
              <span>Etat</span>
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
              <div id="cercle"></div>
              <span className="title">Monitoring APP</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Button variant="contained">Restart</Button>
              <span>Etat</span>
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
              <div id="cercle"></div>
              <span className="title">API Xana Serve</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Button variant="contained">Restart</Button>
              <span>Etat</span>
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
              <div id="cercle"></div>
              <span className="title">Balena OS</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Button variant="contained">Restart</Button>
              <span>Etat</span>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default Home