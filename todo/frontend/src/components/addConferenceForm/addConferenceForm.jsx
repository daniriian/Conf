import React from 'react';
import { Modal, Button } from 'react-bootstrap'


const AddConferenceForm = ({ handleClose, visible }) => {

    return (
        <Modal show={visible}>
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>Adauga Videoconferinţă</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Inchide</Button>
                <Button variant="primary">Salvează</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddConferenceForm
