import React, { useState, useEffect } from 'react'
import { Box, InputLabel, MenuItem, FormControl, Select, TextField, Stack, Button, Fab } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { FetchSensorStatusReportDetails } from '../../services/LoginPageService';


const SensorStatus = (props) => {
    const [deviceId, setDeviceId] = useState('')
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [gasCollection, setGasCollection] = useState([]);
    const [sensorDate, setSensorDate] = useState([]);
    const [sensorDateValues, setSensorDateValues] = useState([]);

    useEffect(() => {
        FetchSensorStatusReportDetails({ deviceId, fromDate, toDate }, SensorStatusReportHandleSuccess, SensorStatusReportHandleException)
    }, [deviceId]);

    const SensorStatusReportHandleSuccess = (dataObject) => {
        console.log(dataObject.headerItem);
        setGasCollection(dataObject.headerItem || []);
        const keys = Object.keys(dataObject.data || {});
        setSensorDate(keys || []);
        setSensorDateValues(dataObject.data || []);
        console.log(keys);
        // setSensorDateValues(dataObject.data);
        // console.log(dataObject.data);
    }

    const SensorStatusReportHandleException = () => {

    }
    const HandleDeviceChange = (deviceId) => {
        setDeviceId(deviceId);
    };



    return (
        <>
            <Stack direction="row" spacing={2} marginTop={1.5} alignItems="center">
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="add"

                >
                    <DownloadIcon sx={{ mr: 1 }} />
                    Download
                </Fab>
                <Button
                    variant="contained"

                    endIcon={<SendIcon />}
                >
                    Send
                </Button>

                <TextField
                    sx={{ minWidth: 230 }}
                    label="From Date"
                    type="date"
                    value={fromDate}
                    variant="outlined"
                    required
                    onChange={(e) => {
                        setFromDate(e.target.value);
                    }}
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    sx={{ minWidth: 230 }}
                    label="to date"
                    type="date"
                    value={toDate}
                    variant="outlined"
                    required
                    onChange={(e) => {
                        setToDate(e.target.value);
                    }}
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Box sx={{ minWidth: 230 }}>
                    <FormControl fullWidth>
                        <InputLabel>Devices</InputLabel>
                        <Select
                            value={deviceId}
                            label="Age"
                            onChange={(e) => {
                                HandleDeviceChange(e.target.value);
                            }}
                        >
                            {props.deviceList.map((data) => (
                                <MenuItem value={data.id}>{data.deviceName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <FormControl>
                    <Button size="medium" variant="contained" autoFocus type="submit">
                        Submit
                    </Button>
                </FormControl>
                <FormControl>
                    <Button size="medium" variant="contained" autoFocus >
                        Cancel
                    </Button>
                </FormControl>
            </Stack>
            {/* <TableContainer sx={{ mt: 3 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2} >Date</TableCell>
                            {gasCollection?.gasCollection?.map((sensor) =>
                                <TableCell>{sensor}</TableCell>)
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sensorDate?.map((data, index) => {
                            return (
                                <>
                                    <TableRow>
                                        <TableCell rowSpan={4}>
                                            {data}
                                        </TableCell>
                                    </TableRow>
                                    {sensorDateValues[data]?.min?.map(minValue => (
                                        <TableRow>
                                            <TableCell>{minValue}</TableCell>
                                        </TableRow>
                                    ))}
                                </>
                                 <TableRow>
                                    <TableRow>
                                        <TableCell rowSpan={4}>{data}</TableCell>
                                        <TableCell>Min</TableCell>
                                        <TableCell>10</TableCell>
                                        <TableCell>20</TableCell>
                                        <TableCell>80</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>MAX</TableCell>
                                        <TableCell>20</TableCell>
                                        <TableCell>30</TableCell>
                                        <TableCell>40</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>AVG</TableCell>
                                        <TableCell>15</TableCell>
                                        <TableCell>10</TableCell>
                                        <TableCell>10</TableCell>
                                    </TableRow>
                                </TableRow> 
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer> */}
            <table>
                <tr>
                    <th colspan="2">Date</th>
                    {gasCollection?.gasCollection?.map((sensor) =>
                        <th>{sensor}</th>)
                    }
                </tr>
                {sensorDate?.map((data) => {
                    return (
                        <>
                            <tr>
                                <th rowspan="3">{data}</th>
                                <td>Min</td>
                                {sensorDateValues[data]?.min?.map((minValue) => {
                                    <td>{minValue}</td>
                                })}
                            </tr>
                            <tr>
                                <td>MAX</td>
                                <td>20</td>

                            </tr>
                            <tr>
                                <td>AVG</td>
                                <td>15</td>

                            </tr>
                        </>
                    )
                })}
                <tr>
                    <th rowspan="4">01-12-2022</th>
                    <td>Min</td>
                    <td>10</td>
                    <td>30</td>
                    <td>40</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>MAX</td>
                    <td>20</td>
                    <td>40</td>
                    <td>50</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>AVG</td>
                    <td>15</td>
                    <td>35</td>
                    <td>45</td>
                    <td>75</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>Good</td>
                    <td>Average</td>
                    <td>Severe</td>
                    <td>Out of Range</td>
                </tr>
            </table>
        </>

    )
}

export default SensorStatus