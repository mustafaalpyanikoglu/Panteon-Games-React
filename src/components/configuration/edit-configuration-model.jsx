import React, { useState, useEffect } from 'react';
import {
  CButton,
  CModalBody,
  CModalHeader,
  CModal,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react';
import { BuildingTypeEnum, BuildingTypeNames } from '../../enums/building-type-enum';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditConfigurationModal = ({ showModal, onClose, item, onSave }) => {
  const [config, setConfig] = useState(item);

  useEffect(() => {
    if (showModal) {
      // Set form data when modal opens
      setConfig(item);
    } else {
      // Reset form data when modal closes
      setConfig({
        id: null,
        buildingType: '',
        buildingCost: '',
        constructionTime: ''
      });
    }
  }, [showModal, item]);

  const handleSave = () => {
    const { buildingCost, constructionTime } = config;

    if (parseFloat(buildingCost) <= 0) {
      toast.error('Building Cost must be greater than zero.');
      return;
    }

    if (parseInt(constructionTime, 10) < 30 || parseInt(constructionTime, 10) > 1800) {
      toast.error('Construction Time must be between 30 and 1800 seconds.');
      return;
    }

    onSave({
      id: config.id,
      buildingType: config.buildingType,
      buildingCost: config.buildingCost,
      constructionTime: config.constructionTime
    });
  };

  return (
    <CModal visible={showModal} onClose={onClose}>
      <CModalHeader>Edit Configuration</CModalHeader>
      <CModalBody>
        <CForm>
          <CFormSelect
            aria-label="Building Type"
            value={config.buildingType}
            onChange={(e) => setConfig({ ...config, buildingType: parseInt(e.target.value, 10) })}
          >
            <option value="">Select Building Type</option>
            {Object.entries(BuildingTypeEnum).map(([key, value]) => (
              <option key={value} value={value}>{BuildingTypeNames[value]}</option>
            ))}
          </CFormSelect>
          <CFormInput
            type="number"
            label="Building Cost"
            value={config.buildingCost}
            onChange={(e) => setConfig({ ...config, buildingCost: e.target.value })}
          />
          <CFormInput
            type="number"
            label="Construction Time (Seconds)"
            value={config.constructionTime}
            onChange={(e) => setConfig({ ...config, constructionTime: e.target.value })}
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>Close</CButton>
        <CButton color="primary" onClick={handleSave}>Save</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EditConfigurationModal;
