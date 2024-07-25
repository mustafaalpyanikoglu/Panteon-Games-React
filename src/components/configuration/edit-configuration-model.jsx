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
import { BUILDING_COST_INVALID, CONSTRUCTION_TIME_INVALID, BUILDING_TYPE_REQUIRED } from '../../constants/app-messages';

const EditConfigurationModal = ({ showModal, onClose, item, onSave }) => {
  const [config, setConfig] = useState(item);

  useEffect(() => {
    if (showModal) {
      setConfig(item);
    } else {
      setConfig({
        id: null,
        buildingType: '',
        buildingCost: '',
        constructionTime: ''
      });
    }
  }, [showModal, item]);

  const handleSave = () => {
    const { buildingType, buildingCost, constructionTime } = config;

    // Check if any field is empty
    if (!buildingType) {
      toast.error(BUILDING_TYPE_REQUIRED);
      return;
    }

    if (!buildingCost || parseFloat(buildingCost) <= 0) {
      toast.error(BUILDING_COST_INVALID);
      return;
    }

    if (!constructionTime || parseInt(constructionTime, 10) < 30 || parseInt(constructionTime, 10) > 1800) {
      toast.error(CONSTRUCTION_TIME_INVALID);
      return;
    }

    onSave({
      id: config.id,
      buildingType,
      buildingCost,
      constructionTime
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
            min="1"
            step="1"
            onChange={(e) => setConfig({ ...config, buildingCost: e.target.value })}
          />
          <CFormInput
            type="number"
            label="Construction Time (Seconds)"
            value={config.constructionTime}
            min="30"
            max="1800"
            step="1"
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
