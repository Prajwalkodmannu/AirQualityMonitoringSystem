import React from 'react';
import Grid from '@mui/material/Grid';
import MachineCard from './MachineCard';
import DigitalCard from './DigitalCard';

function LayoutMachine({
  setOpen, analogSensorList, digitalSensorList, modbusSensorList, setSensorTagId, setSensorTag, sensorIdList
}) {
  return (
    <div
      style={{
        marginTop: 5,
        maxHeight: '65vh',
        overflow: 'auto',
        padding: 5,
      }}
    >
      <Grid
        container
        spacing={2}
        style={{ padding: 1 }}
      >
        {analogSensorList.map((data) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={data.sensorTagId}>
              <MachineCard
                setOpen={setOpen}
                id={data.sensorTagId}
                sensorStatus={data.sensorStatus}
                sensorName={data.sensorTag}
                sensorNameUnit={data.sensorNameUnit}
                min={data.min}
                max={data.max}
                avg={data.avg}
                last={data.last}
                alertColor={data.alertColor}
                setSensorTagId={setSensorTagId}
                setSensorTag={setSensorTag}
                color={data.alertColor}
                lightColor={data.alertLightColor}
                sensorIdList={sensorIdList}
              />
            </Grid>
          );
        })}
        {digitalSensorList.map((data) => {
          return (
            <Grid item xs={12} sm={6} md={3} lg={3} key={data.sensorTagId}>
              <DigitalCard
                id={data.sensorTagId}
                sensorStatus={data.sensorStatus}
                sensorName={data.sensorTag}
                sensorNameUnit={data.sensorNameUnit}
                min={data.min}
                max={data.max}
                avg={data.avg}
                last={data.last}
                alertColor={data.alertColor}
                setSensorTagId={setSensorTagId}
                setSensorTag={setSensorTag}
                color={data.alertColor}
                lightColor={data.alertLightColor}
                sensorIdList={sensorIdList}
              />
            </Grid>
          );
        })}
        {modbusSensorList.map((data) => {
          return (
            <Grid item xs={12} sm={6} md={3} lg={3} key={data.sensorTagId}>
              <MachineCard
                setOpen={setOpen}
                id={data.sensorTagId}
                sensorStatus={data.sensorStatus}
                sensorName={data.sensorTag}
                sensorNameUnit={data.sensorNameUnit}
                min={data.min}
                max={data.max}
                avg={data.avg}
                last={data.last}
                alertColor={data.alertColor}
                setSensorTagId={setSensorTagId}
                setSensorTag={setSensorTag}
                color={data.alertColor}
                lightColor={data.alertLightColor}
                sensorIdList={sensorIdList}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default LayoutMachine;
