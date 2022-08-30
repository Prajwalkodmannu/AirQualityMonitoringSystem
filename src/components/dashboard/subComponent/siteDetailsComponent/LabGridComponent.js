import { Breadcrumbs, Chip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { LabfetchService } from '../../../../services/LoginPageService';
import { setAlertPriorityAndType } from '../../../../utils/helperFunctions';
import ApplicationStore from '../../../../utils/localStorageUtil';
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-shadow */
function LabGridComponent(props) {
  const {
    setImg, setLocationDetails, setProgressState, breadCrumbLabels,
    setBreadCrumbLabels, setIsGeoMap, setDeviceCoordsList, siteImages, setSiteImages, setIsDashBoard, setAlertList,
    locationAlerts
  } = props;
  const { labIdList } = ApplicationStore().getStorage('alertDetails');

  const [dataList, setDataList] = useState([]);
  const [isLoading, setGridLoading] = useState(true);
  const dataColumns = [
    {
      field: 'labDepName',
      headerName: 'Zone Name',
      width: 400,
      type: 'actions',
      getActions: (params) => [
        <LinkTo selectedRow={params.row} />,
      ],
    },
    {
      field: 'id',
      headerName: 'Status',
      width: 170,
      renderCell: ((params) => {
        let element = {
          alertLabel: 'Good',
          alertColor: 'green',
          alertPriority: 4,
        };
        const alertObject = labIdList?.filter((alert) => {
          return params.row.id === parseInt(alert.id);
        });

        alertObject?.map((data) => {
          element = setAlertPriorityAndType(element, data);
        });

        return (
          <Chip
            variant="outlined"
            label={element.alertLabel}
            style={{
              color: element.alertColor,
              borderColor: element.alertColor,
            }}
          />
        );
      }),
    },
  ];
  useEffect(() => {
    setGridLoading(true);
    LabfetchService({
      location_id: props.locationDetails.location_id,
      branch_id: props.locationDetails.branch_id,
      facility_id: props.locationDetails.facility_id,
      building_id: props.locationDetails.building_id,
      floor_id: props.locationDetails.floor_id,
    }, handleSuccess, handleException);
  }, [props.locationDetails]);

  const handleSuccess = (dataObject) => {
    setGridLoading(false);
    setDataList(dataObject.data);
  };

  const handleException = () => {
  };

  function LinkTo({ selectedRow }) {
    return (
      <h3
        style={{ cursor: 'pointer' }}
        onClick={() => {
          locationAlerts({lab_id: selectedRow.id});
          setLocationDetails((oldValue) => {
            return { ...oldValue, lab_id: selectedRow.id };
          });

          setBreadCrumbLabels((oldvalue) => {
            return { ...oldvalue, lablabel: selectedRow.labDepName };
          });
          setIsDashBoard(2);
          setImg(selectedRow.labDepMap);
          setSiteImages((oldValue) => {
            return { ...oldValue, labImage: selectedRow.labDepMap };
          });
        }}
      >
        {selectedRow.labDepName}
      </h3>
    );
  }

  const setLocationlabel = (value) => {
    const { locationDetails } = ApplicationStore().getStorage('userDetails');
    setProgressState(() => {
      let newValue = value;
      if (locationDetails.facility_id) {
        newValue = 3;
      } else if (locationDetails.branch_id) {
        newValue = 2;
      } else if (locationDetails.location_id) {
        newValue = 1;
      } else {
        // locationAlerts({});
      }
      return newValue;
    });
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        <h3
          onClick={() => {
            const { locationDetails } = ApplicationStore().getStorage('userDetails');
            if (locationDetails.facility_id) {
              locationAlerts({facility_id: locationDetails.facility_id || props.locationDetails.facility_id});
            } else if (locationDetails.branch_id) {
              locationAlerts({branch_id: locationDetails.branch_id || props.locationDetails.branch_id});
            }else if (locationDetails.location_id) {
              locationAlerts({location_id: locationDetails.location_id || props.locationDetails.location_id});
            } else {
              locationAlerts({});
            }
            setLocationlabel(0);
            setDeviceCoordsList([]);
            setIsGeoMap(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          Location
        </h3>
        <h3
          onClick={() => {
            const { locationDetails } = ApplicationStore().getStorage('userDetails');
            if (locationDetails.facility_id) {
              locationAlerts({facility_id: locationDetails.facility_id || props.locationDetails.facility_id});
            } else if (locationDetails.branch_id) {
              locationAlerts({branch_id: locationDetails.branch_id || props.locationDetails.branch_id});
            } else {
              locationAlerts({location_id: locationDetails.location_id || props.locationDetails.location_id});
            }
            setLocationlabel(1);
            setDeviceCoordsList([]);
            setIsGeoMap(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.stateLabel}
        </h3>
        <h3
          onClick={() => {
            const { locationDetails } = ApplicationStore().getStorage('userDetails');
            if (locationDetails.facility_id) {
              locationAlerts({facility_id: locationDetails.facility_id || props.locationDetails.facility_id});
            } else {
              locationAlerts({branch_id: locationDetails.branch_id || props.locationDetails.branch_id});
            }
            setLocationlabel(2);
            setDeviceCoordsList([]);
            setIsGeoMap(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.branchLabel}
        </h3>
        <h3
          onClick={() => {
            const { locationDetails } = ApplicationStore().getStorage('userDetails');
            locationAlerts({facility_id: locationDetails.facility_id || props.locationDetails.facility_id});
            setProgressState(3);
            setDeviceCoordsList([]);
            setIsGeoMap(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.facilityLabel}
        </h3>
        <h3
          onClick={() => {
            const { locationDetails } = ApplicationStore().getStorage('userDetails');
            locationAlerts({building_id: locationDetails.building_id || props.locationDetails.building_id});
            setProgressState(4);
            setDeviceCoordsList([]);
            setImg(siteImages.buildingImage);
            setIsGeoMap(false);
          }}
          style={{ cursor: 'pointer' }}
        >
          {breadCrumbLabels.buildingLabel}
        </h3>
        <Typography
          underline="hover"
          color="inherit"
        >
          {breadCrumbLabels.floorLabel}
        </Typography>
      </Breadcrumbs>
      <DataGrid
        rows={dataList}
        columns={dataColumns}
        loading={isLoading}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${80}%` }}
      />
    </div>
  );
}

export default LabGridComponent;
