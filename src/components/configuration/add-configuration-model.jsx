import React, { useEffect } from 'react';
import {
  CButton,
  CFormInput,
  CFormSelect,
  CForm,
  CModalBody,
  CModalHeader,
  CModal,
  CModalFooter,
} from '@coreui/react';
import { BuildingTypeNames } from '../../enums/building-type-enum';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddConfigurationModal = ({ showModal, onClose, onAdd, newConfig, setNewConfig, message, availableBuildingTypes }) => {
  useEffect(() => {
    if (!showModal) {
      setNewConfig({
        BuildingType: '',
        BuildingCost: '',
        ConstructionTime: '',
      });
    }
  }, [showModal, setNewConfig]);

  const handleAdd = () => {
    const { BuildingType, BuildingCost, ConstructionTime } = newConfig;

    // Check if any field is empty
    if (!BuildingType) {
      toast.error('Please select a Building Type.');
      return;
    }

    if (!BuildingCost || parseFloat(BuildingCost) <= 0) {
      toast.error('Building Cost must be greater than zero.');
      return;
    }

    if (!ConstructionTime || parseInt(ConstructionTime, 10) < 30 || parseInt(ConstructionTime, 10) > 1800) {
      toast.error('Construction Time must be between 30 and 1800 seconds.');
      return;
    }

    onAdd();
  };

  return (
    <CModal visible={showModal} onClose={onClose}>
      <CModalHeader>
        <strong>Add Configuration</strong>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormSelect
            aria-label="Building Type"
            value={newConfig.BuildingType}
            onChange={(e) => setNewConfig({ ...newConfig, BuildingType: e.target.value })}
          >
            <option value="">Select Building Type</option>
            {availableBuildingTypes.map((type) => (
              <option key={type} value={type}>
                {BuildingTypeNames[type]}
              </option>
            ))}
          </CFormSelect>
          <CFormInput
            type="number"
            label="Building Cost"
            value={newConfig.BuildingCost}
            min="1"
            step="1"
            onChange={(e) => setNewConfig({ ...newConfig, BuildingCost: e.target.value })}
          />
          <CFormInput
            type="number"
            label="Construction Time (Seconds)"
            value={newConfig.ConstructionTime}
            min="30"
            max="1800"
            step="1"
            onChange={(e) => setNewConfig({ ...newConfig, ConstructionTime: e.target.value })}
          />
          {message && <div className="text-danger">{message}</div>}
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>Close</CButton>
        <CButton color="primary" onClick={handleAdd}>Add</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddConfigurationModal;
