import React, { useState, KeyboardEvent, MouseEvent } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { DisplayDynamicHeader } from '../agGrid/AgGridDynamic'
import { TableHeaderMenu } from './TableHeaderMenu'
import Drawer from '@mui/material/Drawer'
import { DrawerLayout } from './Drawer'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#adc2d9',
    padding: '10px',
  },
  paper: {
    padding: '10px',
    color: theme.palette.text.secondary,
    backgroundColor: '#fff',
  },
  pad: {
    padding: '10px',
  },
  menuIconsize: { height: '20px', width: '20px' },
  subMenuBorder: { borderRight: '1px solid #ccc' },
  mar: {
    marginTop: '10px',
  },
  fileUploader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: '#fff',
    borderRadius: '20px',
    padding: '20px',
    width: '100%',
    boxSizing: 'border-box',
  },
  h4: {
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  dropzone: {
    height: '168px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #d1ddf8',
    borderRadius: '20px',
    cursor: 'pointer',
    padding: '15px',
  },
}))
export const TabComponent = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" />
      </Tabs>
      {value === 0 && (
        <Paper
          className={classes.paper}
          style={{
            height: '533px',
            border: '0px solid',
            overflowY: 'scroll',
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <TableHeaderMenu />
              <DisplayDynamicHeader
                storeType="partial"
                theme="ag-theme-alpine"
              />
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  )
}
