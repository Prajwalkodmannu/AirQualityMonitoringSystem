import React, { useEffect, useState } from 'react';
import MapsComponent from '../../maps/googleMapsComponent';
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import MapsMultiplePoints from '../../maps/mapsMultiplePoints';
import ApplicationStore from '../../../utils/localStorageUtil';


const GeoLocationWidget = ({locationCoordination}) => {
  const [locationCoordinationList, setLocationCoordinationList] = useState([]);
  const [centerLat, setCenterLat] = useState(23.500);
  const [centerLng, setCenterLng] = useState(80.500);
  const navigate = useNavigate();
  useEffect(() => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    const { locationLabel, branchLabel, facilityLabel, buildingLabel } = ApplicationStore().getStorage('siteDetails');
    const { location_id, branch_id, facility_id } = locationDetails; 
    setLocationCoordinationList(locationCoordination);    
    console.log(locationCoordination);
  }, [locationCoordination]);
  return (
    <div>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>  
        {locationCoordinationList.length !== 0
          ? ( 
        <MapsMultiplePoints 
          width="100%"
          height="50vh"
          markers={locationCoordinationList}
          zoom={4}
          center={{ lat: centerLat, lng: centerLng }}
        />
        )
        : ''}
      </Grid>
    </div>
  )
}

export default GeoLocationWidget