import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { loginUser } from '../../../Actions/LoginAction'
import { Redirect } from "react-router-dom";
import LockIcon from '@mui/icons-material/Lock';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //  borderWidth:'1px',
    //  borderStyle:"solid"

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [backDrop,setBackDrop]=useState(false)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  console.log(props,"props")

  const handleSubmit = (event) => {

    //console.log('vent.target.value',event)
    setBackDrop(true)
    // event.preventDefault()

    if (username=="admin@absyz.com" && password== 'admin' ) {
      console.log('hitSuccess')
      props.loginUser({ username: username, password: password })

    }else{
      alert("Incorrect Credentials. Please check again...!")
    }
    console.log('hit')
  }

  const handleTextChange = (event, value) => {
    console.log('values', event.target.value)
    // setValues({...values, ['username']: })
    if (value == 'username') {
      setUsername(event.target.value)
    } else {
      setPassword(event.target.value)
    }

  }
  const handleBackdrop=()=> {
    setBackDrop(false)
  }

  const validate = () => {
    //  console.log(values)
    setPasswordError(false)
    setUsernameError(false)
    let temp = {}
    temp.username = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(username) ? "" : (setUsernameErrorMessage("Email Format is Wrong"), setUsernameError(true))
    temp.password = password.length > 7 ? "" : (setPasswordErrorMessage('please enter password'), setPasswordError(true))
    console.log('temp', Object.values(temp))
    return Object.values(temp).every(x => x === "")
  }

  return props.isLoggedIn.isLoggedIn ? (
    <Redirect
      to={{
        pathname: "/admin"
      }}
    />
  ) : (
 
    <div component="main"  style={{backgroundColor:'#142933',height:'100%',zIndex:1,position:'absolute',width:'100%'}} >
      {/* <CssBaseline /> */}
      <Container component="main" maxWidth='xs' >
      <div className={classes.paper} >
        <a style={{ marginLeft: "2%" }} href="https://absyz.com">   <img src="https://absyz.com/wp-content/uploads/2020/06/absyz.png" alt="Logo" style={{ width: 109, height: 60 }} color='#1D7B84' />  </a>
        {/* <img src={absyz} alt="Absyz.logo" width="120" height="70" /> */}
        {/* <Typography component="h1" variant="h5">
          Sign in
        </Typography> */}
        <Box sx={{width:'99%', }}>
          <Card variant="outlined" sx={{marginTop:"5%",borderRadius:7}} >
            <CardContent> 
            <p style={{fontFamily:'Source Sans Pro',fontSize:25,fontWeight:500,color:'#283741',textAlign:'center'}}> ADMIN LOGIN </p>

              <div style={{display:'flex',flexDirection:"row",paddingTop:30}}>

                <MailOutlineIcon/>
                <TextField
                  inputProps={{
                    autoComplete: "off",
                  }}
                  // variant="outlined"
                  margin="normal"
                  required
                  style={{bottom:40,left:5}}
                  id="email"
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={username}
                  onChange={(e) => handleTextChange(e, 'username')}
                  autoComplete='off'
                  autoFocus
                  error={usernameError}
                  helperText={usernameErrorMessage}
                />
                </div>

              <div style={{display:'flex',flexDirection:"row",paddingTop:5}}>
                <LockIcon/>
                <TextField
                  // variant="outlined"
                  margin="normal"
                  require
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  style={{bottom:40,left:5}}

                  value={password}
                  onChange={(e) => handleTextChange(e, 'password')}
                  //onChange={handleTextChange}
                  id="password"
                  autoComplete="off"
                  inputProps={{
                    autoComplete: "off"
                  }}
                  error={passwordError}
                  helperText={passwordErrorMessage}
                />
                </div>
              {/* </form> */}
            </CardContent>
            <CardActions sx={{alignSelf:"center",justifyContent:"center",display:"flex"}} >
              <Button
                type="submit"
                style={{bottom:20,backgroundColor:'#1D7B84',color:'white'}}
                // fullWidth
                variant="contained"
                // color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign In
              </Button>

            </CardActions>

          </Card>
        </Box>

        {/* <div>
            {this.props.errors && this.props.errors.data && (
              <Snackbar
                open={true}
                msgType={"error"}
                msg={this.props.errors.data}
              />
            )}
          </div> */}
      </div>


      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
          {/* <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backDrop}
            transitionDuration={1}
            onClick={handleBackdrop.bind(this)}
          // transitionDuration={}
          >
            <CircularProgress color="inherit" />
          </Backdrop> */}
          </Container>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.login,
  errors: state.errors
});

const mapDispatchToProps = {
  loginUser: loginUser,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
document.body.style = 'background: #F6F8FA';