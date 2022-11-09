/* eslint-disable max-len */
import ApplicationStore from '../utils/localStorageUtil';

const _fetchServiceDownloadCsvData = (PATH, serviceMethod, data, successCallback, errorCallBack) => {
  const { user_token, userDetails } = ApplicationStore().getStorage('userDetails');
  const END_POINT = 'https://wisething.in/aideaLabs/api/';
  const { emailId, userRole, companyCode } = userDetails;

  const headers = {
    'Content-Type': 'blob',
    authorization: `Bearer ${user_token}`,
    companyCode: `${companyCode}`,
    userId: `${emailId}`,
    userRole: `${userRole}`,
    responseType: 'arraybuffer',
  };

  const body = (serviceMethod === 'GET') || (serviceMethod === 'DELETE') ? {} : { body: JSON.stringify(data) };

  const bodyParameters = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers,
    ...body,
  };

  const bodyObject = {
    method: serviceMethod,
    ...bodyParameters,
  };

  let filename = '';

  return fetch(END_POINT + PATH, bodyObject)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      const contentDisposition = response.headers.get('Content-Disposition');
      filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
      // var filename = `${Date.now()}.xlsx`; //contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
      return response.blob();
    })
    .then((dataResponse) => {
      successCallback(dataResponse);
      if (dataResponse != null) {
        const url = window.URL.createObjectURL(dataResponse);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        // a.remove();
      }
    })
    .catch((error) => {
      error.errorObject.then((errorResponse) => {
        if (error.errorStatus === 401 && errorResponse.message === 'Unable to access the page, Token Expired') {
          ApplicationStore().clearStorage();
          /* eslint-disable-next-line */
          location.reload();
        }
        errorCallBack(error.errorStatus, errorResponse.message);
      });
    });
};

export const DownloadReportAlarmCsv = (data, successCallback, errorCallBack) => {
  const { deviceId } = data;
  const { fromDate } = data;
  const { toDate } = data;
  return _fetchServiceDownloadCsvData(`exportAlarm?=&deviceId=${deviceId}&fromDate=${fromDate}&toDate=${toDate}`, 'GET', {}, successCallback, errorCallBack);
};

export const DownloadReportBumpTestCsv = (data, successCallback, errorCallBack) => {
  const deviceId = data.device_id;
  const { fromDate } = data;
  const { toDate } = data;
  return _fetchServiceDownloadCsvData(`exportBumpTestCsv?=&deviceId=${deviceId}&fromDate=${fromDate}&toDate=${toDate}`, 'GET', {}, successCallback, errorCallBack);
};

export const DownloadReportAqiStatusCsv = (data, successCallback, errorCallBack) => {
  // const deviceId = data.device_id;
  const { location_id } = data;
  const { branch_id } = data;
  const { facility_id } = data;
  const { building_id } = data;
  const { floor_id } = data;
  const { lab_id } = data;
  return _fetchServiceDownloadCsvData(`exportAqiStatusReport?=&location_id=${location_id}&branch_id=${branch_id}&facility_id=${facility_id}&building_id=${building_id}&floor_id=${floor_id}&lab_id=${lab_id}`, 'GET', {}, successCallback, errorCallBack);
};

export const DownloadReportSensorLogCsv = (data, successCallback, errorCallBack) => {
  const { deviceId } = data;
  const { fromDate } = data;
  const { toDate } = data;
  return _fetchServiceDownloadCsvData(`exportSensorLogCsv?=&deviceId=${deviceId}&fromDate=${fromDate}&toDate=${toDate}`, 'GET', {}, successCallback, errorCallBack);
};

export const DownloadReportAqiCsv = (data, successCallback, errorCallBack) => {
  const { labId } = data;
  const { fromDate } = data;
  const { toDate } = data;
  return _fetchServiceDownloadCsvData(`aqiReportExport?=&deviceId=${labId}&fromDate=${fromDate}&toDate=${toDate}`, 'GET', {}, successCallback, errorCallBack);
};

export const serverUtiliExport = (data, successCallback, errorCallBack) => {
  const { labId } = data;
  const { fromDate } = data;
  const { toDate } = data;
  return _fetchServiceDownloadCsvData(`serverUtiliExport`, 'GET', {}, successCallback, errorCallBack);
};
