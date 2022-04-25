import PropTypes from 'prop-types';
import windowSize from 'react-window-size';
import { Component } from 'react';
import API from '../../../Api/index.js'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const api = API.Api;
var htmlPage = 'Loading..! Weekly Zine';
class WeeklyZine extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: true
        }
    }
    componentDidMount() {
        this.getWeeklyZine();
        // this.setState({isLoading:true})

    }
    getWeeklyZine() {
        const requestOptions = {
            method: 'POST',
            headers: { 'token': 'qwerty', 'Content-Type': 'application/json' }
        }
        fetch(`${api}/employeeportal/getMailChimpHtml`, requestOptions)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ isLoading: false });
                htmlPage = res.weeklyZineHtmlData

            })
    }
    myWeeklyZineHtmlContent() {
        return { __html: `${htmlPage}` }
    }

    render() {
        console.log(this.props,"my props")
        return (
            <div  >
                {this.props.windowWidth > 770 ?
                    <div>
                        <div style={{ width: '100%', position: 'fixed', height: '9.5%', zIndex: 1000, backgroundColor: '#fff', display: 'flex', justifySelf: 'center', justifyContent: 'center', top: 0 }}>
                            <p style={{ fontSize: 22, fontFamily: 'Source Sans Pro', fontWeight: '600', color: '#33494E', marginTop: '1%', alignSelf: 'center', display: 'flex', marginLeft: '20%' }}>Weekly Zine  </p>
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', marginLeft: '14%', alignSelf: 'center', paddingTop: '5%' }}>

                            {this.state.isLoading ?
                                <Backdrop
                                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                    open={this.state.isLoading}
                                >
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                                :
                                <div dangerouslySetInnerHTML={this.myWeeklyZineHtmlContent()}>
                                </div>
                            }
                        </div>


                    </div>
                    :
                    <div>
                        <div style={{ width: '100%', height: 65, backgroundColor: '#fff', display: 'flex', justifySelf: 'center', justifyContent: 'center' }}>

                            <p style={{ fontSize: 22, fontFamily: 'Source Sans Pro', fontWeight: '600', color: '#33494E', marginTop: '1%', alignSelf: 'center', display: 'flex', }}>Weekly Zine </p>
                        </div>

                        {this.state.isLoading ?
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={this.state.isLoading}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            :
                            <div dangerouslySetInnerHTML={this.myWeeklyZineHtmlContent()}>
                            </div>
                        }

                    </div>
                }
            </div>

        )
    }
}
WeeklyZine.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default windowSize(WeeklyZine)




