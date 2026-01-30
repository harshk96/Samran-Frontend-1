// import {useState, useEffect} from "react";
// import {Modal, Button, FormLabel, Row, Col, Nav, Tab} from "react-bootstrap";
// import {CustomSelectWhite} from "../../custom/select/CustomSelectWhite";
// import APICallService from "../../../api/apiCallService";
// import {PLANT, USER} from "../../../api/apiEndPoints";
// import {USERAPIJSON} from "../../../api/apiJSON/user";
// import {ListUser} from "../../../types/response_data/user";
// import Loader from "../../../global/loader";
// import {error, success} from "../../../global/toast";
// import Method from "../../../utils/methods";

// interface Option {
//     value: string;
//     label: string;
// }

// interface PlantDownloadReportModalProps {
//     show: boolean;
//     onHide: () => void;
//     loading?: boolean;
// }

// const RequisitionDownloadReportModal: React.FC<PlantDownloadReportModalProps> = ({
//     show,
//     onHide,
//     loading = false,
// }) => {
//     const [activeTab, setActiveTab] = useState<string>("all");
//     const [userOptions, setUserOptions] = useState<Option[]>([]);
//     const [consumerUsers, setConsumerUsers] = useState<Option[]>([]);
//     const [investorUsers, setInvestorUsers] = useState<Option[]>([]);
//     const [selectedUser, setSelectedUser] = useState<Option | null>(null);
//     const [selectedConsumer, setSelectedConsumer] = useState<Option | null>(null);
//     const [selectedInvestor, setSelectedInvestor] = useState<Option | null>(null);
//     const [userLoading, setUserLoading] = useState(false);
//     const [consumerLoading, setConsumerLoading] = useState(false);
//     const [InvestorLoading, setInvestorLoading] = useState(false);
//     const [downloadLoading, setDownloadLoading] = useState(false);

//     useEffect(() => {
//         if (show) {
//             if (activeTab === "user") {
//                 fetchUsers();
//             } 
//             // else if (activeTab === "consumer") {
//             //     fetchUsers("consumer");
//             // } else if (activeTab === "supervisor") {
//             //     fetchUsers("supervisor");
//             // }
//         } else {
//             // Reset state when modal closes
//             setActiveTab("all");
//             setSelectedUser(null);
//             // setSelectedSite(null);
//             // setSelectedEmployee(null);
//             // setSelectedSupervisor(null);
//             // setJobOptions([]);
//             // setSiteOptions([]);
//             // setEmployeeUsers([]);
//             // setSupervisorUsers([]);
//         }
//     }, [show, activeTab]);

//     // const fetchUsers = async () => {
//     //     setJobLoading(true);
//     //     const params = {
//     //         page: 1,
//     //         limit: 1000,
//     //         sortKey: "_createdAt",
//     //         sortOrder: -1,
//     //         needCount: false,
//     //     };
//     //     const apiService = new APICallService(JOB.LISTJOBS, JOBAPIJSON.listJobs(params));
//     //     const response = await apiService.callAPI();

//     //     if (response && response.records) {
//     //         const jobList = response.records.map((job: any) => ({
//     //             value: job._id,
//     //             label: job.name,
//     //         }));
//     //         setJobOptions(jobList);
//     //     } else {
//     //         setJobOptions([]);
//     //     }
//     //     setJobLoading(false);
//     // };

//     // const fetchSites = async () => {
//     //     setSiteLoading(true);
//     //     const params = {
//     //         page: 1,
//     //         limit: 1000,
//     //         sortKey: "_createdAt",
//     //         sortOrder: -1,
//     //         needCount: false,
//     //     };
//     //     const apiService = new APICallService(SITE.LISTSITE, SITEAPIJSON.listSites(params));
//     //     const response = await apiService.callAPI();

//     //     if (response && response.records) {
//     //         const siteList = response.records.map((site: any) => ({
//     //             value: site._id,
//     //             label: site.name,
//     //         }));
//     //         setSiteOptions(siteList);
//     //     } else {
//     //         setSiteOptions([]);
//     //     }
//     //     setSiteLoading(false);
//     // };

//     const fetchUsers = async (pageNo: number, limit: number, searchTerm: string = '') => {
//         setUserLoading(true);
//         const params = {
//             page: pageNo,
//             limit: limit,
//             sortKey: '_createdAt',
//             sortOrder: -1,
//             needCount: true,
//             searchTerm: searchTerm ? searchTerm : undefined,
//         }
//         const apiService = new APICallService(USER.LISTUSER, USERAPIJSON.listUser(params));
//         const response = await apiService.callAPI();
//         if (response && response.records) {
//             const options = response.records.map((user: any) => ({
//                 value: user._id,
//                 label: `${user.name}`
//             }));
//             setUserOptions(options);
//         } else {
//             setUserOptions([]);
//         }
//         setUserLoading(false);
//     }

//     const handleDownload = async () => {
//         setDownloadLoading(true);
//         try {
//             const params: any = {};

//             if (activeTab === "user" && selectedUser) {
//                 params.userId = selectedUser.value;
//             } 
//             // else if (activeTab === "site" && selectedSite) {
//             //     params.siteId = selectedSite.value;
//             // } else if (activeTab === "employee" && selectedEmployee) {
//             //     params.userId = selectedEmployee.value;
//             // } else if (activeTab === "supervisor" && selectedSupervisor) {
//             //     params.userId = selectedSupervisor.value;
//             // }
//             // For "all" tab, no parameters are passed

//             const apiService = new APICallService(PLANT.DOWNLOADREPORT, params, undefined, "arraybuffer");
//             const response = await apiService.callAPI();

//             if (response) {
//                 const blob = new Blob([response], {
//                     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//                 });
//                 const url = URL.createObjectURL(blob);
//                 const link = document.createElement("a");
//                 link.href = url;
//                 const dateStr = Method.convertDateToFormat(new Date().toISOString(), "DD-MM-YYYY");
//                 link.download = `material-request-report-${dateStr}.xlsx`;
//                 link.click();
//                 URL.revokeObjectURL(url);
//                 success("Material request report downloaded successfully");
//                 handleClose();
//             } else {
//                 error("Failed to download report");
//             }
//         } catch (err) {
//             console.error("Error downloading material request report:", err);
//             error("Failed to download report");
//         } finally {
//             setDownloadLoading(false);
//         }
//     };

//     const handleClose = () => {
//         setActiveTab("all");
//         setSelectedJob(null);
//         setSelectedSite(null);
//         setSelectedEmployee(null);
//         setSelectedSupervisor(null);
//         setJobOptions([]);
//         setSiteOptions([]);
//         setEmployeeUsers([]);
//         setSupervisorUsers([]);
//         onHide();
//     };

//     const canDownload = () => {
//         if (activeTab === "all") {
//             return true;
//         } else if (activeTab === "job") {
//             return selectedJob !== null;
//         } else if (activeTab === "site") {
//             return selectedSite !== null;
//         } else if (activeTab === "employee") {
//             return selectedEmployee !== null;
//         } else if (activeTab === "supervisor") {
//             return selectedSupervisor !== null;
//         }
//         return false;
//     };

//     return (
//         <Modal show={show} onHide={handleClose} centered backdrop="static" keyboard={false} size="lg">
//             <Modal.Header className="border-bottom-0 pb-0 d-flex justify-content-between">
//                 <Modal.Title className="fs-20">Download Material Request Report</Modal.Title>
//                 <Button
//                     variant="link"
//                     className="p-0"
//                     onClick={handleClose}
//                     style={{
//                         width: "32px",
//                         height: "32px",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                     }}
//                 >
//                     <span className="fs-24 fw-bold text-dark">&times;</span>
//                 </Button>
//             </Modal.Header>

//             <Modal.Body>
//                 <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || "all")}>
//                     <Nav variant="tabs" className="border-bottom mb-4">
//                         <Nav.Item>
//                             <Nav.Link eventKey="all" className="fs-16 fw-500">
//                                 All
//                             </Nav.Link>
//                         </Nav.Item>
//                         <Nav.Item>
//                             <Nav.Link eventKey="job" className="fs-16 fw-500">
//                                 Job
//                             </Nav.Link>
//                         </Nav.Item>
//                         <Nav.Item>
//                             <Nav.Link eventKey="site" className="fs-16 fw-500">
//                                 Site
//                             </Nav.Link>
//                         </Nav.Item>
//                         <Nav.Item>
//                             <Nav.Link eventKey="employee" className="fs-16 fw-500">
//                                 Employee
//                             </Nav.Link>
//                         </Nav.Item>
//                         <Nav.Item>
//                             <Nav.Link eventKey="supervisor" className="fs-16 fw-500">
//                                 Supervisor
//                             </Nav.Link>
//                         </Nav.Item>
//                     </Nav>

//                     <Tab.Content>
//                         <Tab.Pane eventKey="all">
//                             <Row>
//                                 <Col xs={12}>
//                                     <div className="fs-16 fw-500 text-dark">
//                                         Download report for all material requests without any filters.
//                                     </div>
//                                 </Col>
//                             </Row>
//                         </Tab.Pane>

//                         <Tab.Pane eventKey="job">
//                             <Row>
//                                 <Col xs={12}>
//                                     <FormLabel className="fs-16 fw-500 text-dark required">Select Job</FormLabel>
//                                     {jobLoading ? (
//                                         <div className="w-100 d-flex justify-content-center text-center py-4">
//                                             <Loader loading={true} />
//                                         </div>
//                                     ) : (
//                                         <CustomSelectWhite
//                                             placeholder="Select Job"
//                                             options={jobOptions}
//                                             isMulti={false}
//                                             onChange={(selected: Option | null) => setSelectedJob(selected)}
//                                             value={selectedJob}
//                                             loading={jobLoading}
//                                             minHeight="auto"
//                                             controlFontSize="14px"
//                                             fontWeight="500"
//                                         />
//                                     )}
//                                 </Col>
//                             </Row>
//                         </Tab.Pane>

//                         <Tab.Pane eventKey="site">
//                             <Row>
//                                 <Col xs={12}>
//                                     <FormLabel className="fs-16 fw-500 text-dark required">Select Site</FormLabel>
//                                     {siteLoading ? (
//                                         <div className="w-100 d-flex justify-content-center text-center py-4">
//                                             <Loader loading={true} />
//                                         </div>
//                                     ) : (
//                                         <CustomSelectWhite
//                                             placeholder="Select Site"
//                                             options={siteOptions}
//                                             isMulti={false}
//                                             onChange={(selected: Option | null) => setSelectedSite(selected)}
//                                             value={selectedSite}
//                                             loading={siteLoading}
//                                             minHeight="auto"
//                                             controlFontSize="14px"
//                                             fontWeight="500"
//                                         />
//                                     )}
//                                 </Col>
//                             </Row>
//                         </Tab.Pane>

//                         <Tab.Pane eventKey="employee">
//                             <Row>
//                                 <Col xs={12}>
//                                     <FormLabel className="fs-16 fw-500 text-dark required">Select Employee</FormLabel>
//                                     {employeeLoading ? (
//                                         <div className="w-100 d-flex justify-content-center text-center py-4">
//                                             <Loader loading={true} />
//                                         </div>
//                                     ) : (
//                                         <CustomSelectWhite
//                                             placeholder="Select Employee"
//                                             options={employeeUsers}
//                                             isMulti={false}
//                                             onChange={(selected: Option | null) => setSelectedEmployee(selected)}
//                                             value={selectedEmployee}
//                                             loading={employeeLoading}
//                                             minHeight="auto"
//                                             controlFontSize="14px"
//                                             fontWeight="500"
//                                         />
//                                     )}
//                                 </Col>
//                             </Row>
//                         </Tab.Pane>

//                         <Tab.Pane eventKey="supervisor">
//                             <Row>
//                                 <Col xs={12}>
//                                     <FormLabel className="fs-16 fw-500 text-dark required">Select Supervisor</FormLabel>
//                                     {supervisorLoading ? (
//                                         <div className="w-100 d-flex justify-content-center text-center py-4">
//                                             <Loader loading={true} />
//                                         </div>
//                                     ) : (
//                                         <CustomSelectWhite
//                                             placeholder="Select Supervisor"
//                                             options={supervisorUsers}
//                                             isMulti={false}
//                                             onChange={(selected: Option | null) => setSelectedSupervisor(selected)}
//                                             value={selectedSupervisor}
//                                             loading={supervisorLoading}
//                                             minHeight="auto"
//                                             controlFontSize="14px"
//                                             fontWeight="500"
//                                         />
//                                     )}
//                                 </Col>
//                             </Row>
//                         </Tab.Pane>
//                     </Tab.Content>
//                 </Tab.Container>
//             </Modal.Body>

//             <Modal.Footer>
//                 {/* <Button variant="secondary" className="text-black" onClick={handleClose} disabled={downloadLoading}>
//                     Cancel
//                 </Button> */}
//                 <Button variant="primary" onClick={handleDownload} disabled={downloadLoading || !canDownload()}>
//                     {downloadLoading ? (
//                         <>
//                             Please wait...
//                             <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
//                         </>
//                     ) : (
//                         "Download Report"
//                     )}
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default RequisitionDownloadReportModal;
