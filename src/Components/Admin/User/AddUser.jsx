import { Container, Paper, Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, IconButton } from "@material-ui/core";
import { DataGrid, } from "@material-ui/data-grid";
import Add from "@material-ui/icons/Add"
//import { XGrid } from "@material-ui/x-grid"
import { useState } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Logo from "./myLogo.png"
import { BsThreeDotsVertical } from "react-icons/bs"
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { SettingsInputAntenna } from "@material-ui/icons";
import { Component } from "react";
const rows = [
    { id: 1, employeeName: 'Surya', designation: 'Senior Software Engineer', age: 27, isactive: true },
    { id: 2, employeeName: 'Sathya', designation: 'Software Engineer', age: 22, isactive: true },
    { id: 3, employeeName: 'Shravan', designation: 'Software Engineer', age: 23, isactive: false },
    { id: 4, employeeName: 'Vamsi', designation: 'Software Engineer', age: 23, isactive: true },
    { id: 5, employeeName: 'Jeena', designation: 'Software Engineer', age: 24, isactive: true },
    { id: 6, employeeName: 'Lokesh', designation: 'Software Engineer', age: 22, isactive: false },
    { id: 7, employeeName: 'Ayush', designation: 'Senior Software Engineer', age: 28, isactive: false },
    { id: 8, employeeName: 'Nageshwar', designation: 'Senior Software Engineer', age: 27, isactive: false },
    { id: 9, employeeName: 'Ronn', designation: 'Senior Software Engineer', age: 26, isactive: false },
]
export default class  AddUser extends Component {
    constructor(){
        super()
        this.state={
            data:rows,
            currentRow:"",
            showDialog:false,
            showaddRow:false,
            myEmpId:"",
            employeeName:"",
            designation:"",
            toBeDeletedIndex:"",
            age:"",
            showSelection:false,
            selectOrDelete:true,
            columns : [
                { field: 'id', headerName: 'EMP ID', width: 150 },
                {
                    field: 'employeeName',
                    headerName: 'employee name',
                    width: 250,
                    editable: true,
                },
                {
                    field: 'designation',
                    headerName: 'Designation',
                    width: 200,
                    editable: true,
                },
                {
                    field: 'age',
                    headerName: 'Age',
                    type: 'number',
                    width: 110,
                    editable: true,
                },
                {
                    field: 'isactive',
                    headerName: 'Active',
                    width: 120,
                    editable: false
            
                },
                {
                    field: 'action',
                    headerName: 'Action',
                    width: 120,
                    disableClickEventBubbling: true,
                    renderCell: (params) => {
                        const myId = params.row

                      const onClick = (row) => {
                          console.log(row.target,"rowww")
                                        const rows = [...this.state.data];
                                       const index = this.state.data.findIndex((item) => item.id === this.state.currentRow.id )
                                       console.log(index,"my index")
                                       rows.splice(index,1)
                                        this.setState({ data: rows });
                                    };
                        return <Button id={this.state.currentRow.id} onClick={onClick} value={myId}   color="black"
                        size="small"
                        aria-label="delete" >
                            <DeleteIcon  fontSize="small" />
                        </Button>;
                    }
                },
            ]
        }
    }
     handleChange = (e )=> {
         this.setState({
             currentRow:{ ...this.state.currentRow, [e.target.name]: e.target.value }
         })
         console.log(this.state.currentRow,"current row")

    }
     updateRow = () => {
        const updatedCell = this.state.data.map(item => item.id === this.state.currentRow.id ? this.state.currentRow : item);
        this.setState({
            data:updatedCell,
            showDialog:false
        })

    }
     addRow=(data)=>{
        console.log(data,"my pushed data")
        var mynewRow=[this.state.myEmpId,this.state.employeeName,this.state.designation,this.state.age]
        console.log(mynewRow,"mynew row")
        this.setState({
            showaddRow:false
        })
    }
     handleId=(data)=>{ this.setState({ myEmpId:data.target.value})
    }
     handleEmpName =(data)=>{
         this.setState({employeeName:data.target.value})
    }
     handleDesignation = (data)=>{
         this.setState({designation:data.target.value})
    }
     handleAge=(data)=>{
         this.setState({age:data.target.value})
    }
    myrowDelete=()=>{
        const rows = [...this.state.data];
        const index = this.state.toBeDeletedIndex-1
        console.log("indexxxxx")
        rows.splice(index)
         this.setState({ data: rows });
        this.setState ({ showSelection:! this.state.showSelection,
            selectOrDelete:!this.state.selectOrDelete 
        })
    }
    checkBoxData=(data)=>{
        console.log(data,"my row check data")
        this.setState({toBeDeletedIndex:data})
    }
    render(){
    return (
<div>
        <Container>
            {this.state.currentRow && (
                <Dialog open={this.state.showDialog}>
                    <DialogTitle>
                        Employee's Record
                    </DialogTitle>
                    <DialogContent>
                        <TextField onChange={this.handleChange} label="Employee Name" value={this.state.currentRow.employeeName} place Holder="Enter Name" name="employeeName" fullWidth />
                        <TextField onChange={this.handleChange} label="Employee Designation" value={this.state.currentRow.designation} place Holder="Enter Designation" name="designation" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.updateRow} color="primary">Update</Button>
                        <Button variant="outlined"  onClick={() => this.setState({showDialog:false})} color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            )}
            <Button variant="contained" style={{margin:"3%",height:"3%"}} onClick={() => this.setState({showDialog:true})} disabled={! this.state.currentRow} color="primary">Edit </Button>
        {this.state.selectOrDelete ?     <Button variant="contained"  style={{margin:'3%'}} onClick={() => this.setState ({ showSelection:! this.state.showSelection,selectOrDelete:!this.state.selectOrDelete })}  color="primary">Select  </Button>  :<Button variant="contained"  style={{margin:'3%'}}   onClick={() => this.myrowDelete()} color="primary">Delete  </Button>  }
             <IconButton  style={{margin:"3%",fontSize:20,borderWidth:1}}  onClick={() => this.setState({showaddRow:!this.state.showaddRow})} color="primary"> Add <Add/>  </IconButton>
             <Paper component={Box} width={1} height={600} style={{marginTop:"5%"}}  >
                <DataGrid  
                checkboxSelection={this.state.showSelection} 
                onSelectionModelChange={this.checkBoxData} 
                onRowClick={(item) =>  this.setState({currentRow:item.row}) } 
                onRowSelected={(item) => console.log(item)} 
                rows={this.state.data} 
                columns={this.state.columns} 
                pageSize={10} />
            </Paper>
                  <Dialog open={this.state.showaddRow}>
                  <DialogTitle>
                      Employee's Record
                  </DialogTitle>
                  <DialogContent>
                      <TextField onChange={this.handleId} value={this.state.myEmpId} label="Employee Id"  place Holder="Enter Employee Id" name="id" fullWidth />
                      <TextField label="Employee Name" value={this.state.employeeName} onChange={this.handleEmpName} place Holder="Enter Name" name="employeeName" fullWidth />
                      <TextField label="Employee Designation" value={this.state.designation} onChange={this.handleDesignation} place Holder="Enter Designation" name="designation" fullWidth />
                      <TextField  label="Employee Age" onChange={this.handleAge} value={this.state.age}  place Holder="Enter Age" name="age" fullWidth />

                  </DialogContent>
                  <DialogActions>
                      <Button  onClick={this.addRow} style={{backgroundColor:'#1D7B84'}}>Add</Button>
                      <Button  onClick={() => this.setState({showaddRow: false})} color="primary">Cancel</Button>
                  </DialogActions>
              </Dialog>
        </Container>

</div>
    )
            }
}