import {useState, useEffect} from "react";
import {Modal, Button, FormLabel, Row, Col, Nav, Tab} from "react-bootstrap";
import {CustomSelectWhite} from "../../custom/select/CustomSelectWhite";
import APICallService from "../../../api/apiCallService";
import {PLANT, USER} from "../../../api/apiEndPoints";
import {USERAPIJSON} from "../../../api/apiJSON/user";
import Loader from "../../../global/loader";
import {error, success} from "../../../global/toast";
import Method from "../../../utils/methods";

interface Option {
    value: string;
    label: string;
}

interface PlantDownloadReportModalProps {
    show: boolean;
    onHide: () => void;
}

enum PlantStatus {
    Submitted = 1,
    Approved = 2,
    Rejected = 3,
}

const PLANT_STATUS_OPTIONS: Option[] = [
    { label: "Submitted", value: String(PlantStatus.Submitted) },
    { label: "Approved", value: String(PlantStatus.Approved) },
    { label: "Rejected", value: String(PlantStatus.Rejected) },
];

const PlantDownloadReportModal: React.FC<PlantDownloadReportModalProps> = ({
    show,
    onHide,
}) => {
    const [activeTab, setActiveTab] = useState<string>("all");

    const [userOptions, setUserOptions] = useState<Option[]>([]);
    const [selectedUser, setSelectedUser] = useState<Option | null>(null);
    const [selectedPlantStatus, setSelectedPlantStatus] = useState<Option | null>(null);

    const [userLoading, setUserLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);

    useEffect(() => {
        if (show && activeTab === "user") {
            fetchUsers();
        }

        if (!show) {
            resetState();
        }
    }, [show, activeTab]);

    const fetchUsers = async (
        pageNo: number = 1,
        limit: number = 20,
        searchTerm: string = ""
    ) => {
        try {
            setUserLoading(true);

            const params = {
                page: pageNo,
                limit,
                sortKey: "_createdAt",
                sortOrder: -1,
                needCount: true,
                searchTerm: searchTerm || undefined,
            };

            const apiService = new APICallService(
                USER.LISTUSER,
                USERAPIJSON.listUser(params)
            );

            const response = await apiService.callAPI();

            if (response?.records?.length) {
                const options = response.records.map((user: any) => ({
                    value: user._id,
                    label: user.name,
                }));
                setUserOptions(options);
            } else {
                setUserOptions([]);
            }
        } catch (err) {
            error("Failed to fetch users");
        } finally {
            setUserLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            setDownloadLoading(true);

            const params: any = {};

            if (activeTab === "user" && selectedUser) {
                params.userId = selectedUser.value;
            }

            if (activeTab === "plantStatus" && selectedPlantStatus) {
                params.plantStatus = Number(selectedPlantStatus.value);
            }

            const apiService = new APICallService(
                PLANT.DOWNLOADREPORT,
                params,
                undefined,
                "arraybuffer"
            );

            const response = await apiService.callAPI();
            if (!response) {
                error("Failed to download report");
                return;
            }

            const blob = new Blob([response], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            const dateStr = Method.convertDateToFormat(
                new Date().toISOString(),
                "DD-MM-YYYY"
            );

            link.href = url;
            link.download = `plant-report-${dateStr}.xlsx`;
            link.click();

            URL.revokeObjectURL(url);
            success("Plant report downloaded successfully");
            handleClose();
        } catch (err) {
            error("Failed to download report");
        } finally {
            setDownloadLoading(false);
        }
    };

    const handleClose = () => {
        resetState();
        onHide();
    };

    const resetState = () => {
        setActiveTab("all");
        setSelectedUser(null);
        setSelectedPlantStatus(null);
        setUserOptions([]);
    };

    const canDownload = () => {
        if (activeTab === "user") {
            return !!selectedUser;
        }

        if (activeTab === "plantStatus") {
            return !!selectedPlantStatus;
        }

        return true;
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <Modal.Header className="border-bottom-0 pb-0 d-flex justify-content-between">
                <Modal.Title className="fs-20">
                    Download Plant Report
                </Modal.Title>

                <Button variant="link" className="p-0" onClick={handleClose}>
                    <span className="fs-24 fw-bold text-dark">&times;</span>
                </Button>
            </Modal.Header>

            <Modal.Body>
                <Tab.Container
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k || "all")}
                >
                    <Nav variant="tabs" className="border-bottom mb-4">
                        <Nav.Item>
                            <Nav.Link eventKey="all" className="fs-16 fw-500">
                                All Plants
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="user" className="fs-16 fw-500">
                                User
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="plantStatus" className="fs-16 fw-500">
                                Plant's Status
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content>
                        <Tab.Pane eventKey="all">
                            <Row>
                                <Col xs={12}>
                                    <div className="fs-16 fw-500 text-dark">
                                        Download report for all plants without any filters.
                                    </div>
                                </Col>
                            </Row>
                        </Tab.Pane>

                        <Tab.Pane eventKey="user">
                            <Row>
                                <Col xs={12}>
                                    <FormLabel className="fs-16 fw-500 text-dark required">
                                        Select User
                                    </FormLabel>

                                    {userLoading ? (
                                        <div className="w-100 d-flex justify-content-center py-4">
                                            <Loader loading />
                                        </div>
                                    ) : (
                                        <CustomSelectWhite
                                            placeholder="Select User"
                                            options={userOptions}
                                            isMulti={false}
                                            value={selectedUser}
                                            onChange={(val: Option | null) =>
                                                setSelectedUser(val)
                                            }
                                            loading={userLoading}
                                        />
                                    )}
                                </Col>
                            </Row>
                        </Tab.Pane>

                        <Tab.Pane eventKey="plantStatus">
                            <Row>
                                <Col xs={12}>
                                    <FormLabel className="fs-16 fw-500 text-dark required">
                                        Select Plant Status
                                    </FormLabel>

                                    <CustomSelectWhite
                                        placeholder="Select Plant Status"
                                        options={PLANT_STATUS_OPTIONS}
                                        isMulti={false}
                                        value={selectedPlantStatus}
                                        onChange={(val: Option | null) =>
                                            setSelectedPlantStatus(val)
                                        }
                                    />
                                </Col>
                            </Row>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={handleDownload}
                    disabled={!canDownload() || downloadLoading}
                >
                    {downloadLoading ? (
                        <>
                            Please wait...
                            <span className="spinner-border spinner-border-sm ms-2" />
                        </>
                    ) : (
                        "Download Report"
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PlantDownloadReportModal;
