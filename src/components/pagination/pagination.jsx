import React from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';
import './pagination.css'; 

const Pagination = ({ currentPage, totalPages, hasPrevious, hasNext, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 0) { 
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSelect = (page) => {
    if (page - 1 !== currentPage) {
      onPageChange(page - 1); 
    }
  };

  const getPageNumbers = () => {
    const maxPageNumbers = 3; 
    const startPage = Math.max(0, currentPage - Math.floor(maxPageNumbers / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxPageNumbers - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i + 1); 
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <CPagination className="justify-content-center p-3">
      <CPaginationItem 
        aria-label="Previous" 
        disabled={currentPage === 0}
        onClick={handlePrevious}
        className={`pagination-item ${currentPage === 0 ? 'disabled' : ''}`}
      >
        <span aria-hidden="true">&laquo;</span>
      </CPaginationItem>

      {pageNumbers.map(page => (
        <CPaginationItem
          key={page}
          active={page - 1 === currentPage}
          onClick={() => handlePageSelect(page)}
          className="pagination-item"
        >
          {page}
        </CPaginationItem>
      ))}

      <CPaginationItem 
        aria-label="Next" 
        disabled={currentPage === totalPages - 1}
        onClick={handleNext}
        className={`pagination-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}
      >
        <span aria-hidden="true">&raquo;</span>
      </CPaginationItem>
    </CPagination>
  );
};

export default Pagination;
