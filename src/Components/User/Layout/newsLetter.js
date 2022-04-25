import PropTypes from 'prop-types';
import windowSize from 'react-window-size';
import { Component } from 'react';
import API from '../../../Api/index.js'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import parse from 'html-react-parser';
const api = API.Api;

var htmlPage = 'ABSYZ Monthly NewsLetters'

class NewsLetter extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: false
        }
    }
    componentDidMount() {
        this.getNewsLetters();
    }
    getNewsLetters() {
        this.setState({ isLoading: true })
        const requestOptions = {
            method: 'POST',
            headers: { 'token': 'qwerty', 'Content-Type': 'application/json' }
        }
        fetch(`${api}/employeeportal/getMailChimpHtml`, requestOptions)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ isLoading: false });
                htmlPage = res.newsHtmlData
            });
    }

    myNewsLettersHtmlContent() {
        console.log(htmlPage, 'my html')

        return { __html: `${htmlPage}` }
    }
    render(html) {
        const myHtmlStyles = {
            width: 300,
            height: '100%',
            display: 'flex',

        }
        console.log(this.props.windowWidth)
        return (
            <div>
                {this.props.windowWidth > 770 ?
                    <div>
                        <div style={{ width: '100%', position: 'fixed', height: '9.5', backgroundColor: '#fff', display: 'flex', justifySelf: 'center', justifyContent: 'center' ,marginTop:'0%',zIndex:1000}}>
                            <p style={{ fontSize: 22, fontFamily: 'Source Sans Pro', fontWeight: '600', color: '#33494E', marginTop: '1%', alignSelf: 'center', display: 'flex', marginLeft: '20%' }}>News Letters </p>
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
                                <div  dangerouslySetInnerHTML={this.myNewsLettersHtmlContent()}>
                                </div>
                            }
                        </div>
                    </div>
                    :
                    <div >
                        <div style={{ width: '100%', height: 65, backgroundColor: '#fff', display: 'flex', justifySelf: 'center', justifyContent: 'center', marginTop: '10%' }}>

                            <p style={{ fontSize: 22, fontFamily: 'Source Sans Pro', fontWeight: '600', color: '#33494E', marginTop: '1%', alignSelf: 'center', display: 'flex', }}>News Letters</p>
                        </div>

                        {this.state.isLoading ?
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={this.state.isLoading}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                            :
                            <div >
                                {parse(htmlPage)}
                            </div>
                        }

                    </div>
                }
            </div>
        )

    }


}
NewsLetter.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default windowSize(NewsLetter)











