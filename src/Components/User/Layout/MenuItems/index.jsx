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
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';



// import AllUsers from "../User";
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';

export const mainListItems = (
  <div >
    <NavLink to={"/employeeportal/:name"} exact key={"trivia"} activeStyle={{
      fontWeight: "bold",
    }}>
      <ListItem button exact  >
        <ListItemIcon>
        <DescriptionRoundedIcon sx={{ color: '#fff' }} />
        </ListItemIcon>
        <ListItemText style={{color:'#FFF'}} >
Trivia
          </ListItemText>
      </ListItem>
    </NavLink>
    <NavLink to={"/employeeportal/:name/weeklyzine"}  exact key={"weeklyzine"} activeStyle={{
      fontWeight: "bold",
      // color: "red"
    }} >
      <ListItem button exact >
        <ListItemIcon>

        < DateRangeOutlinedIcon sx={{ color: '#fff' }} />
        </ListItemIcon>
        <ListItemText style={{color:'#FFF'}}>


Weekly Zine
        </ListItemText>
      </ListItem>
    </NavLink>
    <NavLink to={"/employeeporal/:name/newsletters"}  exact key={"newsletters"} activeStyle={{
      fontWeight: "bold",
      // color: "red"
    }} >
      <ListItem button exact >
        <ListItemIcon>
        < ImportContactsIcon sx={{ color: '#fff' }} />

        </ListItemIcon>
        <ListItemText style={{color:'#FFF'}}>
Monthly NewsLetters
        </ListItemText>
      </ListItem>
    </NavLink>  
     <NavLink to={"/employeeporal/:name/companynews"}  exact key={"company news"}  >
      <ListItem button exact >
        <ListItemIcon>
        < LocationCityOutlinedIcon sx={{ color: '#fff' }} />
        </ListItemIcon>
        <ListItemText style={{color:'#FFF',textDecorationLine:'none'}}>
Company News
        </ListItemText>
      </ListItem>
    </NavLink>
  </div>
);
