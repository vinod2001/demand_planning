import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { filterHeader } from '../utils/utils'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { useDropzone } from 'react-dropzone'
import Button from '@mui/material/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faArrowUp91,
  faArrowDown91,
  faFileExcel,
  faFilter,
} from '@fortawesome/free-solid-svg-icons'
import { ColumnPicker } from './ColumnPicker'
import { makeStyles } from '@material-ui/core/styles'
import { AutocompleteComponent } from './Autocomplete'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#adc2d9',
    padding: '10px',
    width: '450px',
  },
  paper: {
    padding: '10px',
    color: theme.palette.text.secondary,
    backgroundColor: '#fff',
  },
  pad: {
    padding: '10px',
  },
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
    height: '68px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #d1ddf8',
    borderRadius: '20px',
    cursor: 'pointer',
    padding: '15px',
  },
}))
type Props = {
  menuType?: string,
  slicers?: boolean,
  sideSlicers?:boolean
}
export const DrawerLayout = ({ menuType, slicers, sideSlicers }: Props) => {
  const [dropFiles, setDropFiles] = useState()
  const classes = useStyles()
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
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={12}>
        {sideSlicers && (
          <>
            <Paper className={classes.pad}>
              <AutocompleteComponent />
            </Paper>
            <Paper className={clsx(classes.pad, classes.mar)}>
              <AutocompleteComponent />
            </Paper>
          </>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            {menuType !== 'main' && (
              <>
                <Paper>
                  <div className={clsx('fileUploader', classes.mar)}>
                    <h4>Upload Files</h4>
                    <FontAwesomeIcon
                      icon={faFileExcel}
                      style={{
                        color: 'green',
                        fontSize: '20px',
                        paddingRight: '10px',
                      }}
                    />
                    <div {...getRootProps({ className: classes.dropzone })}>
                      <input {...getInputProps()} />
                      <p className="dropboxTitle">
                        Drag File Here <br />
                        or <span>Browse</span>
                      </p>
                    </div>
                  </div>
                </Paper>
                <Paper
                  className={clsx(classes.mar, classes.pad)}
                  style={{ display: 'flex' }}
                >
                  <FontAwesomeIcon
                    icon={faFileExcel}
                    style={{
                      color: 'green',
                      fontSize: '40px',
                      paddingRight: '10px',
                    }}
                  />
                  <Button
                    variant="contained"
                    size="medium"
                    style={{ width: '100%' }}
                  >
                    Download File
                  </Button>
                </Paper>
              </>
            )}
            <Paper className={clsx(classes.mar, classes.pad)}>
              <ColumnPicker />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
