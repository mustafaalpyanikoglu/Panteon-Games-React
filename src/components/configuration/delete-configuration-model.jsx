// DeleteConfirmationModal.js
import React from 'react';
import {
  CButton,
  CModalBody,
  CModalHeader,
  CModal,
  CModalFooter,
} from '@coreui/react';

const DeleteConfirmationModal = ({ showModal, onClose, onDelete }) => {
  return (
    <CModal visible={showModal} onClose={onClose}>
      <CModalHeader>Confirm Delete</CModalHeader>
      <CModalBody>
        <p>Are you sure you want to delete this configuration?</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>Cancel</CButton>
        <CButton color="danger" onClick={onDelete}>Delete</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default DeleteConfirmationModal;
