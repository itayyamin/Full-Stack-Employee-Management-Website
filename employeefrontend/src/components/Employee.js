import * as React from 'react';
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper, Button} from "@mui/material";
import validator from 'validator'
import isEmail from "validator/es/lib/isEmail";
import isAlpha from "validator/es/lib/isAlpha";

export default function Employee() {
    const paperStyle = {padding: '70px 40px', width: 550, margin: "20px auto"}
    const [first_name, set_first_name] = useState('')
    const [id, set_id] = useState('')
    const [second_name, set_second_name] = useState('')
    const [email, set_email] = useState('')
    const [employees, set_employees] = useState([])
    const [employee, set_employee] = useState([])
    const [GetId, SetGetId] = useState('')
    const [DeleteId, SetDeleteId] = useState('')


    function timedRefresh(timeoutPeriod) {
        setTimeout("location.reload(true);", timeoutPeriod);
    }

    function pro_validation(email, first_name, second_name) {
        if (isEmail(email) === false) {
            alert("email not valid");
            return false;
        } else {
            if (first_name.length === 0 || second_name.length === 0 || email.length === 0) {
                alert("fields cannot be empty");
                return false;
            } else {
                if (!isAlpha(first_name) || !isAlpha(second_name)) {
                    alert("names cannot be with numbers!");
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    const handleClick_get = (e) => {
        e.preventDefault()
        var requestOptions = {
            method: 'GET',
        };
        fetch("http://localhost:8080/employee/" + GetId, requestOptions)
            .then(response => response.json())
            .then(result => set_employee(result))
            .catch(error => console.log('error', error));
    }

    const handleClick = (e) => {
        e.preventDefault()
        const employee = {first_name, second_name, email}
        var requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(employee)

        };
        if (pro_validation(email, first_name, second_name) === true) {
            console.log(employee)
            fetch("http://localhost:8080/employee/add", requestOptions).then(() => {
                console.log("New Employee added")
            })
            timedRefresh(0);
            return true;
        }
    }


    const handleUpdate = (e) => {
        e.preventDefault()
        const employee = {id,first_name, second_name, email}
        var requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(employee)

        };
        if (pro_validation(email, first_name, second_name) === true) {
            fetch("http://localhost:8080/employee/add", requestOptions).then(() => {
                console.log("New Employee added")
            })
            timedRefresh(0);
            return true;
        }
    }

    const handleClick_delete = (e) => {
        e.preventDefault()
        var requestOptions = {
            method: "DELETE",

        };
        //const employee = {first_name, second_name, email}
        console.log(employee)
        fetch("http://localhost:8080/employee/" + DeleteId, requestOptions).then(() => {
            console.log("DELETE EMPLOYEE")
        })
        timedRefresh(0);
    }

    useEffect(() => {
        fetch("http://localhost:8080/employee/getAll")
            .then(res => res.json())
            .then((result) => {
                    set_employees(result);
                }
            )
    }, [])


    return (
        <Container>

            <Paper elevation={3} style={paperStyle}>
                <h1 style={{clore: "blue"}}><u> add employee</u></h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1},
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <TextField id="standard-basic" label="employee first name" variant="standard" fullWidth
                               value={first_name} onChange={(e) => set_first_name(e.target.value)}

                    />
                    <TextField id="standard-basic" label="employee second name" variant="standard" fullWidth
                               value={second_name} onChange={(e) => set_second_name(e.target.value)}
                    />
                    <TextField id="standard-basic" label="employee email" variant="standard" fullWidth
                               value={email} onChange={(e) => set_email(e.target.value)}

                    />
                    <Button variant="contained" color="success" onClick={handleClick}>
                        submit
                    </Button>
                </Box>

            </Paper>

            <Paper elevation={3} style={paperStyle}>
                <h1 style={{clore: "blue"}}><u> get by id</u></h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1},
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <TextField id="standard-basic" label="get by id" variant="standard" fullWidth
                               value={GetId} onChange={(e) => SetGetId(e.target.value)}

                    />
                    <Button variant="contained" color="success" onClick={handleClick_get}>
                        get by id
                    </Button>
                    <Paper elevation={6} style={{margin: "10px", padding: "15px", textAlign: "left"}} key={employee.id}>
                        Id:{GetId}<br/>
                        first name:{employee.first_name}<br/>
                        second name:{employee.second_name}<br/>
                        email:{employee.email}<br/>

                    </Paper>
                </Box>

            </Paper>


            <Paper elevation={3} style={paperStyle}>
                <h1 style={{clore: "blue"}}><u> delete by id</u></h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1},
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <TextField id="standard-basic" label="ID TO DELETE" variant="standard" fullWidth
                               value={DeleteId} onChange={(e) => SetDeleteId(e.target.value)}

                    />
                    <Button variant="contained" color="success" onClick={handleClick_delete}>
                        delete by id
                    </Button>
                </Box>

            </Paper>

            <Paper elevation={3} style={paperStyle}>
                <h1 style={{clore: "blue"}}><u> update employee</u></h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1},
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <TextField id="standard-basic" label="id to update" variant="standard" fullWidth
                               value={id} onChange={(e) => set_id(e.target.value)}
                    />
                    <TextField id="standard-basic" label="employee first name" variant="standard" fullWidth
                               value={first_name} onChange={(e) => set_first_name(e.target.value)}

                    />
                    <TextField id="standard-basic" label="employee second name" variant="standard" fullWidth
                               value={second_name} onChange={(e) => set_second_name(e.target.value)}
                    />
                    <TextField id="standard-basic" label="employee email" variant="standard" fullWidth
                               value={email} onChange={(e) => set_email(e.target.value)}
                    />
                    <Button variant="contained" color="success" onClick={handleUpdate}>
                        UPDATE BY ID
                    </Button>
                </Box>

            </Paper>

            <h1>employees</h1>
            <Paper elevation={3} style={paperStyle}>

                {employees.map(employee => (
                    <Paper elevation={6} style={{margin: "10px", padding: "15px", textAlign: "left"}} key={employee.id}>
                        Id:{employee.id}<br/>
                        first name:{employee.first_name}<br/>
                        second name:{employee.second_name}<br/>
                        email:{employee.email}<br/>

                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}
