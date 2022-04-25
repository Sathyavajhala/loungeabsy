
import Drawer from '@material-ui/core/Drawer';
import { PieChart } from 'react-minimal-pie-chart';
import API from '../../../Api/index.js'
import 'react-circular-progressbar/dist/styles.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MyDrawer from "./Drawer/index"
import ListItem from '@material-ui/core/ListItem';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Group1 from '../Group1.png'
import Group3 from '../Group3.png'
import Collapse from '@mui/material/Collapse';
import Group2 from '../Group2.png'
import AppBarQuestionView from "./Appbar/AppBar"
import AppBarResultsView from "./Appbar/AppBar"
import Background from '../background.png'
import Alert from '@mui/material/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Component } from 'react';
// import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
 import * as React from 'react';
import PropTypes from 'prop-types';
import myLogo from "../myLogo.png"
import AppBar from '@mui/material/AppBar';
import Trivia from "./trivia"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import windowSize from 'react-window-size';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@material-ui/core/Button"
import WeeklyZine from './weeklyZine';
import NewsLetter from './newsLetter';
import CompanyNews from './CompanyNews';
// import "./styles.css";
const api = API.Api;
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            question: "",
            answer: "",
            windowWidth: '',
            begin: true,
            myCompanyNews: false,
            errormsg: false,
            option1: false,
            option2: false,
            weeklyZine: false,
            newsLetters: false,
            correctlyAnswered: 0,
            incorrectlyAnswered: 0,
            questionsAnswered: 0,
            activeDiv: '',
            alreadySubmitted: false,
            engagementRatio: 0,
            triviaResults: '',
            openAlert: false,
            totalQuestions: 0,
            incorrectRatio: 0,
            option3: false,
            results: false,
            option4: false,
            userProfile: "",
            isLoading: false,
            drawer: false,
            mobiledrawer: false,
            myQuestionView: false
        }
        this.handleDrawerMobile=this.handleDrawerMobile.bind(this)
    }



    ResponsiveDrawer(props) {
        const { window } = props;
        this.setState({ mobiledrawer: false })
        const handleDrawerToggle = () => {
            this.setState({ mobiledrawer: !this.state.mobiledrawer })
        };
    }

    componentDidMount() {
        console.log(this.props, "this is my props data main")
        this.fetchData()
        this.engagementratio()
        console.log(this.state.question, "fetched data")
    }

    engagementratio() {
        const requestOptions = {
            method: "GET",
            headers: { token: `${this.props.match.params.name}`, 'Content-Type': 'application/json', 'username': '' }
        }
        fetch(`${api}/employeeportal/getresults`, requestOptions).then((res) => res.json())
            .then((Res) => {
                if (Res.statusCode == 200) {
                    console.log(Res, " my response results")
                    this.setState({
                        engagementRatio: Res.payload,
                        correctlyAnswered: Res.payload[0].score,
                        incorrectlyAnswered: (Res.payload[0].total - Res.payload[0].score),
                        questionsAnswered: Res.payload[0].total,
                        totalQuestions: Res.payload[0].total,
                        engagementRatio: ((Res.payload[0].score) / (Res.payload[0].total)) * 100,
                        incorrectRatio: ((Res.payload[0].incorrectlyAnswersCount) / (Res.payload[0].total)) * 100,
                    })
                    var res = this.state.engagementRatio;
                    var newRes = res;
                    this.setState({ engagementRatio: newRes.toString().substr(0, 2) })
                    console.log(newRes.toString().substring(0, 5), 'engagement')
                }
            })
    }

    handleDivInput1(divName) {
        console.log("my data div",
            divName.target.id, this.state.question.Option[0][divName.target.id])
        if (divName.target.id) {
            this.setState({ activeDiv: divName.target.id, option: false })
            this.setState({ answer: this.state.question.Option[0][divName.target.id] })
        } else {
            this.setState({ option: true, answer: 'None' })
        }
    }

    fetchData() {
        const requestOptions = {
            method: 'GET',
            headers: { token: `${this.props.match.params.name}`, 'Content-Type': 'application/json' }
        }
        fetch(`${api}/employeeportal/gettokenuser`, requestOptions).then(res => { console.log(res); return res.json() }).then((result) => {
            if (result.statusCode == 200) {
                console.log('result123', result)
                this.fetchQuestion()
                this.setState({
                    isLoaded: true,
                    userProfile: result.payload
                });
            } else {

                this.setState({ question: 'error' })
            }
        },
        ).catch((e) => console.log('e', e))
    }

    fetchQuestion() {
        console.log('question', `${this.props.match.params.name}`)
        const requestOptions = {
            method: 'GET',
            headers: { 'token': `${this.props.match.params.name}`, 'Content-Type': 'application/json' }
        }
        fetch(`${api}/employeeportal/nextquestion`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('result', result)
                    if (result.statusCode === 500) {
                        this.fetchQuestion()
                    } else if (result.payload == "all questions answered successfully") {
                        console.log('here')
                        this.engagementratio();
                        this.setState({ results: true, question: result, myQuestionView: false, begin: false, })
                    }
                    else {
                        result.payload.Option[0].d = result.payload.Option[0].d ? result.payload.Option[0].d : 'None'
                        this.setState({
                            isLoaded: true,
                            question: result.payload
                        });
                        console.log(this.state.question, "User question")
                    }
                },
            ).catch((err) =>
                console.log(err, 'error here ')
            )
    }

    handleSUbmit = () => {
        if (this.state.answer) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id": this.state.question.id,
                    "question": this.state.question.question,
                    "questiontype": this.state.question.questiontype,
                    "user": this.state.question.user,
                    "validOption": this.state.question.validOption,
                    "userSelOption": this.state.answer,
                    "Option": this.state.question.Option
                })
            };
            console.log('request', requestOptions)
            fetch(`${api}/employeeportal/userAnswerValue`, requestOptions)
                .then(response => {
                    console.log('value', response)
                    if (response.ok) {
                        this.setState({ answer: "" })
                        this.fetchQuestion()
                    }
                });
        }
        else {
            this.setState({
                errormsg: true
            })
        }
    }

    handleOnchange = (value) => {
        this.setState({
            answer: value.target.name
        })
        console.log(value.target.name, "value")
    }

    startTest() {
        console.log(this.state.alreadySubmitted, 'already submitted')
        if (this.state.begin) {
            this.setState({ results: false, myQuestionView: true, begin: false })
        } else if (this.state.myQuestionView) {
            this.setState({ begin: false })
        }
        else if (this.state.results) {
            this.setState({ myQuestionView: false, begin: false, })
        }
    }

    trivia() {
        this.setState({ weeklyZine: false, newsLetters: false, myCompanyNews: false, mobiledrawer: false });
        this.componentDidMount()
        if (this.state.results) {
            this.setState({ begin: false, results: true })
        }
        else {
            this.setState({ begin: true })
        }
    }
    newsLetter() {
        this.setState({ newsLetters: true, mobiledrawer: false, weeklyZine: false, myQuestionView: false, begin: false, results: false, myCompanyNews: false })
    }

    companyNews() {
        this.setState({ myCompanyNews: true, mobiledrawer: false, newsLetters: false, weeklyZine: false, myQuestionView: false, begin: false, results: false, })
    }
    handleNext() {
        console.log('this.state', this.state.question)
        this.setState({ activeDiv: '', option: false })
        if (this.state.openAlert == true && this.state.answer != null) {
            this.setState({ openAlert: false })
        }
        if (this.state.answer == null || this.state.answer == '') {
            this.setState({ openAlert: true, })
        }

        else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token: `${this.props.match.params.name}` },
                body: JSON.stringify({
                    "id": this.state.question.id,
                    "question": this.state.question.question,
                    "questiontype": this.state.question.questiontype,
                    "user": this.state.question.user,
                    "validOption": this.state.question.validOption,
                    "userSelOption": this.state.answer,
                    "Option": this.state.question.Option
                })
            };
            console.log('request', requestOptions)
            fetch(`${api}/employeeportal/userAnswerValue`, requestOptions)
                .then(response => {
                    console.log('value', response)
                    if (response.ok) {
                        this.setState({ answer: "" })
                        this.fetchQuestion()
                    }
                });
        }
    }
    WeeklyZine() {
        this.setState({ weeklyZine: true, mobiledrawer: false, newsLetters: false, myQuestionView: false, begin: false, results: false, myCompanyNews: false })
    }
    handleDrawerMobile=()=>{
        this.setState({mobiledrawer:!this.state.mobiledrawer})
    }
    render() {
        console.log(this.state.engagementRatio, 'your payload result')
        const container = window !== undefined ? () => window().document.body : undefined;

        return (
            <div >
{this.state.myQuestionView ? 
<div>
{this.props.windowWidth > 770 ?
            <div
                style={myStyles.desktopAppBarDiv}
            >
                <p style={myStyles.desktopAppBarText} >ABSYZ Lounge Trivia </p>
            </div>
            :
            <div>
                <AppBar position="static"
                    style={{ backgroundColor: '#283741', }}
                    sx={myStyles.mobileAppBarSx}
                >
                    <Toolbar variant="dense" sx={{ position: 'absolute', left: 0 }} >
                        <IconButton
                            onClick={this.handleDrawerMobile}
                            edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon style={{ color: 'white' }} />
                        </IconButton>
                    </Toolbar>
                    <img src={myLogo} alt="Absyz.logo" width="80" height="40" style={{ alignSelf: 'center', marginBottom: '2%' }} />

                </AppBar>
                <div
                    style={myStyles.mobileAppBarDiv}
                >
                    <p
                        style={myStyles.mobileAppBarText}
                    >ABSYZ Lounge Trivia </p>
                </div>
            </div>
        }
            </div>
        
         : null}
                {this.props.windowWidth < 770 ?
                    <div>
                        {this.state.myQuestionView || this.state.results  ? null :
                            <div style={{ width: '100%', top: 0, position: 'fixed', zIndex: 1000 }}>
                                <AppBar position="static"
                                    style={{ backgroundColor: '#283741', }}
                                    sx={{ alignContent: 'center', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', width: '100%' }}
                                >
                                    <Toolbar variant="dense" sx={{ position: 'absolute', left: 0 }} >
                                        <IconButton
                                            onClick={this.handleDrawerMobile}
                                            edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                            <MenuIcon style={{ color: 'white' }} />
                                        </IconButton>
                                    </Toolbar>
                                    <img src={myLogo} alt="Absyz.logo" width="80" height="40" style={{ alignSelf: 'center', marginBottom: '2%' }} />

                                </AppBar>
                            </div>
    }
                    </div>
                    :null}

                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders" >
                        {/* <MyDrawer/> */}
                    {this.props.windowWidth > 770 ?
                        <Drawer
                            variant='permanent'
                            open={this.state.drawer}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            color='1D7B84' >
                            <div style={{ backgroundColor: '#1D7B84', height: '100%', }}  >
                                <div className={classes.toolbarIcon} style={{ backgroundColor: '#283741', height: '10%', display: 'flex', justifySelf: 'center', justifyContent: 'center' }}>
                                    <img src={myLogo} alt="Absyz.logo" width="80" height="40" style={{ alignSelf: 'center', display: 'flex' }} />
                                </div>
                                <List>
                                    <ListItem
                                        onClick={this.trivia.bind(this)} button exact>
                                        <ListItemIcon>
                                            <DescriptionRoundedIcon sx={{ color: '#fff' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Trivia" style={{ color: 'white', fontFamily: 'Source Sans Pro', fontSize: 20 }} />
                                    </ListItem>
                                    <ListItem
                                        onClick={this.newsLetter.bind(this)}
                                        button exact >
                                        <ListItemIcon>
                                            < ImportContactsIcon sx={{ color: '#fff' }} />

                                        </ListItemIcon>
                                        <ListItemText primary="Monthly Newsletter" style={{ color: '#fff', fontFamily: 'Source Sans Pro', fontSize: 20 }} />
                                    </ListItem>
                                    <ListItem button exact>
                                        <ListItemIcon>
                                            < DateRangeOutlinedIcon sx={{ color: '#fff' }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            onClick={this.WeeklyZine.bind(this)}
                                            primary="Weekly Zine" style={{ color: '#fff', fontFamily: 'Source Sans Pro', fontSize: 20 }} />
                                    </ListItem>
                                    <ListItem
                                        onClick={this.companyNews.bind(this)}
                                        button exact >
                                        <ListItemIcon>
                                            < LocationCityOutlinedIcon sx={{ color: '#fff' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Company News" style={{ color: '#fff', fontFamily: 'Source Sans Pro', fontSize: 20 }} />
                                    </ListItem>
                                </List>
                            </div>
                            <div style={{ bottom: 0, paddingBottom: '10%', backgroundColor: '#1D7B84', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ width: "50%", height: '75%', alignSelf: 'center', display: 'flex' }}>
                                </div>
                            </div>
                        </Drawer>
                        :
                        <div>
                            <Drawer
                                container={container}
                                variant="temporary"
                                open={this.state.mobiledrawer}
                                onClose={this.handleDrawer}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                                sx={{
                                    display: { xs: 'block', sm: 'none' },
                                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: mobileDrawerWidth },
                                }} >
                                <div style={{ backgroundColor: '#1D7B84', height: '100%', }}  >
                                    <div className={classes.toolbarIcon} style={{ backgroundColor: '#283741', height: 65, display: 'flex', justifySelf: 'center', justifyContent: 'center' }}>
                                        <img src={myLogo} alt="Absyz.logo" width="80" height="40" style={{ alignSelf: 'center', display: 'flex' }} />
                                    </div>
                                    <List>
                                        <ListItem button exact>
                                            <ListItemIcon>
                                                <DescriptionRoundedIcon sx={{ color: '#fff' }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                onClick={this.trivia.bind(this)}
                                                primary="Trivia" style={{ color: 'white', fontFamily: 'Source Sans Pro', fontSize: 20 }} />
                                        </ListItem>
                                        <ListItem button exact>
                                            <ListItemIcon>
                                                < ImportContactsIcon sx={{ color: '#fff' }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                onClick={this.newsLetter.bind(this)}
                                                primary="Monthly Newsletter" style={{ color: '#fff', fontFamily: 'Source Sans Pro', fontSize: 20 }} />
                                        </ListItem>
                                        <ListItem button exact>
                                            <ListItemIcon>
                                                < DateRangeOutlinedIcon sx={{ color: '#fff' }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                onClick={this.WeeklyZine.bind(this)}
                                                primary="Weekly Zine" style={{ color: '#fff', fontFamily: 'Source Sans Pro', fontSize: 20 }} />
                                        </ListItem>
                                        <ListItem
                                            onClick={this.companyNews.bind(this)}
                                            button exact>
                                            <ListItemIcon>
                                                < LocationCityOutlinedIcon sx={{ color: '#fff' }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Company News" style={{ color: '#fff', fontFamily: 'Source Sans Pro', fontSize: 20 }} />
                                        </ListItem>
                                    </List>
                                </div>
                            </Drawer>
                        </div>
                    }
                </Box>
                <Box component="main" sx={{ justifySelf: 'center', }}   >
                    {this.state.weeklyZine ? <WeeklyZine /> : null}
                    {this.state.newsLetters ? <NewsLetter /> : null}
                    {this.state.myCompanyNews ? <CompanyNews /> : null}
                    {this.state.begin  ? <Trivia/> :null }
                    {this.state.alreadySubmitted ?
                        <div className="position-absolute top-50 start-50 translate-middle  " >  already submitted {this.state.question.message} </div> : null}
                    {/* {this.state.myQuestionView ?
                        <div>
                            {this.props.windowWidth < 770 ?
                                <Collapse in={this.state.openAlert}
                                    style={{ width: '80%', display: 'flex', alignSelf: 'center', marginTop: '5%', marginLeft: '10%' }}
                                >
                                    <Alert
                                        variant='outlined'
                                        severity='error'
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    this.setState({ openAlert: false });
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                    > Please answer..!
                                    </Alert>
                                </Collapse>
                                :
                                <Collapse in={this.state.openAlert}
                                    style={{ width: '40%', display: 'flex', alignSelf: 'center', marginLeft: '40%', marginTop: '5%' }}
                                    className='collapseDesktop' >
                                    <Alert
                                        variant='outlined'
                                        severity='error'
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    this.setState({ openAlert: false });
                                                }}>
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                    > Please answer..!
                                    </Alert>
                                </Collapse>
                            }
                        </div> : null}
                    {this.state.begin ?
                        <div>
                            {this.props.windowWidth < 770 ?
                                <div >
                                    <p style={{ fontFamily: 'Source Sans Pro', fontSize: 40, fontWeight: 'bold', color: '#1D7B84', paddingTop: '20%', textAlign: 'center' }} >LET'S BEGIN</p>
                                    <img src={Background} style={{ alignSelf: 'center', }} width={'100%'} height={'100%'} />
                                    <img className="position-absolute top-50 start-50 translate-middle  " src={Group1} style={{ alignSelf: 'center', display: 'flex', }} width={'85%'} height={'25%'} />
                                    <Button variant='contained' style={{ width: '80%', position: 'absolute', backgroundColor: '#1D7B84', display: 'flex', color: 'white', bottom: '8%', left: '10%' }}
                                        onClick={this.startTest.bind(this)}
                                    >   Start</Button>
                                </div>
                                :
                                <div>
                                    {this.state.isLoading ? <div>
                                        <Backdrop
                                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                            open={this.state.isLoading}
                                        >
                                            <CircularProgress color="inherit" />
                                        </Backdrop>
                                    </div> : null}
                                    <div
                                        style={{ display: 'flex', backgroundImage: `url(${Group2})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', justifyContent: 'center', flexDirection: 'column', width: '100%', paddingLeft: '12%' }}
                                        className="position-absolute top-50 start-50 translate-middle  " >
                                        <p style={{ fontFamily: 'Source Sans Pro', fontSize: 70, marginTop: '3%', fontWeight: 'bold', color: '#1D7B84', marginLeft: '30%' }} >LET'S BEGIN</p>
                                        <img src={Group1} style={{ alignSelf: 'center', display: 'flex', }} width={'40%'} height={'15%'} />
                                        <Button variant='contained' style={{ width: '15%', backgroundColor: '#1D7B84', display: 'flex', marginTop: '15%', justifySelf: 'center', alignSelf: 'center', color: 'white', left: 25 }}
                                            onClick={this.startTest.bind(this)}
                                        >   Start</Button>
                                    </div>
                                </div>
                            }
                        </div>
                        : null}
                    {this.state.myQuestionView ?
                        <div>
                            {this.props.windowWidth < 770 ?
                                <div>
                                    {this.state.question == 'error' ?
                                        <div
                                            className="position-absolute top-50 start-50 translate-middle  "
                                            style={{ flexDirection: 'column', display: 'flex', width: '80%', }}>
                                            <div
                                                style={{ display: 'flex', justifySelf: 'center', alignSelf: 'center', }}>
                                                < ErrorOutlineIcon style={{ width: '30', height: '30' }} /></div>
                                            <span style={{ fontFamily: 'Source Sans Pro', fontSize: 25, display: 'flex', color: '#33494E', paddingTop: '3%', paddingLeft: '6%', width: '100%', justifyContent: 'center' }}> Your Session Expired  </span>
                                            <span style={{ fontFamily: 'Source Sans Pro', fontSize: 22, display: 'flex', color: '#33494E', paddingTop: '3%', paddingLeft: '6%', width: '100%', justifyContent: 'center' }}>  Please check your connection or try again Later </span>
                                        </div>
                                        :
                                        <div
                                        >
                                            <div style={{ display: 'flex', height: 500, width: '90%', alignSelf: 'center', flexDirection: 'column' }}>
                                                <span style={{ fontFamily: 'Source Sans Pro', fontSize: 22, display: 'flex', color: '#33494E', paddingTop: '3%', paddingLeft: '6%', width: '100%', justifyContent: 'left', textAlign: 'left' }}>  {this.state.question.question} </span>
                                                <div style={{ display: 'flex', height: '45%', width: '95%', backgroundColor: 'white', flexDirection: 'column', marginTop: '5%', marginLeft: '5.6%' }}>

                                                    {this.state.question.Option && Object.keys(this.state.question.Option[0]).map((keyName, keyIndex) =>
                                                        <div
                                                            id={keyName}
                                                            onClick={this.handleDivInput1.bind(this)} className="optionsecoptions" style={{
                                                                flexDirection: 'row', display: "flex", height: '25%',
                                                                backgroundColor: this.state.activeDiv === keyName ? '#1D7B84' : 'white'
                                                            }}>
                                                            <p style={{ border: '1px solid #D6EFF5', height: 25, width: 25, backgroundColor: this.state.activeDiv === keyName ? 'white' : 'transparent', borderRadius: 25, alignSelf: 'center', alignContent: 'center', alignItems: 'center', justifyContent: 'center', display: 'flex', justifySelf: 'center', marginLeft: '5%', marginTop: '1.5%' }}>{keyName}  </p>
                                                            {this.state.question.Option[0][keyName] ? <p style={{ alignSelf: 'center', paddingTop: '1%', paddingLeft: '2%', color: this.state.activeDiv === keyName ? 'white' : 'black' }} >{this.state.question.Option[0][keyName]} </p> : <p style={{ alignSelf: 'center', paddingTop: '1%', paddingLeft: '2%' }} >None </p>}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }} >
                                                <Button variant='contained' style={{ width: '45%', backgroundColor: '#1D7B84', display: 'flex', justifySelf: 'center', alignSelf: 'center', color: 'white' }}
                                                    onClick={this.handleNext.bind(this)}
                                                >   Next</Button>
                                            </div>
                                        </div>
                                    }
                                </div>
                                :
                                <div>
                                    {this.state.question == 'error' ?
                                        <div
                                            className="position-absolute top-50 start-50 translate-middle  "

                                            style={{ flexDirection: 'column', display: 'flex', width: '50%', marginLeft: '10%', }}>
                                            <div
                                                style={{ display: 'flex', justifySelf: 'center', alignSelf: 'center' }}>
                                                < ErrorOutlineIcon style={{ width: '50', height: '50', marginLeft: '55%' }} /></div>
                                            <span style={{ fontFamily: 'Source Sans Pro', fontSize: 25, display: 'flex', color: '#33494E', paddingTop: '3%', paddingLeft: '6%', width: '100%', justifyContent: 'center' }}> Your Session Expired  </span>
                                            <span style={{ fontFamily: 'Source Sans Pro', fontSize: 22, display: 'flex', color: '#33494E', paddingTop: '3%', paddingLeft: '6%', width: '100%', justifyContent: 'center' }}>  Please check your connection or  try again Later </span>
                                        </div> :
                                        <div style={{ marginLeft: '10%', marginTop: '5%' }}>
                                            <div style={{ alignSelf: 'center', height: 600, width: '70%', marginLeft: '30%', flexDirection: 'column', }}>
                                                <span style={{ fontFamily: 'Source Sans Pro', fontSize: 22, display: 'flex', color: '#33494E', paddingTop: '3%', paddingLeft: '6%', width: '100%', justifyContent: 'left' }}>{this.state.question.question} </span>
                                                <div style={{ display: 'flex', height: '45%', width: '60%', backgroundColor: 'white', flexDirection: 'column', marginTop: '3%', marginLeft: '5.6%' }}>
                                                    {this.state.question.Option && Object.keys(this.state.question.Option[0]).map((keyName, keyIndex) =>
                                                        <div
                                                            id={keyName}
                                                            onClick={this.handleDivInput1.bind(this)} className="optionsecoptions" style={{
                                                                flexDirection: 'row', display: "flex", height: '25%',
                                                                backgroundColor: this.state.activeDiv === keyName ? '#1D7B84' : 'white'
                                                            }}>
                                                            <p
                                                                style={{ border: '1px solid #D6EFF5', height: 25, width: 25, backgroundColor: this.state.activeDiv === keyName ? 'white' : 'transparent', borderRadius: 25, alignSelf: 'center', alignContent: 'center', alignItems: 'center', justifyContent: 'center', display: 'flex', justifySelf: 'center', marginLeft: '5%', marginTop: '1.5%', paddingBottom: '1%' }}>{keyName}  </p>
                                                            {this.state.question.Option[0][keyName] ? <p style={{ alignSelf: 'center', paddingTop: '1%', paddingLeft: '2%', color: this.state.activeDiv === keyName ? 'white' : 'black' }} >{this.state.question.Option[0][keyName]} </p> : <p style={{ alignSelf: 'center', paddingTop: '1%', paddingLeft: '2%' }} >None </p>}
                                                        </div>
                                                    )}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row', }}>
                                                    <Button variant='contained' style={{ width: '15%', backgroundColor: '#1D7B84', marginTop: '5%', display: 'flex', marginLeft: '30%', color: 'white' }}
                                                        onClick={this.handleNext.bind(this)}
                                                    >   Next</Button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                        </div> : null}
                    {this.state.results ?
                        <div>
                            {this.props.windowWidth < 770 ?
                                <div
                                    style={{
                                        display: 'flex', height: '80%', width: '77.75%', marginLeft: '10%', flexDirection: 'column',
                                        backgroundImage: `url(${Group2})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
                                    }}
                                >
                                    <img src={Group3} style={{ alignSelf: 'center', marginRight: '1%', marginTop: '3%' }} width={'70%'} height={'70%'} />
                                    <span style={{ fontFamily: 'Source Sans Pro', marginTop: '-1%', fontSize: 25, textAlign: 'center' }}> Response Submitted, Thanks. </span>
                                    <PieChart
                                        labelStyle={{
                                            fontSize: "10px",
                                            fontColor: "#FFFFFA",
                                            fontWeight: "800",
                                        }}
                                        paddingAngle={0}
                                        viewBoxSize={[100, 100]}
                                        style={{ width: '40%', height: '40%', alignSelf: 'center', paddingTop: '7%' }}
                                        data={[
                                            { title: 'InCorrect', value: this.state.totalQuestions, color: '#1D7B84', label: `${this.state.incorrectlyAnswered}%` },
                                            { title: 'Correct', value: this.state.correctlyAnswered, color: '#359DA7', label: `${this.state.correctlyAnswered}%` }
                                        ]}
                                    />
                                    <span style={{ fontFamily: 'Source Sans Pro', fontSize: 70, color: '#1D7B84', alignSelf: 'center', }}> {this.state.engagementRatio} %</span>
                                    <span style={{ fontFamily: 'Source Sans Pro', fontSize: 30, bottom: 20, color: '#1D7B84', alignSelf: 'center' }}>Trivia results</span>
                                    <div
                                        className='justify-content-center'
                                        style={{ alignSelf: 'center', height: '30%', width: '100%', display: 'flex', flexDirection: 'column', marginLeft: '10%', marginTop: '5%', justifyContent: 'center', }}>
                                        <div
                                            className='justify-content-center'
                                            style={{ display: 'flex', flexDirection: 'column', width: '99%' }}>
                                            <div
                                                className='justify-content-center'
                                                style={{ display: 'flex', flexDirection: 'row', width: '99%' }}>
                                                <span style={{ height: 15, width: 15, backgroundColor: 'black', borderRadius: 10, marginTop: '3.5%', marginLeft: '3%', }} ></span>
                                                <span style={{ fontFamily: 'Source Sans Pro', fontSize: 30, width: '70%', bottom: 20, color: '#33494E', alignSelf: 'flex-end', marginLeft: '3%' }}>Total questions</span>
                                                <span style={{ fontFamily: 'Source Sans Pro', fontSize: 30, bottom: 20, color: '#33494E', alignSelf: 'flex-end', }}> {this.state.totalQuestions} </span>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row', }}
                                                className='justify-content-center'>
                                                <span style={{ height: 15, width: 15, backgroundColor: '#1D7B84', borderRadius: 10, marginTop: '3.5%', marginLeft: '1%' }} ></span>
                                                <span style={{ fontFamily: 'Source Sans Pro', fontSize: 30, width: '70%', bottom: 20, color: '#33494E', alignSelf: 'flex-end', marginLeft: '3%' }}>Right answers</span>
                                                <span style={{ fontFamily: 'Source Sans Pro', fontSize: 30, bottom: 20, color: '#33494E', alignSelf: 'flex-end', }}> {this.state.correctlyAnswered} </span>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}
                                                className='justify-content-center'>
                                                <span style={{ height: 15, width: 15, backgroundColor: '#359DA7', borderRadius: 10, marginTop: '3.5%', marginLeft: '1.5%' }} ></span>
                                                <span style={{ fontFamily: 'Source Sans Pro', fontSize: 30, width: '70%', bottom: 20, color: '#33494E', alignSelf: 'flex-end', marginLeft: '3%' }}>Wrong answers</span>
                                                <span style={{ fontFamily: 'Source Sans Pro', fontSize: 30, bottom: 20, color: '#33494E', alignSelf: 'flex-end', }}> {this.state.incorrectlyAnswered} </span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                :
                                <div
                                    style={{
                                        display: 'flex', height: '80%', width: '77.75%', marginLeft: '10%', flexDirection: 'column',
                                        // backgroundImage: `url(${Group2})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
                                    }}
                                >
                                    <img src={Group3} style={{ alignSelf: 'flex-end', marginRight: '1%', marginTop: '10%' }} width={'25%'} height={'40%'} />
                                    <div style={{ marginRight: '10%', marginTop: '-5%', height: '15%' }}>
                                        <span style={{ fontFamily: 'Source Sans Pro', fontSize: 25, marginLeft: '25%' }}> Response Submitted, Thanks. </span>
                                        <PieChart
                                            labelPosition={50}
                                            labelStyle={{
                                                fontSize: "10px",
                                                fontColor: "FFFFFA",
                                                fontWeight: "800",
                                            }}
                                            paddingAngle={0}
                                            segmentsShift={0.5}
                                            viewBoxSize={[100, 150]}
                                            style={{ width: '20%', height: '20%', marginLeft: '35%', display: 'flex', marginTop: '3%' }}
                                            data={[
                                                { title: 'InCorrect', value: this.state.totalQuestions, color: '#1D7B84', label: `${this.state.incorrectlyAnswered}` },
                                                { title: 'Correct', value: this.state.correctlyAnswered, color: '#359DA7', label: `${this.state.correctlyAnswered}` }
                                            ]}
                                        />
                                    </div>
                                    <span style={{ fontFamily: 'Source Sans Pro', fontSize: 70, color: '#1D7B84', alignSelf: 'flex-end', marginRight: '12%', marginTop: '-17%' }}> {this.state.engagementRatio} %</span>
                                    <span style={{ fontFamily: 'Source Sans Pro', fontSize: 30, bottom: 20, color: '#1D7B84', alignSelf: 'flex-end', marginRight: '12%' }}>Trivia results</span>
                                    <div style={{ alignSelf: 'flex-end', width: '30%', height: '30%', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>      <span style={{ height: 15, width: 15, backgroundColor: 'black', borderRadius: 10, marginTop: '4%' }} ></span>   <span style={{ fontFamily: 'Source Sans Pro', fontSize: 30, bottom: 20, color: '#33494E', alignSelf: 'flex-end', marginLeft: '3%' }}>Total questions</span>
                                                <span style={{ fontFamily: 'Source Sans Pro', marginTop: '-2%', fontSize: 30, bottom: 20, color: '#33494E', alignSelf: 'flex-end', }}> {this.state.totalQuestions} </span>

                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>          <span style={{ height: 15, width: 15, backgroundColor: '#359DA7', borderRadius: 10, marginTop: '4%' }} ></span>     <span style={{ fontFamily: 'Source Sans Pro', fontSize: 30, bottom: 20, color: '#33494E', alignSelf: 'flex-end', marginLeft: '3%' }}>Right answer</span>
                                                <span style={{ fontFamily: 'Source Sans Pro', marginTop: '-2%', fontSize: 30, bottom: 20, color: '#33494E', alignSelf: 'flex-end', marginLeft: '7%' }}>{this.state.correctlyAnswered}</span>

                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>         <span style={{ height: 15, width: 15, backgroundColor: '#1D7B84', borderRadius: 10, marginTop: '4%' }} ></span>         <span style={{ fontFamily: 'Source Sans Pro', fontSize: 30, bottom: 20, color: '#33494E', alignSelf: 'flex-end', marginLeft: '3%' }}>Wrong answer</span>
                                                <span style={{ fontFamily: 'Source Sans Pro', marginTop: '-2%', fontSize: 30, bottom: 20, color: '#33494E', alignSelf: 'flex-end', marginLeft: '1.5%' }}>{this.state.incorrectlyAnswered}</span>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            }
                        </div> : null} */}
                </Box>

            </div >
        )
    }
}
const labelRenderProps = 80
document.body.style.backgroundColor = "#F6F8FA"
App.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
export default windowSize(App);

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

const { window } = 420;
// import { Button } from '@material-ui/core';
// import React from 'react';
// import TextFieldComponent from '../TextInput';
// import TextField from '@material-ui/core/TextField';
// import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid'
// import SelectField from '../Select';
// import CheckBoxField from '../CheckBox';
// import RadioField from '../RadioField'

// const styles = (theme) => ({
//     root: {
//         '& .MuiTextField-root': {
//             margin: theme.spacing(1),
//             width: '25ch',
//         },
//     },
// });

// class UserLayout extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             answers: '',
//             error: false,
//             questions: {
//                 "id": 0,
//                 "question": "No Questions to answer",
//                 "questiontype": "error",
//                 "user": "kesav",
//                 "validOption": null,
//                 "userSelOption": null,
//                 "required": true,
//                 "Option": [
//                     {
//                         "a": x'surya',
//                         "b": 'ram',
//                         "c": 'raju',
//                         "d": 'naray'
//                     }
//                 ]
//             }
//         }
//     }

//     onChange = (value) => {
//         this.setState({
//             answers: value
//         })
//     }

//     handleSubmit = () => {
//         console.log('hit',this.state.answers)
//         if (this.state.answers) {

//         } else {
//             console.log('hit2')
//             this.setState({ error: true })
//         }
//     }

//     render() {
//         const { classes } = this.props;
//         console.log('answers', this.state.answers)
//         const { Option, userSelOption, required } = this.state.questions
//         return (
//             <div style={{ justifyContent: 'center', alignItems: 'center' }}>
//                 <form className={classes.root} autoComplete="off" onSubmit={this.handleSubmit}>
//                     <div style={{ justifyContent: 'center' }}>
//                         <div>{this.state.questions.question}</div>
//                         {/* <div>
//                             <TextFieldComponent id={'userName'} label={'userName'} defaultValue={''} onChange={this.onChange} />
//                         </div>
//                         <div>
//                             <SelectField value={'save'} options = {[]} />
//                         </div> */}

//                         <div>
//                             <CheckBoxField value={userSelOption} Options={Option} Answer={this.state.answers} onChange={this.onChange} error={this.state.error} />
//                         </div>

//                         {/* <div>
//                             <RadioField value={'save'} options = {[]} />
//                         </div> */}
//                         {required ? null : <Button type="submit">Skip</Button>}
//                         <Button type="submit">Next</Button>
//                     </div>
//                 </form>
//             </div>

//         )
//     }
// }

// export default withStyles(styles)(UserLayout)