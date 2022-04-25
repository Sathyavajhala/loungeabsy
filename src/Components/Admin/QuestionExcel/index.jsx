import React, { useState, useRef,useEffect } from 'react';
import XLSX from "xlsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Button from "@material-ui/core/Button"
import API from '../../../Api/index.js'
import TableHead from '@material-ui/core/TableHead';
import Group1 from '../../User/Group1.png'
import axios from "axios"
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const api = API.Api;
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
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
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];



const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm"
].map(function (x) {
  return "." + x;
})
  .join(",");

const make_cols = refstr => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [showValues, setShowValues] = useState(false);
  const [showAddButton, setShowAddButton] = useState({});
  const [showAddHit, setShowAddHit] = useState("");
  const [fileMerge,setFileMerge]=  useState('')
  const [recentQuestions,setRescentQuestions]=useState([]);

  const hiddenFileInput = useRef(null);

  const handleChange = (files /*:File*/) => {

    console.log('file', files.target.files)
    /* Boilerplate to set up FileReader */
    setFileMerge(files.target.files[0])
    let file = files.target.files[0]
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log(rABS, wb);
      var result = {};
      wb.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });
        if (roa.length) result[sheetName] = roa;
      });
      // see the result, caution: it works after reader event is done.
      console.log('result', result);
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log('data', data, make_cols(ws["!ref"]))
      /* Update state */
      // console.log(convertToJson(data));
      setRows(data)
      setColumns(make_cols(ws["!ref"]))
      setShowValues(true)
      //this.setState({ data: data, cols: make_cols(ws["!ref"]) });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }


  const convertToJson = (csv) => {
    console.log('csv', csv)
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }


  const handleUploadClick = event => {
    //hiddenFileInput.current.click();
    console.log('hit',fileMerge)
    var formData = new FormData(); 
    formData.append('file', fileMerge);
    const requestOptions = {
      method: 'POST',
      headers: { token: 'qwerty'},
      body:formData
    }
    console.log('requestOptions',requestOptions)
    fetch(`${api}/employeeportal/uploadQuestions`, requestOptions)
      .then(response => {
        console.log('res',response,JSON.stringify(response.json()))

        if (response.status == 200) {
          alert('Successfully question Added');
          setShowValues(false);

        } else {
          alert('question is not updated please try after some time')
        }
      })
  };

  const handleClick = event => {
    hiddenFileInput.current.click();
  }





  const addQuestion = row => {
    showAddButton[row[0]] = row[0]
    console.log('sjow', showAddButton)
    setShowAddButton(prevState => ({
      ...prevState,
      [row[0]]: row[0]
    }));
    //setShowAddButton(showAddButton)
    //setShowAddHit(row[1])
    const requestOptions = {
      method: 'POST',
      headers: { token: 'qwerty', 'Content-Type': 'application/json' },
      body: JSON.stringify({ "questions": [{ "question": row[0], "questiontype": "multiple", "option": [{ "a": row[1] }, { "b": row[2] }, { "c": row[3] }, { "d": row[4] ? row[4] : null }] }] })
    };
    fetch(`${api}/employeeportal/questionsinbound`, requestOptions)
      .then(response => {
        if (response.status == 200) {
          setShowAddButton(prevState => ({
            ...prevState,
            [row[0]]: row[0]
          }));
          alert('Successfully question Added')
        } else {
          alert('question is not updated please try after some time')
        }
      })

  }

  const checkAddQuestion = (row) => {
    console.log('disab', row, showAddButton)
    if (row[0] == showAddButton[row[0]]) {
      console.log('hit')
      return true
    } else {
      return false
    }
  }

 const fetchAxios=()=> {
    axios({
        method: 'get',
        url: `${api}/employeeportal/getquestions`,
        headers: { token: `qwerty`, 'Content-Type': 'application/json' }
    }).then(function (response) {
        // handle success
        console.log('axios1', response.data);
        console.log(response);
        // let data = JSON.parse(response.data)
        setRescentQuestions(response.data.payload);
        console.log('data',recentQuestions)
      }).catch(function (error) {
        // handle error
        console.log('axios', error);
    })
        .then(function (response) {
            console.log('axios2', response);
            // always executed
        });

}
// {\"statusCode\":200,\"message\":\"success\",\"pa
// : "{\"statusCode\":200,\"message\":\"success\",\"pay

{/* <string is too large to edit></string> */}
  const previousQuestions=()=>{
    const requestOptions = {
      method: 'GET',
      headers: { token: 'qwerty', 'Content-Type': 'application/json' },
    };
    fetch( `${api}/employeeportal/getquestions`, requestOptions)
    .then((response) => {console.log(response,"responsee") ; return response.json()} )
    .then((response) => console.log(JSON.stringify(response),'previous ') )
    
  }
  useEffect(()=>{
    previousQuestions();
    fetchAxios();
  
  },[])

  return (
    <div style={{ backgroundColor: '#F6F8FA' }}>
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <p style={{ fontFamily: 'Roboto', fontSize: 22, fontWeight: '400', marginTop: '3%' }} >Please Upload the Questions file in Spreadsheet(csv)* Format</p>
          {/* <img
            // className="top-50 start-50 translate-middle  " 
            src={Group1} style={{ alignSelf: 'flex-end', display: 'flex', marginTop: '3%', marginLeft: '20%' }} width={'60%'} height={'20%'} />
 */}

          <button type="button" className='btn' style={{ padding: 4, margin: 20, marginTop: '1%', backgroundColor: '#1D7B84', color: 'white' }} onClick={handleClick}>Browse File</button>
          {showValues ? <Button type="button" className='btn ' style={{ color: 'white', padding: 4, margin: 10, marginLeft: '50%', backgroundColor: '#1D7B84' }} onClick={handleUploadClick}>Upload Excel</Button> : null}
        </div>
        <input
          type="file"
          className="form-control"
          id="file"
          ref={hiddenFileInput}
          accept={SheetJSFT}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        {showValues ? <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{rows[0][0]}</TableCell>
                {/* <TableCell align="right">Location</TableCell> */}
                {/* <TableCell align="right">{row[1]}</TableCell> */}
                <TableCell align="right">{rows[0][1]}</TableCell>
                <TableCell align="right">{rows[0][2]}</TableCell>
                <TableCell align="right">{rows[0][3]}</TableCell>
                <TableCell align="right">{rows[0][4]}</TableCell>
                <TableCell align="right">{rows[0][5]}</TableCell>
                <TableCell align="right">{rows[0][6]}</TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(1).map((row, index) => (
                <TableRow key={row}>
                  <TableCell component="th" scope="row">
                    {row[0]}
                  </TableCell>
                  {/* <TableCell align="right">{row[1]}</TableCell> */}
                  <TableCell align="right">{row[1]}</TableCell>
                  <TableCell align="right">{row[2]}</TableCell>
                  <TableCell align="right">{row[3]}</TableCell>
                  <TableCell align="right">{row[4]}</TableCell>
                  <TableCell align="right">{row[5]}</TableCell>
                  <TableCell align="right">{row[6]}</TableCell>


                  {/* <TableCell align="right"><Button className="btn" style={{ backgroundColor: '#1D7B84', color: 'white', justifyContent: 'center', alignItems: 'center', textAlign: 'center', }} onClick={() => addQuestion(row)} disabled={checkAddQuestion(row)} >ADD </Button></TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> : 
        <div>

<p  style={{ fontSize: 22,marginLeft:'3%', fontFamily: 'Source Sans Pro', color: '#33494E', paddingTop: '1%', alignSelf: 'center', display: 'flex',fontWeight:'600' }}> Recently Shared </p>

          {recentQuestions.map((question)=> (
            <div style={{display:'flex',flexDirection:'row ' ,marginLeft:'3%'}}>
              <p> {question.questionpk} </p> 
         <p  style={{marginLeft:'2%', fontSize: 20,marginTop:'-0.5%', fontFamily: 'Source Sans Pro', color: '#33494E', alignSelf: 'center', display: 'flex', }} >     {question.name} </p>
              </div>
          ) )}
          </div>
        
        }


        {/* <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick

            /> */}
      </div>
    </div>
  );
}
