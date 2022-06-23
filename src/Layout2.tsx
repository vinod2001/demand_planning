import './styles.css'
import React, { useState, KeyboardEvent, MouseEvent } from 'react'
import { DisplayGridFull } from './agGrid/AgGrid'
import { DisplayGrid } from './agGrid/AgGrid copy'
import { DisplayGridClient } from './agGrid/AgGrid copy 2'
import { DisplayDynamicHeader } from './agGrid/AgGridDynamic'
import Box from '@mui/material/Box'
// import Grid from '@mui/material/Grid'
import { AutocompleteComponent } from './components/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import { useDropzone } from 'react-dropzone'
import Button from '@mui/material/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileExcel,
  faFilter,
  faCaretSquareDown,
  faFilePdf,
  faFileCode,
  faArrowsRotate,
  faDatabase,
  faLinesLeaning,
  faShoePrints,
} from '@fortawesome/free-solid-svg-icons'
import { ColumnPicker } from './components/ColumnPicker'
import Drawer from '@mui/material/Drawer'
import { DrawerLayout } from './components/Drawer'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { TabComponent } from './components/Tabs'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

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

const menuLists = [
  { name: 'Open In Excel', icon: faFileExcel },
  { name: 'Export to PDF', icon: faFilePdf },
  { name: 'Show API URL', icon: faFileCode },
  { name: 'Update Data', icon: faArrowsRotate },
  { name: 'Show Full Data Path', icon: faDatabase },
  { name: 'Open in /data(CTRL+ALT+/)', icon: faFilePdf },
  { name: 'toString()', icon: faLinesLeaning },
  { name: 'Show Blueprint', icon: faShoePrints },
]

export const Layout2 = () => {
  const [dropFiles, setDropFiles] = useState()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })
  const maxLength = 20
  const filesArray: any[] = []
  const fileValidator = (file: any) => {
    filesArray.push(file.name)
    console.log(
      'fileValidator',
      filesArray.indexOf(file.name),
      filesArray.indexOf(file.name) === -1,
    )
    if (file.name.length > maxLength) {
      return {
        code: 'name-too-large',
        message: `Name is larger than ${maxLength} characters`,
        type: file.type,
      }
    }
    if (filesArray.indexOf(file.name) === -1) {
      return {
        code: 'same-filename',
        message: `the file name "${file.name}" is already exist`,
        type: file.type,
      }
    }
    return null
  }
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    validator: fileValidator,
    onDrop: (acceptedFiles: any) => {
      setDropFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
  })

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: KeyboardEvent | MouseEvent,
  ) => {
    setState({ ...state, [anchor]: open })
  }
  const [menu, setMenu] = React.useState({
    anchorEl: null,
  })
  const handleClick = (event: any): void => {
    setMenu({ anchorEl: event.currentTarget })
  }

  const handleClose = (): void => {
    setMenu({ anchorEl: null })
  }

  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper className={classes.paper}>
            <Box
              sx={{
                width: 'auto',
              }}
              display="flex"
              justifyContent="flex-end"
              style={{
                background: '#eeeeee',
                borderRadius: '2px',
                padding: '5px',
                marginBottom: '5px',
              }}
            >
              <FontAwesomeIcon
                icon={faCaretSquareDown}
                style={{
                  color: 'black',
                  fontSize: '20px',
                  paddingRight: '10px',
                  cursor: 'pointer',
                }}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              />
              <FontAwesomeIcon
                icon={faFilter}
                style={{
                  color: 'black',
                  fontSize: '20px',
                  paddingRight: '10px',
                  cursor: 'pointer',
                }}
                onClick={toggleDrawer('right', true)}
              />
              <Menu
                id="simple-menu"
                anchorEl={menu.anchorEl}
                keepMounted
                open={Boolean(menu.anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {menuLists.map((items) => (
                  <MenuItem style={{ padding: 0, margin: 0 }}>
                    <div style={{ display: 'flex' }}>
                      <div className={clsx(classes.subMenuBorder)}>
                        <FontAwesomeIcon
                          icon={items.icon}
                          className={clsx(classes.pad, classes.menuIconsize)}
                        />
                      </div>
                      <div className={clsx(classes.pad)}>{items.name}</div>
                    </div>
                  </MenuItem>
                ))}

                {/* <MenuItem>Open In Excel</MenuItem>
                <MenuItem style={{ padding: 0, margin: 0 }}>
                  <div style={{ display: 'flex' }}>
                    <div className={clsx(classes.subMenuBorder)}>
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className={clsx(classes.pad)}
                      />
                    </div>
                    <div className={clsx(classes.pad)}>Export to PDF</div>
                  </div>
                </MenuItem>
                <MenuItem>Show API URL</MenuItem>
                <MenuItem>Update Data</MenuItem>
                <MenuItem>Show Full Data Path</MenuItem>
                <MenuItem>Open in /data(CTRL+ALT+/)</MenuItem>
                <MenuItem>toString()</MenuItem>
                <MenuItem>Show Blueprint</MenuItem> */}
              </Menu>
            </Box>
            <DisplayDynamicHeader storeType="partial" theme="ag-theme-alpine" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TabComponent />
        </Grid>
      </Grid>

      <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        <DrawerLayout />
      </Drawer>
    </Box>
  )
}
