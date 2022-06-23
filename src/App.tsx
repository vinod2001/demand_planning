import './styles.css'
import React, { useState } from 'react'
import { Layout1 } from './Layout1'
import { Layout2 } from './Layout2'
import { Layout3 } from './Layout3'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

export default function App() {
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <AppBar position="static" style={{ background: '#333' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Layout 1" />
            <Tab label="Layout 2" />
            <Tab label="Layout 3" />
          </Tabs>
        </AppBar>
        {/* <Layout1 /> */}
        {value === 0 && <Layout1 />}
        {value === 1 && <Layout2 />}
        {value === 2 && <Layout3 />}
      </Box>
    </>
  )
}
