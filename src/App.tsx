import './styles.css'
import React, { useState } from 'react'
import { Layout1 } from './Layout1'
import { Layout2 } from './Layout2'
import { Layout3 } from './Layout3'
import { Layout4 } from './Layout4'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { MainHeaderMenu } from './components/MainHeaderMenu'
import MiniDrawer from './LeftAndTopNav'

export default function App() {
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <MiniDrawer />
        {/* <AppBar
          position="static"
          style={{
            background: '#47617e', //#47617e
            display: 'flex',
            color: 'white',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Layout 1" sx={{ borderRight: '1px solid #5b7fa6' }} />
            <Tab label="Layout 2" sx={{ borderRight: '1px solid #5b7fa6' }} />
            <Tab label="Layout 3" sx={{ borderRight: '1px solid #5b7fa6' }} />
            <Tab label="Layout 4" />
          </Tabs>
        </AppBar>

        <MainHeaderMenu />
        {value === 0 && <Layout1 />}
        {value === 1 && <Layout2 />}
        {value === 2 && <Layout3 />}
        {value === 3 && <Layout4 />} */}
      </Box>
    </>
  )
}
