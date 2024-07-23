import React from 'react'
import { CFooter } from '@coreui/react'

const PGFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Panteon Games
        </a>
        <span className="ms-1">&copy; 2024 Mustafa Alp YANIKOĞLU.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Panteon Games
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(PGFooter)
