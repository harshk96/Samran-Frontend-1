// import React, { useState } from 'react';
// import { Card, Row, Col } from 'react-bootstrap';
// // import PlantDownloadReportModal from '../manage-job/JobDownloadReportModal';
// import RequisitionDownloadReportModal from '../requisitions/RequisitionDownloadReportModal';
// import DateRangeReportModal from '../modals/DateRangeReportModal';
// import APICallService from '../../../api/apiCallService';
// import { PLANT, Bill } from '../../../api/apiEndPoints';
// import Method from '../../../utils/methods';
// import { error, success } from '../../../global/toast';

// type ReportType =
//     | 'Plant-report'
//     | 'bill-report'

// const Reports: React.FC = () => {
//   const [activeModal, setActiveModal] = useState<ReportType | null>(null);
//   const [downloadLoading, setDownloadLoading] = useState(false);

//   const handleGasBottleDownload = async (startDate: Date, endDate: Date) => {
//     setDownloadLoading(true);
//     try {
//       const params = {
//         startDate: Method.convertDateToFormat(
//           startDate.toISOString(),
//           'YYYY-MM-DD'
//         ),
//         endDate: Method.convertDateToFormat(
//           endDate.toISOString(),
//           'YYYY-MM-DD'
//         ),
//       };
//       const apiService = new APICallService(
//         GAS_BOTTLE.DOWNLOADREPORT,
//         params,
//         undefined,
//         'arraybuffer'
//       );
//       const response = await apiService.callAPI();

//       if (response) {
//         const blob = new Blob([response], {
//           type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = `gas-bottle-report-${Method.convertDateToFormat(
//           startDate.toISOString(),
//           'DD-MM-YYYY'
//         )}-to-${Method.convertDateToFormat(
//           endDate.toISOString(),
//           'DD-MM-YYYY'
//         )}.xlsx`;
//         link.click();
//         URL.revokeObjectURL(url);
//         success('Gas bottle report downloaded successfully');
//         setActiveModal(null);
//       } else {
//         error('Failed to download report');
//       }
//     } catch (err) {
//       console.error('Error downloading gas bottle report:', err);
//       error('Failed to download report');
//     } finally {
//       setDownloadLoading(false);
//     }
//   };

//   const handleLaborDistributionDownload = async (start: Date, end: Date) => {
//     setDownloadLoading(true);
//     try {
//       const payload = {
//         startDate: Method.convertDateToFormat(
//           start.toISOString(),
//           'YYYY-MM-DD'
//         ),
//         endDate: Method.convertDateToFormat(end.toISOString(), 'YYYY-MM-DD'),
//       };
//       const apiService = new APICallService(
//         TIMESHEET.DOWNLOAD_LABOR_DISTRIBUTION,
//         payload,
//         undefined,
//         'arraybuffer'
//       );
//       const response = await apiService.callAPI();

//       if (response) {
//         const blob = new Blob([response], {
//           type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = `labor-distribution-${Method.convertDateToFormat(
//           start.toISOString(),
//           'DD-MM-YYYY'
//         )}-to-${Method.convertDateToFormat(
//           end.toISOString(),
//           'DD-MM-YYYY'
//         )}.xlsx`;
//         link.click();
//         URL.revokeObjectURL(url);
//         success('Labor distribution report downloaded successfully');
//         setActiveModal(null);
//       } else {
//         error('Failed to download labor distribution report');
//       }
//     } catch (err) {
//       console.error('Error downloading labor distribution report:', err);
//       error('Failed to download labor distribution report');
//     } finally {
//       setDownloadLoading(false);
//     }
//   };

//   const handleJobWiseHoursDownload = async (start: Date, end: Date) => {
//     setDownloadLoading(true);
//     try {
//       const params = {
//         startDate: Method.convertDateToFormat(
//           start.toISOString(),
//           'YYYY-MM-DD'
//         ),
//         endDate: Method.convertDateToFormat(end.toISOString(), 'YYYY-MM-DD'),
//       };
//       const apiService = new APICallService(
//         JOB.DOWNLOAD_JOB_WISE_HOURS,
//         params,
//         undefined,
//         'arraybuffer'
//       );
//       const response = await apiService.callAPI();

//       if (response) {
//         const blob = new Blob([response], {
//           type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = `job-wise-hours-${Method.convertDateToFormat(
//           start.toISOString(),
//           'DD-MM-YYYY'
//         )}-to-${Method.convertDateToFormat(
//           end.toISOString(),
//           'DD-MM-YYYY'
//         )}.xlsx`;
//         link.click();
//         URL.revokeObjectURL(url);
//         success('Job-wise hours report downloaded successfully');
//         setActiveModal(null);
//       } else {
//         error('Failed to download job-wise hours report');
//       }
//     } catch (err) {
//       console.error('Error downloading job-wise hours report:', err);
//       error('Failed to download job-wise hours report');
//     } finally {
//       setDownloadLoading(false);
//     }
//   };

//   const handleGrossPayrollDownload = async (start: Date, end: Date) => {
//     setDownloadLoading(true);
//     try {
//       const payload = {
//         startDate: Method.convertDateToFormat(
//           start.toISOString(),
//           'YYYY-MM-DD'
//         ),
//         endDate: Method.convertDateToFormat(end.toISOString(), 'YYYY-MM-DD'),
//       };

//       const apiService = new APICallService(
//         TIMESHEET.DOWNLOAD_GROSS_WEEKLY_PAYROLL,
//         payload,
//         undefined,
//         'arraybuffer'
//       );

//       const response = await apiService.callAPI();

//       if (response) {
//         const blob = new Blob([response], {
//           type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = `gross-weekly-payroll-${Method.convertDateToFormat(
//           start.toISOString(),
//           'DD-MM-YYYY'
//         )}-to-${Method.convertDateToFormat(
//           end.toISOString(),
//           'DD-MM-YYYY'
//         )}.xlsx`;
//         link.click();
//         URL.revokeObjectURL(url);
//         success('Gross Weekly Payroll report downloaded successfully');
//         setActiveModal(null);
//       } else {
//         error('Failed to download payroll report');
//       }
//     } catch (err) {
//       console.error('Error downloading payroll report:', err);
//       error('Failed to download payroll report');
//     } finally {
//       setDownloadLoading(false);
//     }
//   };

//   const reports = [
//     {
//       id: 'job-allocation' as ReportType,
//       title: 'Job Allocation Report',
//       description:
//         'Download comprehensive reports on job allocations. Filter by employee or supervisor.',
//       icon: 'bi-file-earmark-bar-graph',
//       color: '#1B74E4',
//       bgColor: '#E8F2FE',
//     },
//     {
//       id: 'material-request' as ReportType,
//       title: 'Material Request Report',
//       description:
//         'Generate detailed reports on material requests. Filter by job, site, employee, or supervisor.',
//       icon: 'bi-cart-check',
//       color: '#50CD89',
//       bgColor: '#E8FFF3',
//     },
//     {
//       id: 'gas-bottle' as ReportType,
//       title: 'Gas Bottle Report',
//       description:
//         'Download gas bottle usage and allocation reports for a specified date range.',
//       icon: 'bi-fuel-pump',
//       color: '#F1416C',
//       bgColor: '#FFF5F8',
//     },
//     {
//       id: 'labor-distribution' as ReportType,
//       title: 'Labor Distribution Report',
//       description:
//         'Analyze workforce allocation across different jobs, sites, and time periods.',
//       icon: 'bi-people-fill',
//       color: '#7239EA',
//       bgColor: '#F8F5FF',
//     },
//     {
//       id: 'job-wise-hours' as ReportType,
//       title: 'Job-wise Hours Report',
//       description:
//         'Track time allocation and analyze labor costs across different projects.',
//       icon: 'bi-clock-history',
//       color: '#FFC700',
//       bgColor: '#FFF8DD',
//     },
//     {
//       id: 'gross-weekly-payroll' as ReportType,
//       title: 'Gross Weekly Payroll Report',
//       description:
//         'Weekly payroll report with employee details, hours, overtime, lodge, mileage and total gross earnings.',
//       icon: 'bi-currency-dollar',
//       color: '#00C9A7',
//       bgColor: '#E8FFF9',
//     },
//   ];

//   return (
//     <div className="p-9 bg-light">
//       <Row className="mb-6">
//         <Col xs={12}>
//           <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
//             <div className="d-flex align-items-center">
//               <h1 className="fs-22 mt-2 fw-bolder">Reports</h1>
//               <div className="badge badge-primary ms-3 rounded-pill">
//                 <span className="p-1 fs-14 text-white">{reports.length}</span>
//               </div>
//             </div>
//           </div>
//           <p className="text-muted fs-16 mb-0">
//             Access and download various reports to analyze your business
//             operations
//           </p>
//         </Col>
//       </Row>

//       <Row className="g-6">
//         {reports.map((report) => (
//           <Col
//             key={report.id}
//             xs={12}
//             md={6}
//             xl={4}
//           >
//             <Card className="border-0 shadow-sm h-100">
//               <Card.Body className="p-6 d-flex flex-column">
//                 <div
//                   className="d-flex align-items-center justify-content-center rounded-circle mb-4"
//                   style={{
//                     width: '64px',
//                     height: '64px',
//                     backgroundColor: report.bgColor,
//                   }}
//                 >
//                   <i
//                     className={`${report.icon} fs-2x`}
//                     style={{ color: report.color }}
//                   ></i>
//                 </div>
//                 <h4 className="fw-bold mb-3">{report.title}</h4>
//                 <p className="text-muted fs-15 mb-4 flex-grow-1">
//                   {report.description}
//                 </p>
//                 <button
//                   className="btn btn-primary w-100"
//                   onClick={() => setActiveModal(report.id)}
//                 >
//                   <i className="bi bi-download me-2"></i>
//                   Download Report
//                 </button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Modals */}
//       <JobDownloadReportModal
//         show={activeModal === 'job-allocation'}
//         onHide={() => setActiveModal(null)}
//       />

//       <RequisitionDownloadReportModal
//         show={activeModal === 'material-request'}
//         onHide={() => setActiveModal(null)}
//       />

//       <DateRangeReportModal
//         show={activeModal === 'gas-bottle'}
//         onHide={() => setActiveModal(null)}
//         onDownload={handleGasBottleDownload}
//         loading={downloadLoading}
//         title="Download Gas Bottle Report"
//         fieldLabel="Select Date Range"
//         submitLabel="Download Report"
//         minDate={new Date('2023-01-01')}
//       />

//       <DateRangeReportModal
//         show={activeModal === 'labor-distribution'}
//         onHide={() => setActiveModal(null)}
//         onDownload={handleLaborDistributionDownload}
//         loading={downloadLoading}
//         title="Download Labor Distribution"
//         fieldLabel="Select Date Range"
//         submitLabel="Download Report"
//         minDate={new Date('2023-01-01')}
//       />

//       <DateRangeReportModal
//         show={activeModal === 'job-wise-hours'}
//         onHide={() => setActiveModal(null)}
//         onDownload={handleJobWiseHoursDownload}
//         loading={downloadLoading}
//         title="Download Job-wise Hours Report"
//         fieldLabel="Select Date Range"
//         submitLabel="Download Report"
//         minDate={new Date('2023-01-01')}
//       />
//       <DateRangeReportModal
//         show={activeModal === 'gross-weekly-payroll'}
//         onHide={() => setActiveModal(null)}
//         onDownload={handleGrossPayrollDownload}
//         loading={downloadLoading}
//         title="Gross Weekly Payroll Report"
//         fieldLabel="Select Week (Monday to Sunday)"
//         submitLabel="Download Payroll Report"
//         minDate={new Date('2023-01-01')}
//       />
//     </div>
//   );
// };

// export default Reports;
