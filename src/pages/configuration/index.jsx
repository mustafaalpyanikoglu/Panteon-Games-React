import React, { useState, useEffect } from 'react';
import {
  CButton,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
} from '@coreui/react';
import { toast } from 'react-toastify';

import PgSidebar from '../../components/sidebar/pg-sidebar';
import PGHeader from '../../components/header/pg-header';
import PgFooter from '../../components/footer/pg-footer';
import BuilderConfigurationTable from '../../components/configuration/builder-configuration-table';
import EditConfigurationModal from '../../components/configuration/edit-configuration-model';
import AddConfigurationModal from '../../components/configuration/add-configuration-model';
import DeleteConfirmationModal from '../../components/configuration/delete-configuration-model';
import Pagination from '../../components/pagination/pagination';

import BuildingConfigService from '../../services/builder-configuration-service';
import appMessages from '../../constants/app-messages';
import { BuildingTypeEnum } from '../../enums/building-type-enum';

const buildingConfigService = new BuildingConfigService();

const ConfigurationPage = () => {
  const [tableData, setTableData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [newConfig, setNewConfig] = useState({
    BuildingType: '',
    BuildingCost: '',
    ConstructionTime: ''
  });
  const [message, setMessage] = useState('');
  const [configToDelete, setConfigToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableBuildingTypes, setAvailableBuildingTypes] = useState([]);

  // Fetch configurations and building types
  const fetchConfigurations = async () => {
    try {
      setLoading(true);
      const result = await buildingConfigService.getListWithPagination(currentPage, 10);
      setLoading(false);

      if (result.isSuccess) {
        setTableData(result.data.items);
        setTotalPages(result.data.pages);
        setHasPrevious(result.data.hasPrevious);
        setHasNext(result.data.hasNext);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error('Error fetching configurations:', error);
      setLoading(false);
    }
  };

  const fetchBuildingTypes = async () => {
    try {
      const result = await buildingConfigService.getBuildingTypeList();

      if (result.isSuccess) {
        const existingTypes = Object.values(BuildingTypeEnum);
        const receivedTypes = result.data.map(type => type.buildingType);
        const filteredTypes = existingTypes.filter(type => !receivedTypes.includes(type));
        setAvailableBuildingTypes(filteredTypes);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error fetching building types:', error);
    }
  };

  useEffect(() => {
    fetchConfigurations();
    fetchBuildingTypes();
  }, [currentPage]);

  const handleAddConfig = async () => {
    try {
      const result = await buildingConfigService.add({
        buildingType: parseInt(newConfig.BuildingType, 10),
        buildingCost: parseFloat(newConfig.BuildingCost),
        constructionTime: parseInt(newConfig.ConstructionTime, 10)
      });

      if (result.isSuccess) {
        setShowAddModal(false);
        toast.success(appMessages.ADD_SUCCESSFUL);
        await fetchConfigurations(); // Refetch configurations to include the new entry
        await fetchBuildingTypes(); // Refetch building types to update available types
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error adding configuration:', error);
    }
  };

  const handleEditConfig = async (updatedConfig) => {
    try {
      const result = await buildingConfigService.update(updatedConfig);
      if (result.isSuccess) {
        setTableData(tableData.map(config => config.id === updatedConfig.id ? result.data : config));
        setShowEditModal(false);
        toast.success(appMessages.UPDATE_SUCCESSFUL);
        await fetchConfigurations(); // Refetch configurations to reflect changes
        await fetchBuildingTypes(); // Optionally update building types if needed
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error updating configuration:', error);
    }
  };

  const handleDeleteConfig = async () => {
    if (configToDelete) {
      try {
        const result = await buildingConfigService.delete({ id: configToDelete.id });

        if (result.isSuccess) {
          setTableData(tableData.filter(config => config.id !== configToDelete.id));
          setShowDeleteModal(false);
          toast.success(appMessages.DELETE_SUCCESSFUL);
          await fetchConfigurations(); // Refetch configurations to remove the deleted entry
          await fetchBuildingTypes(); // Refetch building types to update available types
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error('Error deleting configuration:', error);
      }
    }
  };

  return (
    <div>
      <PgSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <PGHeader />
        <div className="body flex-grow-1">
          <CRow>
            <CCol xs>
              <CCard className="mb-4">
                <CCardHeader className='mx-3'>
                  <strong>Configuration List</strong>
                </CCardHeader>
                <CCardBody>
                  {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                      <CSpinner color="primary" />
                    </div>
                  ) : (
                    <>
                      <BuilderConfigurationTable 
                        data={tableData} 
                        onEdit={(config) => {
                          setSelectedConfig(config);
                          setShowEditModal(true);
                        }}
                        onDelete={(id) => {
                          setConfigToDelete(tableData.find(config => config.id === id));
                          setShowDeleteModal(true);
                        }}
                      />
                      <CRow className="mt-3 d-flex align-items-center">
                        <CCol xs={7} className="d-flex justify-content-end">
                          <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages} 
                            hasPrevious={hasPrevious}
                            hasNext={hasNext}
                            onPageChange={(page) => setCurrentPage(page)}
                          />
                        </CCol>
                        <CCol xs={5} className="d-flex justify-content-end">
                          <CButton color="primary" onClick={() => setShowAddModal(true)}>Add Configuration</CButton>
                        </CCol>
                      </CRow>
                    </>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
        <PgFooter />
      </div>

      <AddConfigurationModal
        showModal={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddConfig}
        newConfig={newConfig}
        setNewConfig={setNewConfig}
        message={message}
        availableBuildingTypes={availableBuildingTypes}
      />

      {selectedConfig && (
        <EditConfigurationModal
          showModal={showEditModal}
          onClose={() => setShowEditModal(false)}
          item={selectedConfig}
          onSave={handleEditConfig}
        />
      )}

      <DeleteConfirmationModal
        showModal={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteConfig}
      />

    </div>
  );
};

export default ConfigurationPage;
