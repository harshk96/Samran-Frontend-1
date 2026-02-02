import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import PlantDownloadReportModal from '../manage-plant/PlantReportDownloadModal';
// import RequisitionDownloadReportModal from '../requisitions/RequisitionDownloadReportModal';
// import DateRangeReportModal from '../modals/DateRangeReportModal';
import APICallService from '../../../api/apiCallService';
import { PLANT, Bill } from '../../../api/apiEndPoints';
import Method from '../../../utils/methods';
import { error, success } from '../../../global/toast';
import BillDownloadReportModal from '../manage-bill/BillReportDownload';

type ReportType =
    | 'plant-report'
    | 'bill-report'

const Reports: React.FC = () => {
    const [activeModal, setActiveModal] = useState<ReportType | null>(null);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const reports = [
        {
            id: 'plant-report' as ReportType,
            title: 'Plant Report',
            description: 'Download detailed plant reports of added plants, with filtering options by User and Plant Status.',
            icon: 'bi-file-earmark-bar-graph',
            color: '#1B74E4',
            bgColor: '#E8F2FE',
        }, 
        {
            id: 'bill-report' as ReportType,
            title: 'Bill Report',
            description: 'Download detailed bill reports with flexible filters including PPA, User, Billing Month, Payment Method, and Payment Status.',
            icon: 'bi-file-earmark-bar-graph',
            color: '#1B74E4',
            bgColor: '#E8F2FE',
        },
    ]
    return (
        <div className="p-9 bg-light">
            <Row className="mb-6">
                <Col xs={12}>
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                    <h1 className="fs-22 mt-2 fw-bolder">Reports</h1>
                    <div className="badge badge-primary ms-3 rounded-pill">
                        <span className="p-1 fs-14 text-white">{reports.length}</span>
                    </div>
                    </div>
                </div>
                <p className="text-muted fs-16 mb-0">
                    Access and download various reports to analyze your business
                    operations
                </p>
                </Col>
            </Row>

            <Row className="g-6">
                {reports.map((report) => (
                    <Col
                        key={report.id}
                        xs={12}
                        md={6}
                        xl={4}
                    >
                        <Card className="border-0 shadow-sm h-100">
                        <Card.Body className="p-6 d-flex flex-column">
                            <div
                            className="d-flex align-items-center justify-content-center rounded-circle mb-4"
                            style={{
                                width: '64px',
                                height: '64px',
                                backgroundColor: report.bgColor,
                            }}
                            >
                            <i
                                className={`${report.icon} fs-2x`}
                                style={{ color: report.color }}
                            ></i>
                            </div>
                            <h4 className="fw-bold mb-3">{report.title}</h4>
                            <p className="text-muted fs-15 mb-4 flex-grow-1">
                            {report.description}
                            </p>
                            <button
                            className="btn btn-primary w-100"
                            onClick={() => setActiveModal(report.id)}
                            >
                            <i className="bi bi-download me-2"></i>
                            Download Report
                            </button>
                        </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        {/* Modals */}
        <PlantDownloadReportModal
            show={activeModal === 'plant-report'}
            onHide={() => setActiveModal(null)}
        />

        <BillDownloadReportModal
            show={activeModal === 'bill-report'}
            onHide={() => setActiveModal(null)}
        />

        {/* <DateRangeReportModal
            show={activeModal === 'gas-bottle'}
            onHide={() => setActiveModal(null)}
            onDownload={handleGasBottleDownload}
            loading={downloadLoading}
            title="Download Gas Bottle Report"
            fieldLabel="Select Date Range"
            submitLabel="Download Report"
            minDate={new Date('2023-01-01')}
        />

        <DateRangeReportModal
            show={activeModal === 'labor-distribution'}
            onHide={() => setActiveModal(null)}
            onDownload={handleLaborDistributionDownload}
            loading={downloadLoading}
            title="Download Labor Distribution"
            fieldLabel="Select Date Range"
            submitLabel="Download Report"
            minDate={new Date('2023-01-01')}
        />

        <DateRangeReportModal
            show={activeModal === 'job-wise-hours'}
            onHide={() => setActiveModal(null)}
            onDownload={handleJobWiseHoursDownload}
            loading={downloadLoading}
            title="Download Job-wise Hours Report"
            fieldLabel="Select Date Range"
            submitLabel="Download Report"
            minDate={new Date('2023-01-01')}
        />
        <DateRangeReportModal
            show={activeModal === 'gross-weekly-payroll'}
            onHide={() => setActiveModal(null)}
            onDownload={handleGrossPayrollDownload}
            loading={downloadLoading}
            title="Gross Weekly Payroll Report"
            fieldLabel="Select Week (Monday to Sunday)"
            submitLabel="Download Payroll Report"
            minDate={new Date('2023-01-01')}
        /> */}
        </div>
    );
};

export default Reports;
