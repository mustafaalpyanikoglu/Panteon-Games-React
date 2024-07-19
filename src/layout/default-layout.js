import React from 'react'
import PgSidebar from '../components/sidebar/pg-sidebar'
import PGHeader from '../components/header/pg-header'
import PgContent from '../components/content/pg-content'
import PgFooter from '../components/footer/pg-footer'


const DefaultLayout = () => {
  return (
    <div>
      <PgSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <PGHeader />
        <div className="body flex-grow-1">
          <PgContent />
        </div>
        <PgFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
