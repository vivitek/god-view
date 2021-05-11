import React from 'react';
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

function createData(Service, Title, CodeCov, Travis) {
  return {Service, Title, CodeCov, Travis};
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
                {row.Service ? (
                  <div className="greenCircle"></div>
                ) : (
                  <div className="redCircle"></div>
                )} 
                <span>{row.Title}</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <img alt="travis" src={row.Travis}/>
                <img alt="codecov" src={row.CodeCov} />
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default Home