import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import { BsThreeDotsVertical } from "react-icons/bs"
import Container from "react-bootstrap/Container"
import { Link } from 'react-router-dom';
import { Component } from "react";
import { Button } from "@material-ui/core";
import { FaUserCircle } from "react-icons/fa";

export default class  NavbarCustom extends Component{
    constructor(){
        super()
        this.state={
            moreButton: false,
            profileButton:false
        }
    }

    render(){
    return(
        <div>
                    <Navbar style={{ height: 75,  }} className="z-depth-5">
          <a style={{ marginLeft: "2%" }} href="https://absyz.com">   <img src="https://absyz.com/wp-content/uploads/2020/06/absyz.png" alt="Logo" style={{ width: 109, height: 60 }} />  </a>
          <Container>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text >
              <FaUserCircle color="white" onClick={()=> this.setState({profileButton: !this.state.profileButton}) } size={25} />
                {/* <p style={{ display: "flex", flexDirection: "row", marginTop: "20%",color:"white" }} >Signed in as: <p style={{ textDecorationLine: 'underline' }}> Sathya Vajhala </p></p> */}
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
          <Button className="btn btn-light "   onClick={() =>
            this.setState({
              moreButton: !this.state.moreButton
            })
          } >
            
            <BsThreeDotsVertical size="18" style={{ marginRight: "3%", marginTop: "10%",color:"white" }} />
          </Button>
        </Navbar>
        {this.state.profileButton ? <div className="float-end  " style={{ zIndex: 1000, position: "relative", display: "flex", flexDirection: "column", backgroundColor: "#fff", right: "3%", width: "15%", height: '20%', borderRadius: 10, marginTop: "-1.3%" }} >
       
        
          <Link to="/admin/login" style={{ justifySelf: "center", justifyContent: "center", display: "flex" }} >
            <button className="btn "   >Logout</button>
          </Link>
        </div> : null}
        {this.state.moreButton ? <div className="float-end  " style={{ zIndex: 1000, position: "relative", display: "flex", flexDirection: "column", backgroundColor: "#fff", right: "0.3%", width: "20%", height: '20%', borderRadius: 10, marginTop: "-1.3%" }} >
          <Link to="/employee_portal">
            <button className="btn "  >Employee Portal</button>
          </Link>
          <button className="btn "  >Settings</button>
          <Link to="/admin" style={{ justifySelf: "center", justifyContent: "center", display: "flex" }} >
            <button className="btn "   >Logout</button>
          </Link>
        </div> : null}
        </div>
    )
        }
}