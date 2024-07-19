import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPuzzle,
  cilStar,
  cibAuth0
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Pages',
  },
  {
    component: CNavItem,
    name: 'Login',
    to: '/login',
    icon: <CIcon icon={cibAuth0} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Register',
    to: '/register',
    icon: <CIcon icon={cibAuth0} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Building Configuration',
    to: '/configuration',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Building Configuration',
        to: '/configuration',
      },
    ],
  }
]

export default _nav
