import React, { Fragment, useState } from 'react';
import {
    Box, InputLabel, MenuItem, FormControl, Select, TextField, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Fab,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';

const sample = [
    { date: '04-06-2022', detail: ['Min', 'Max', 'Avg', 'Status'], values: ['50', '100', '60', '#1234'] },
    { date: '05-06-2022', detail: ['Min', 'Max', 'Avg', 'Status'], values: ['4', '4', '4', '4'] },
    { date: '05-06-2022', detail: ['Min', 'Max', 'Avg', 'Status'], values: ['54', '4', '23', '54'] },
];

function IndividualReportForm(props) {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [deviceId, setDeviceId] = useState('');

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Stack direction="row" spacing={2} marginTop={1.5} alignItems="center">
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="add"
                    onClick={() => {
                        // DownloadCsv();
                    }}
                >
                    <DownloadIcon sx={{ mr: 1 }} />
                    Download
                </Fab>
                <Button variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>
                <TextField
                    sx={{ minWidth: 250 }}
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
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="From Date"
                            value={fromDate}
                            onChange={(newValue) => {

                                setFromDate(newValue);
                            }}
                        />
                    </LocalizationProvider> */}
                <TextField
                    sx={{ minWidth: 250 }}
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
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="To Date"
                            value={toDate}
                            onChange={(newValue) => {
                                setToDate(newValue);
                            }}
                        />
                    </LocalizationProvider> */}
                <Box sx={{ minWidth: 250 }}>
                    <FormControl fullWidth>
                        <InputLabel>Devices</InputLabel>
                        <Select
                            value={deviceId}
                            label="Age"
                            onChange={() => {
                                // HandleDeviceChange(e.target.value)
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
                    <Button size="medium" variant="contained" autoFocus>
                        Cancel
                    </Button>
                </FormControl>
            </Stack>
            <Table sx={{ marginTop: 3 }} aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}>Date</TableCell>
                        <TableCell sx={{ width: 30 }}>PM10_GAS2</TableCell>
                        <TableCell sx={{ width: 30 }}>PM10_GAS2</TableCell>
                        <TableCell sx={{ width: 30 }}>PM10_GAS2</TableCell>
                        <TableCell sx={{ width: 30 }}>PM10_GAS2</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sample.map((item) => (
                        <>
                            <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ width: 40 }} rowSpan={item.detail.length + 1}>
                                    {item.date}
                                </TableCell>
                            </TableRow>
                            {item.detail.map((detail) => (
                                <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell sx={{ width: 20 }}>{detail}</TableCell>
                                    {
                                        item.values.map((val) => (

                                            <TableCell sx={{ width: 20 }}>{val}</TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))}
                        </>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[2, 10, 25]}
                component="div"
                count={sample.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                marginTop={4}
            >
                <Button variant="contained" startIcon={<DownloadIcon />}>
                    Download
                </Button>
            </Stack>
        </>
    );
}

export default IndividualReportForm;
