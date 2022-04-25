import React from "react";
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import myLogo from "../../myLogo.png"
import List from '@material-ui/core/List';
import { mainListItems } from "../MenuItems";
import Trivia from "../index"
import CompanyNews from "../CompanyNews";
import weeklyZine from "../weeklyZine";
import NewsLetter from "../newsLetter";
import { Route, Switch, useHistory,Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../../Store/store"
export default function drawer(){

    return(
        <Drawer
        variant='permanent'
        // open={this.state.drawer}
        ModalProps={{
            keepMounted: true, // Better open performance on mobile.
        }}
        color='1D7B84' >
        <div style={{ backgroundColor: '#1D7B84', height: '100%', }}  >
            <div className={classes.toolbarIcon} style={{ backgroundColor: '#283741', height: '10%', display: 'flex', justifySelf: 'center', justifyContent: 'center' }}>
                <img src={myLogo} alt="Absyz.logo" width="80" height="40" style={{ alignSelf: 'center', display: 'flex' }} />
            </div>
         <List>
             {mainListItems}
         </List>

        </div>
           <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* <Route path="/admin/login" exact={true} component={SignIn} /> */}
        <Route path="/employeeporal/:name"  component={Trivia} />
        <Route path="/employeeporal/:name/newsletters" exact={true} component={NewsLetter} />
        <Route path="/employeeporal/:name/weeklyzine" exact={true} component={weeklyZine} />
        <Route path="/employeeporal/:name/companynews" exact={true} component={CompanyNews} />
      </main>
    </Drawer>
    )
}



const classes = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));
const drawerWidth = 240;
const mobileDrawerWidth = 100;