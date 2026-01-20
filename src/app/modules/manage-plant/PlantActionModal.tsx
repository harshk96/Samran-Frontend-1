import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import clsx from "clsx";
import { CustomSelectWhite } from "../../custom/select/CustomSelectWhite";

interface PlantActionModalProps {
    show: boolean;
    onHide: () => void;
    plantId: string | null;
    onSubmit: (data: {
        actionType: 2 | 3;
        reason?: string;
        plantName?: string;
    }) => Promise<void>;
    loading: boolean;
}

const PlantActionModal: React.FC<PlantActionModalProps> = ({
    show,
    onHide,
    plantId,
    onSubmit,
    loading,
}) => {
    const [actionType, setActionType] = useState<2 | 3 | "">("");
    const [reason, setReason] = useState("");
    const [plantName, setPlantName] = useState("");

    const [validation, setValidation] = useState({
        actionType: false,
        plantName: false,
    });

    const resetForm = () => {
        setActionType("");
        setReason("");
        setPlantName("");
        setValidation({ actionType: false, plantName: false });
    };

    useEffect(() => {
        if (!show) resetForm();
    }, [show]);

    const handleSubmit = async () => {
        const newValidation = {
            actionType: !actionType,
            plantName: actionType === 2 && !plantName.trim(),
        };
        console.log(newValidation);

        setValidation(newValidation);

        if (newValidation.actionType || newValidation.plantName) return;

        const payload = {
            actionType: actionType as 2 | 3,
            reason,
            ...(actionType === 2 && { plantName }),
        };

        console.log("payload",payload);
        await onSubmit(payload);
        resetForm();
    };

    const handleClose = () => {
        resetForm();
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Process Plant Request</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {/* Action */}
                    <Form.Group className="mb-4">
                        <Form.Label className="fs-16 fw-600 text-dark required">
                            Action
                        </Form.Label>

                        <CustomSelectWhite
                            border={validation.actionType ? "#F1416C" : ""}
                            placeholder="Select Action"
                            options={[
                                { value: 2, label: "Approve" },
                                { value: 3, label: "Reject" },
                            ]}
                            isMulti={false}
                            onChange={(selectedOption: any) => {
                                const value = selectedOption
                                    ? selectedOption.value
                                    : "";

                                setActionType(value as 2 | 3 | "");
                                setValidation((prev) => ({
                                    ...prev,
                                    actionType: !value,
                                }));

                                // Reset plant name when switching to Reject
                                if (value !== 2) {
                                    setPlantName("");
                                    setValidation((prev) => ({
                                        ...prev,
                                        plantName: false,
                                    }));
                                }
                            }}
                            value={
                                actionType
                                    ? {
                                          value: actionType,
                                          label:
                                              actionType === 2
                                                  ? "Approve"
                                                  : "Reject",
                                      }
                                    : null
                            }
                            minHeight="60px"
                            controlFontSize="14px"
                            fontWeight="500"
                        />
                    </Form.Group>

                    {/* Plant Name (only for Approve) */}
                    {actionType === 2 && (
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-16 fw-600 text-dark required">
                                Plant Name
                            </Form.Label>

                            <Form.Control
                                type="text"
                                value={plantName}
                                onChange={(e) => {
                                    setPlantName(e.target.value);
                                    setValidation((prev) => ({
                                        ...prev,
                                        plantName: !e.target.value.trim(),
                                    }));
                                }}
                                placeholder="Enter plant name"
                                className={clsx(
                                    "form-control bg-white min-h-50px fs-14 fw-500",
                                    validation.plantName &&
                                        "border border-danger"
                                )}
                            />
                        </Form.Group>
                    )}

                    {/* Reason */}
                    <Form.Group className="mb-4">
                        <Form.Label className="fs-16 fw-600 text-dark">
                            Reason
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="form-control bg-white min-h-50px fs-14 fw-500 border-black-2px"
                            placeholder="Enter reason (optional)"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="border-black-2px"
                >
                    {loading ? (
                        <>
                            Please wait...
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PlantActionModal;
