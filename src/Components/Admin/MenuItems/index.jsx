import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AllUsers from "../User";
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';

export const mainListItems = (
  <div >
    <NavLink to={"/admin"} exact key={"canditates"} activeStyle={{
      fontWeight: "bold",
    }}>
      <ListItem button exact style={{}} >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText style={{color:'#FFF'}} >
          Candidates
          </ListItemText>
      </ListItem>
    </NavLink>

    
    <NavLink to={"/admin/addQuestionsExcel"}  exact key={"upload Question"} activeStyle={{
      fontWeight: "bold",
      // color: "red"
    }} >
      <ListItem button exact >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText style={{color:'#FFF'}}>
          Upload Question
        </ListItemText>
      </ListItem>
    </NavLink>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
