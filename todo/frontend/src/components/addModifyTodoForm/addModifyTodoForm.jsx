import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'

const AddModifyForm = (props) => {


    return (

        <Modal
            show={true}
            onHide={props.onClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                I will not close if you click outside me. Don't even try to press
                escape key.
             </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Close
                 </Button>
                <Button variant="primary">Understood</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddModifyForm