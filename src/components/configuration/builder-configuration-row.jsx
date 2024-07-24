// BuilderConfigurationRow.js
import React from 'react';
import { CTableDataCell, CTableRow, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilOptions } from '@coreui/icons';
import { BuildingTypeNames } from '../../enums/building-type-enum';

const BuilderConfigurationRow = ({ item, onEdit, onDelete }) => {
  if (!item) return null;

  return (
    <CTableRow key={item.id}>
      <CTableDataCell className="text-center">{BuildingTypeNames[item.buildingType] || 'Unknown'}</CTableDataCell>
      <CTableDataCell className="text-center">{item.buildingCost || 'N/A'}</CTableDataCell>
      <CTableDataCell className="text-center">{item.constructionTime ? `${item.constructionTime} seconds` : 'N/A'}</CTableDataCell>
      <CTableDataCell className="text-center">
        <CDropdown direction="dropstart">
          <CDropdownToggle color="transparent" caret={false}>
            <CIcon size="xl" icon={cilOptions} />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem href="#" className="text-info" onClick={() => onEdit(item)}>Edit</CDropdownItem>
            <CDropdownItem href="#" className="text-danger" onClick={() => onDelete(item.id)}>Delete</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CTableDataCell>
    </CTableRow>
  );
};

export default BuilderConfigurationRow;
