import React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import Method from "../../../utils/methods";
import { Months, PlantStatus, PropertyTypes } from "../../../utils/constants";
import PlaceholderLogo from "../../../_admin/assets/media/svg/placeholder.svg";

const ViewBill = () => {
    const navigate = useNavigate();
    const {state}: any = useLocation();
    
    const formatDate = (dateString: string): string => {
        return Method.convertDateToFormat(dateString, "DD-MM-YYYY");
    };
    
    const handleBack = () => {
        navigate("/bill/all-bills");
    };
    
    if (!state) {
        return (
            <div className="p-9 bg-light d-flex justify-content-center align-items-center" style={{minHeight: "400px"}}>
                <Card className="border bg-white shadow-sm">
                    <Card.Body className="p-6">
                        <div className="text-center">
                            <i className="bi bi-file-earmark-x fs-48 text-muted mb-3"></i>
                            <p className="fs-16 fw-500 text-muted mb-0">No Bill data available.</p>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    const InfoCard = ({
        icon,
        label,
        value,
        className = "",
    }: {
        icon: string;
        label: string;
        value: string | React.ReactNode;
        className?: string;
    }) => (
        <div className={`bg-light rounded p-4 mb-4 ${className}`} style={{border: "1px solid #e4e6ef"}}>
            <div className="d-flex align-items-center mb-2">
                <i className={icon} style={{fontSize: "20px", color: "#1b74e4", marginRight: "12px"}}></i>
                <h6 className="fs-14 fw-600 text-muted mb-0">{label}</h6>
            </div>
            <div style={{marginLeft: "32px"}}>
                <p className="fs-16 fw-600 text-dark mb-0">{value || "—"}</p>
            </div>
        </div>
    );
    
    return (
        <div className="p-9 bg-light">
            <Row className="mb-6">
                <Col xs={12}>
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center gap-3">
                            <Button
                                variant="light"
                                className="p-0"
                                onClick={handleBack}
                                style={{border: "none", background: "transparent"}}
                            >
                                <i className="bi bi-arrow-left fs-24 text-dark"></i>
                            </Button>
                            <h1 className="fs-22 fw-bolder mb-0">Bill Details</h1>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className="g-6">
                {/* Bill Information Card */}
                <Col md={5}>
                    <Card className="border bg-white shadow-sm h-100">
                        <Card.Header className="bg-light border-bottom-0 pb-0">
                            <h5 className="fs-18 fw-bold text-dark mb-0 d-flex align-items-center">
                                <i className="bi bi-info-circle me-2 text-primary"></i>
                                    Bill Information
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-6">
                            <InfoCard icon="bi bi-award" label="Billing Year" value={state?.billingYear || "—"} />
                            <InfoCard
                                icon="bi bi-award"
                                label="Billing Month"
                                value={
                                    Object.keys(Months).find(
                                    key => Months[key as keyof typeof Months] === state?.billingMonth
                                    ) ?? "—"
                                }
                            />
                            <InfoCard icon="bi bi-award" label="Generated Units" value={state?.generatedUnits || "—"} />
                            <InfoCard icon="bi bi-award" label="Consumed Units" value={state?.consumedUnits || "—"} />
                            <InfoCard icon="bi bi-award" label="Exported Units" value={state?.exportedUnits || "—"} />
                            <InfoCard icon="bi bi-award" label="Total Amount" value={state?.totalAmount || "—"} />
                        </Card.Body>
                    </Card>
                </Col>

                {/* PPA Plant Information Card */}
                <Col md={7}>
                    <Card className="border bg-white shadow-sm mb-2">
                        <Card.Header className="bg-light border-bottom-0 pt-6">
                            <h5 className="fs-18 fw-bold text-dark mb-0 pb-0">
                                <i className="bi bi-clock-history me-3 text-primary"></i>
                                Payment History
                            </h5>
                        </Card.Header>
                        <Card.Body className="pt-4 pb-0">
                            <div className="timeline timeline-3">
                                <div className="timeline-item d-flex align-items-start mb-0">
                                    <div className="timeline-icon symbol symbol-circle symbol-40px me-5">
                                        <div className="symbol-label bg-light-primary">
                                        <i className="bi bi-upload text-primary fs-4"></i>
                                        </div>
                                    </div>
                                <div className="timeline-content">
                                    {state?.isPaid ? (
                                        <>
                                            <p className="fw-bold fs-16 mb-0">Paid</p>
                                            <p className="text-muted fs-14 mb-0">
                                                {Method.convertDateToFormat(
                                                    state?.paymentDate,
                                                    'dddd, DD MMMM YYYY [at] hh:mm A'
                                                )}
                                            </p>
                                            <p className="text-muted fs-14 mb-0">
                                                By { Method.getUserPaymentMethodLabel(state?.userPaymentMethod) }
                                            </p>
                                        </>
                                    ) : (
                                        <p className="fw-bold text-danger fs-16">Unpaid</p>
                                    )}
                                </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className="border bg-white shadow-sm h-30 mb-5">
                        <Card.Header className="bg-light border-bottom-0 pb-0">
                            <h5 className="fs-18 fw-bold text-dark mb-0 d-flex align-items-center">
                                <i className="bi bi-info-circle me-2 text-primary"></i>
                                    PPA Information
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-6">
                            <InfoCard icon="bi bi-award" label="PPA Id" value={state?.ppaDetail?.ppaUniqueId || "—"} />
                            <InfoCard icon="bi bi-award" label="PPA Name" value={state?.ppaDetail?.ppaName || "—"} />
                        </Card.Body>
                    </Card>
                    
                    <Card className="border bg-white shadow-sm h-30">
                        <Card.Header className="bg-light border-bottom-0 pb-0">
                            <h5 className="fs-18 fw-bold text-dark mb-0 d-flex align-items-center">
                                <i className="bi bi-info-circle me-2 text-primary"></i>
                                    Plant Information
                            </h5>
                        </Card.Header>
                        <Card.Body className="p-6">
                            <InfoCard icon="bi bi-award" label="Plant Id" value={state?.ppaDetail?.plantUniqueId || "—"} />
                            <InfoCard icon="bi bi-award" label="Plant's Unique Name" value={state?.ppaDetail?.plantUniqueName || "—"} />
                            <InfoCard icon="bi bi-award" label="Plant's Capacity" value={state?.ppaDetail?.plantCapacity || "—"} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ViewBill;

 