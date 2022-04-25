import {React, useState} from "react"
import windowSize from 'react-window-size';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import myLogo from "../myLogo.png"
import AppBar from '@mui/material/AppBar';
import IconButton from '@material-ui/core/IconButton';
 function AppBarQuestionView(props){
    const [mobileDrawer,setMobileDrawer]=useState(false)
   const handleDrawer =()=> {
        setMobileDrawer(!mobileDrawer)
        // this.setState({ mobiledrawer: !this.state.mobiledrawer })
    }
    console.log(props.windowWidth)
    return(
        <div>
       
        </div>
    )
}
export default windowSize(AppBarQuestionView)


export function AppBarResultsView(){
    const [mobileDrawer,setMobileDrawer]=useState(false)
   const handleDrawer =()=> {
        setMobileDrawer(!mobileDrawer)
    }
    return(
        <div>
    {windowSize(AppBarQuestionView)  > 770 ?
        <div style={myStyles.desktopAppBarDiv} >
            <p  style={myStyles.desktopAppBarText}>ABSYZ Lounge Trivia Results</p>
        </div>
        :
        <div>
            <AppBar position="static"
                style={{ backgroundColor: '#283741', }}
                sx={myStyles.mobileAppBarSx}
            >
                <Toolbar variant="dense" sx={{ position: 'absolute', left: 0 }} >
                    <IconButton
                        onClick={handleDrawer}
                        edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon style={{ color: 'white' }} />
                    </IconButton>
                </Toolbar>
                <img src={myLogo} alt="Absyz.logo" width="80" height="40" style={{ alignSelf: 'center', marginBottom: '2%' }} />

            </AppBar>
            <div style={myStyles.mobileAppBarDiv}>
                <p    style={myStyles.mobileAppBarText}
                >ABSYZ Lounge Trivia Results</p>
            </div>
        </div>
    }
    </div>
    )
} 

const myStyles = {
    // { width: '100%', height: '100%', backgroundColor: '#fff', display: 'flex', justifySelf: 'center', justifyContent: 'center' }
    // { alignContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', width: '100%' }
    // { fontSize: 22, fontFamily: 'Source Sans Pro', fontWeight: '600', color: '#33494E', paddingTop: '1%', alignSelf: 'center', display: 'flex', marginLeft: '20%' }
    // { width: '100%', height: '9.5%', position: 'fixed', backgroundColor: '#fff', display: 'flex', justifySelf: 'center', justifyContent: 'center' }
    desktopAppBarDiv: {
        width: '100%',
        position: 'fixed',
        top: 0,
        zIndex: 1,
        height: '9.5%',
        backgroundColor: '#fff',
        display: 'flex',
        justifySelf: 'center',
        justifyContent: 'center'
    },
    desktopAppBarText  : { 
        fontSize: 22,
         fontFamily: 'Source Sans Pro',
          fontWeight: '600', color: '#33494E', marginTop: '1%', alignSelf: 'center', display: 'flex', marginLeft: '18%' },
         mobileAppBarSx:{
              alignContent: 'center',
              display: 'flex',
               alignItems: 'center',
                flexDirection: 'row',
                 justifyContent: 'center',
                  width: '100%' },
        mobileAppBarDiv:{
             width: '100%',
              height: 65,
               backgroundColor: '#fff',
                display: 'flex', 
                justifySelf: 'center',
                 justifyContent: 'center' },
        mobileAppBarText:{ 
            fontSize: 22, fontFamily: 'Source Sans Pro', fontWeight: '600', color: '#33494E', marginTop: '1%', alignSelf: 'center', display: 'flex', },
        
}