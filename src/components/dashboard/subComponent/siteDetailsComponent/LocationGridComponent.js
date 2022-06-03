import { Breadcrumbs } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { FetchLocationService } from '../../../../services/LoginPageService';

const LocationGridComponent = ({locationDetails, setLocationDetails, setProgressState, setBreadCrumbLabels}) => {
  const [dataList, setDataList] = useState([]);

  const columns = [
    {
      field: 'stateName',
      headerName: 'Location Name',
      width: 270,
      type: 'actions',
      getActions: (params) => [
        <LinkTo selectedRow={params.row} />,
      ],
    },
    {
      field: 'totalBuildings',
      headerName: 'Total Branches',
      width: 150,
    },
    {
      field: 'totalAssets',
      headerName: 'Total Assets',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 150,
    },
  ];
  useEffect(()=>{
    FetchLocationService(handleSuccess, handleException);
  },[]);

  const LinkTo = ({selectedRow}) =>{
    return (
      <h3 onClick={()=>{
        setLocationDetails((oldValue)=>{
          return {...oldValue, location_id: selectedRow.id};
        });
        
        setBreadCrumbLabels((oldvalue)=>{
          return { ...oldvalue, stateLabel: selectedRow.stateName}
        });

        setProgressState(1);
      }}>
        {selectedRow.stateName}
      </h3>
    )
  }
  const handleSuccess = (dataObject) => {
    setDataList(dataObject.data);
  }

  const handleException = (errorObject) => {
  };
  return (
    <div style={{ height: 400, width: '100%' }}>LocationGridComponent
    <Breadcrumbs aria-label="breadcrumb" separator="›">
      <h3>
        Location
      </h3>
    </Breadcrumbs>
      <DataGrid
        rows={dataList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${70}%` }}
      />
    </div>
  )
}

export default LocationGridComponent