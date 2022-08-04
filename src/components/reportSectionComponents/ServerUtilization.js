import React, { useState, useEffect } from 'react'
import { Box, InputLabel, MenuItem, FormControl, Select, TextField, Stack, Button, Fab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';

const columns = [
    { field: 'id', headerName: 'Rate', width: 150 },
    { field: 'firstName', headerName: 'AVG RAM %', width: 150 },
    { field: 'lastName', headerName: 'AVG CPU %', width: 150 },
    { field: 'age', headerName: 'Disk Utilization', type: 'number', width: 90, },
];

const rows = [

];

const ServerUtilization = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    return (
        <>
            <Stack direction="row" spacing={2} marginTop={1.5} alignItems="center" >
                <Fab variant="extended" size="medium" color="primary" aria-label="add"
                    onClick={() => {
                        // DownloadCsv();
                    }}
                >
                    <DownloadIcon sx={{ mr: 1 }} />
                    Download
                </Fab>
                <TextField sx={{ minWidth: 250 }}
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
                <TextField sx={{ minWidth: 250 }}
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
            <div style={{ height: 300, width: '100%', marginTop: 25 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </>
    )
}

export default ServerUtilization