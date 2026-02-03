import { Modal, Button } from 'react-bootstrap';

const CashPaymentModal = (props: any) => {
    const handleConfirm = () => {
        props.onHide();
        props.handleCashPayment();
    };

    return (
        <Modal
            {...props}
            show={props.show}
            onHide={props.onHide}
            dialogClassName="modal-dialog-centered max-w-450px"
            className="border-r10px"
            centered
            backdrop={true}
            size="md"
        >
            <Modal.Body>
                <div className="text-center d-flex flex-column gap-2 ">
                <span className="text-center fs-18 fw-600">
                    Please confirm that the payment for this bill was received in cash. 
                </span>
                <span className="fs-16 fw-normal">
                    Once updated this action cannot be undone.
                </span>
                </div>
            </Modal.Body>
            <div className="d-flex justify-content-center align-item-center gap-5 mb-8">
                <button
                    onClick={props.onHide}
                    className="btn fw-bolder text-white" style={{ background: '#c04646' }}
                >
                    Cancel
                </button>
                <Button
                    style={{ background: '#4673c0', color: '#fff'}}
                    variant="blue"
                    onClick={handleConfirm}
                >
                    Yes confirm & Update Cash Payment
                </Button>
            </div>
        </Modal>
    );
};

export default CashPaymentModal;
