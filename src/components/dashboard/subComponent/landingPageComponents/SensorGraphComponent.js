import React, { useEffect, useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import {
  Button, Dialog, DialogContent, DialogTitle,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Grid from '@mui/material/Grid';
import { DashboardIndividualSensorDetails } from '../../../../services/LoginPageService';
/* eslint-disable no-unused-vars */
function SensorGraphComponent({
  open, setOpen, sensorTagId, segretionInterval, setSegretionInterval, rangeInterval, setRangeInterval, sensorTag,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    DashboardIndividualSensorDetails({ sensorTagId, segretionInterval, rangeInterval }, handleSuccess, handleException);
  }, [sensorTagId, segretionInterval, rangeInterval]);

  const handleSuccess = (dataObject) => {
    setData(dataObject.data || []);
  };

  const handleException = () => {};

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: '80%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle>
        Graph Data
      </DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            {sensorTag}
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">segretionInterval</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={segretionInterval}
                label="Age"
                onChange={(e) => {
                  setSegretionInterval(e.target.value);
                }}
              >
                <MenuItem value="15">15 Min</MenuItem>
                <MenuItem value="30">30 Min</MenuItem>
                <MenuItem value="60">1 Hr</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} style={{ paddingTop: 2 }}>
            <FormControl fullWidth style={{ marginTop: 2 }}>
              <InputLabel id="demo-simple-select-label">Range Interval</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={rangeInterval}
                label="Range Interval"
                onChange={(e) => {
                  setRangeInterval(e.target.value);
                }}
              >
                <MenuItem value="1*60">1 Hr</MenuItem>
                <MenuItem value="3*60">3 Hr</MenuItem>
                <MenuItem value="6*60">6 Hr</MenuItem>
                <MenuItem value="12*60">12 Hr</MenuItem>
                <MenuItem value="24*60">24 Hr</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div style={{ height: 250 }}>
          <ResponsiveBar
            data={data}
            keys={[
              'y',
            ]}
            indexBy="x"
            margin={{
              top: 50, right: 130, bottom: 50, left: 60,
            }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: 'fries',
                },
                id: 'dots',
              },
              {
                match: {
                  id: 'sandwich',
                },
                id: 'lines',
              },
            ]}
            borderColor={{
              from: 'color',
              modifiers: [
                [
                  'darker',
                  1.6,
                ],
              ],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'x',
              legendPosition: 'middle',
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Value',
              legendPosition: 'middle',
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: 'color',
              modifiers: [
                [
                  'darker',
                  1.6,
                ],
              ],
            }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={(e) => { return `${e.id}: ${e.formattedValue} in x: ${e.indexValue}`; }}
          />
        </div>
        <Button
          sx={{ m: 1 }}
          size="large"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default SensorGraphComponent;
