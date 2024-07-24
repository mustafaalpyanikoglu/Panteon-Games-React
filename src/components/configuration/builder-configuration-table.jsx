// BuilderConfigurationTable.js
import React from 'react';
import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import BuilderConfigurationRow from './builder-configuration-row';

const BuilderConfigurationTable = ({ data, onEdit, onDelete }) => {
  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead className="text-nowrap">
        <CTableRow>
          <CTableHeaderCell className="bg-body-tertiary text-center">Building Type</CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary text-center">Building Cost</CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary text-center">Construction Time</CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary text-center">Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.map((item) => (
          <BuilderConfigurationRow key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </CTableBody>
    </CTable>
  );
};

export default BuilderConfigurationTable;
