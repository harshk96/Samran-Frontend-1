import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Dropdown, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import APICallService from '../../../api/apiCallService';
import { CustomSelectWhite } from '../../custom/select/CustomSelectWhite';
import { error, success } from '../../../global/toast';
import { Bill } from '../../../api/apiEndPoints';
import { BILLAPIJSON } from '../../../api/apiJSON/bill';
import { IAddBill } from '../../../types/request_data/bill';
import { PPA } from '../../../api/apiEndPoints';
import { PPAAPIJSON } from '../../../api/apiJSON/ppa';
import clsx from 'clsx';

const AddBill = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [ppaOptions, setPpaOptions] = useState<any[]>([]);
    const [formData, setFormData] = useState<IAddBill>({
        ppaId: null,
        billingMonth: null,
        billingYear: null,
        generatedUnits: null,
        consumedUnits: null,
        exportedUnits: null,
    });
    const [validation, setValidation] = useState<any>({
        ppaId: false,
        billingMonth: false,
        billingYear: false,
        generatedUnits: false,
        consumedUnits: false,
        exportedUnits: false,
    });

    // Fetch PPA from dropdown
    useEffect(() => {
        const fetchPpa = async () => {
            const params = {
                page: 1,
                limit: 1000,
                sortKey: '_createdAt',
                sortOrder: -1,
                needCount: false,
                isSigned : true
            };
            const apiService = new APICallService(
                PPA.LISTPPA,
                PPAAPIJSON.listPpa(params)
            );

            const response = await apiService.callAPI();
            if (response && response.records) {
                const options = response.records.map((ppa: any) => ({
                    value: ppa._id,
                    label: `${ppa?.plantDetail?.name}`
                }));
                setPpaOptions(options);
            }
        };
        fetchPpa();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const handleSelectChange = (selected: any) => {
        const value = selected ? selected.value : null;
        setFormData({
            ...formData,
            ppaId: value
        });
        validateField('ppaId', value);
    }

    const validateField = (name: string, value: any) => {
        let isInvalid = false;
        if(name === 'ppaId') {
            isInvalid = value.trim() === '';
        } else if( name === 'billingMonth') {
            isInvalid = value === 0;
        } else if (name === 'billingYear') {   
            isInvalid = value === 0;
        } else if( name === 'generatedUnits') {
            isInvalid = value === 0;
        } else if (name === 'consumedUnits') {   
            isInvalid = value === 0;
        } else if( name === 'exportedUnits') {
            isInvalid = value === 0;
        }  

        setValidation((prev) => ({
            ...prev,
            [name]: isInvalid,
        }));
    }

    const handleAddBill = async () => {
        setLoading(true);
        const newValidation = {
            ppaId: !formData.ppaId,
            billingMonth : !formData.billingMonth,
            billingYear : !formData.billingYear,
            generatedUnits : !formData.generatedUnits,
            consumedUnits : !formData.consumedUnits,
            exportedUnits : !formData.exportedUnits
        }
        setValidation(newValidation);
        const isValid = !Object.values(newValidation).some((value) => value);
        if(isValid) {
            try {
                const apiService = new APICallService(
                    Bill.ADDBILL,
                    BILLAPIJSON.AddBill({
                        ppaId: formData.ppaId,
                        billingMonth: formData.billingMonth,
                        billingYear: formData.billingYear,
                        generatedUnits : formData.generatedUnits,
                        consumedUnits: formData.consumedUnits,
                        exportedUnits: formData.exportedUnits,
                    })
                );
                console.log("kanu", apiService);

                const response = await apiService.callAPI();
                console.log("response", response);
                if(response) {
                    success("Bill created successfully!");
                    navigate('/bill/all-bills')
                }
            } catch (err) {
                error('Failed to add bill');
            }
        }
        setLoading(false);
    }

    const handleBack = () => {
        navigate('/bill/all-bills')
    }

    return (
        <div className="p-9">
            <Row className="mb-6">
                <Col xs={12}>
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                        <h1 className="fs-22 fw-bolder">Add new Bill</h1>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Card className="bg-white pt-2 mb-6 mb-xl-9 border">
                        <Card.Header className="border-bottom-0">
                        <Card.Title>
                            <h5 className="fs-22 fw-bolder">Bill details</h5>
                        </Card.Title>
                        </Card.Header>

                        <Card.Body className="pt-0 pb-5">
                        <Row className="align-items-center">
                            <Col md={6} className="mb-3">
                            <Row>
                                <Form.Group
                                    className="mb-3"
                                    controlId="plantId"
                                >
                                    <Form.Label className="fs-16 fw-500 required">
                                        PPA
                                    </Form.Label>
                                    <CustomSelectWhite
                                        border={validation.ppaId ? '#F1416C' : ''}
                                        placeholder="Select ppa"
                                        options={ppaOptions}
                                        isMulti={false}
                                        onChange={handleSelectChange}
                                        value={ppaOptions.find(
                                            (option) => option.value === formData.ppaId
                                        ) || null}
                                        minHeight="60px"
                                        controlFontSize="14px"
                                        fontWeight="500"
                                    />
                                </Form.Group>
                            </Row>
                            </Col>

                            <Col>
                            <Row>
                                <Col
                                    md={6}
                                    className="mb-3"
                                >
                                <Form.Group
                                    className="mb-3"
                                    controlId="billingMonth"
                                >
                                    <Form.Label className="fs-16 fw-500 required">
                                        Billing Month
                                    </Form.Label>
                                    <Form.Control
                                        className={clsx(
                                            'form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px',
                                            { 'border-danger': validation.billingMonth }
                                        )}
                                        type="number"
                                        placeholder="Type here…"
                                        name="billingMonth"
                                        value={formData.billingMonth}
                                        onChange={handleInputChange}
                                        style={{
                                            border: validation.billingMonth
                                            ? '1px solid #F1416C'
                                            : '1px solid #e0e0df',
                                        }}
                                    />
                                </Form.Group>
                                </Col>

                                <Col
                                    md={6}
                                    className="mb-3"
                                >
                                <Form.Group
                                    className="mb-3"
                                    controlId="billingYear"
                                >
                                    <Form.Label className="fs-16 fw-500 required">
                                        Billing Year
                                    </Form.Label>
                                    <Form.Control
                                        className={clsx(
                                            'form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px',
                                            { 'border-danger': validation.billingYear }
                                        )}
                                        type="number"
                                        placeholder="Type here…"
                                        name="billingYear"
                                        value={formData.billingYear}
                                        onChange={handleInputChange}
                                        style={{
                                            border: validation.billingYear
                                            ? '1px solid #F1416C'
                                            : '1px solid #e0e0df',
                                        }}
                                    />
                                </Form.Group>
                                </Col>
                                <Col
                                    md={6}
                                    className="mb-3"
                                >
                                <Form.Group
                                    className="mb-3"
                                    controlId="generatedUnits"
                                >
                                    <Form.Label className="fs-16 fw-500 required">
                                        Generated Units
                                    </Form.Label>
                                    <Form.Control
                                        className={clsx(
                                            'form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px',
                                            { 'border-danger': validation.generatedUnits }
                                        )}
                                        type="number"
                                        placeholder="Type here…"
                                        name="generatedUnits"
                                        value={formData.generatedUnits}
                                        onChange={handleInputChange}
                                        style={{
                                            border: validation.generatedUnits
                                            ? '1px solid #F1416C'
                                            : '1px solid #e0e0df',
                                        }}
                                    />
                                </Form.Group>
                                </Col>

                                <Col
                                    md={6}
                                    className="mb-3"
                                >
                                <Form.Group
                                    className="mb-3"
                                    controlId="consumedUnits"
                                >
                                    <Form.Label className="fs-16 fw-500 ">
                                        Consumed Units
                                    </Form.Label>
                                    <Form.Control
                                        className={clsx(
                                            'form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px',
                                            { 'border-danger': validation.consumedUnits }
                                        )}
                                        type="number"
                                        placeholder="Type here…"
                                        name="consumedUnits"
                                        value={formData.consumedUnits}
                                        onChange={handleInputChange}
                                        style={{
                                            border: validation.consumedUnits
                                            ? '1px solid #F1416C'
                                            : '1px solid #e0e0df',
                                        }}
                                    />
                                </Form.Group>
                                </Col>

                                <Col
                                    md={6}
                                    className="mb-3"
                                >
                                <Form.Group
                                    className="mb-3"
                                    controlId="exportedUnits"
                                >
                                    <Form.Label className="fs-16 fw-500 required">
                                        Exported Units
                                    </Form.Label>
                                    <Form.Control
                                        className={clsx(
                                            'form-control bg-white min-h-60px fs-15 fw-500 border-radius-15px',
                                            { 'border-danger': validation.exportedUnits }
                                        )}
                                        type="number"
                                        placeholder="Type here…"
                                        name="exportedUnits"
                                        value={formData.exportedUnits}
                                        onChange={handleInputChange}
                                        style={{
                                            border: validation.exportedUnits
                                            ? '1px solid #F1416C'
                                            : '1px solid #e0e0df',
                                        }}
                                    />
                                </Form.Group>
                                </Col>
                            </Row>
                            </Col>
                        </Row>
                        </Card.Body>
                    </Card>
                </Col>

                <div className="d-flex justify-content-center gap-4">
                <Button
                    size="lg"
                    onClick={handleAddBill}
                    disabled={loading}
                >
                    {loading ? (
                    <>
                        Please wait...
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </>
                    ) : (
                    <span className="indicator-label fs-16 fw-bold">
                        Add Bill
                    </span>
                    )}
                </Button>
                {/* <Button
                    className="indicator-label fs-16 fw-bold"
                    onClick={handleBack}
                >
                    Cancel
                </Button> */}
                </div>
            </Row>
        </div>
    );
}

export default AddBill;