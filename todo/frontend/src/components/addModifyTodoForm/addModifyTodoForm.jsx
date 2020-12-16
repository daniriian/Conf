import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'

const AddModifyForm = (props) => {

    const [step, setStep] = useState(0)

    const handle_NextAddModifyBtn = () => {
        if (step < 2) {
            setStep(step + 1)
        }
    }

    const handleBackBtn = () => {
        setStep(step - 1)
    }

    useEffect(() => {
        console.log("Mounting AddModifyForm")

        return (() => {
            console.log("cleaning up AddModifyForm")
        })
    }, [])

    return (

        <Modal
            show={true}
            onHide={props.onClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>videoconferinta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {step}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Renunta
                 </Button>
                {step > 0 ?
                    (
                        <Button variant="primary" onClick={handleBackBtn}>
                            Inapoi
                        </Button>
                    )
                    :
                    ""
                }
                <Button
                    variant="primary"
                    onClick={handle_NextAddModifyBtn}
                >
                    {step === 2 ? "Adauga" : "Inainte"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddModifyForm