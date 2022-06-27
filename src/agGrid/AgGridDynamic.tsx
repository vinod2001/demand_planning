import React, { useCallback, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsRequest,
  ServerSideStoreType,
} from 'ag-grid-community'
import { checkDomain, filterHeader } from '../utils/utils'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { camelCase } from 'lodash'

type Props = {
  storeType: 'partial' | 'full',
  theme: any
}

export const DisplayDynamicHeader = ({ storeType, theme }: Props) => {
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
    }
  }, [])
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), [])
  const gridStyle = useMemo(
    () => ({ height: 'calc(100% - 110px)', width: '100%' }),
    [],
  )
  const gridRef = useRef<AgGridReact>(null)

  const addRow = (index: number | undefined) => {
    const itemsToAdd: any = [
      {
        athlete: 'Rod White',
        country: 'United States',
        year: 2000,
        sport: 'Archery',
        gold: 0,
        silver: 0,
        bronze: 1,
        total: 1,
      },
    ]
    const tx = {
      addIndex: index,
      add: itemsToAdd,
    }

    gridRef.current?.api.applyServerSideTransaction(tx)
  }

  const datasource = {
    getRows(params: any) {
      const { urls, numbers }: any = checkDomain(0)

      console.log(process.env)
      console.log(`params:${params}`)
      const { startRow, endRow, filterModel, sortModel } = params.request

      if (urls) {
        let url = urls
        // Sorting
        if (sortModel.length) {
          const { colId, sort } = sortModel[0]
          url += `_sort=${colId}&_order=${sort}&`
        }
        //Pagination
        url += `_start=${startRow}&_end=${endRow}&`

        //Filtering
        const filterKeys = Object.keys(filterModel)
        filterKeys.forEach((filter) => {
          url += `${filter}=${filterModel[filter].filter}&`
        })
        fetch(url)
          .then((httpResponse) => httpResponse.json())
          .then((response) => {
            params.successCallback(response, numbers)
            params.api.setColumnDefs(filterHeader(response))
          })
          .catch((error) => {
            console.error(error)
            params.failCallback()
          })
      }
    },
  }

  let count = 0
  const addData = () => {
    count = count + 1

    const { urls, numbers, addData } = checkDomain(count)
    if (urls) {
      fetch(urls, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addData),
      }).then((response) => {
        response.json()
        gridRef.current?.api.refreshServerSideStore({
          purge: true,
        })
      })
    }
  }

  const onGridReady = (params: GridReadyEvent) => {
    // fetch('http://localhost:4000/olympic?') //https://www.ag-grid.com/example-assets/olympic-winners.json
    //   .then((res) => res.json())
    //   .then((data: any[]) => {
    //     // setup a fake server with a entire dataset
    //     const fakeServer = createFakeServer(data)
    //     // create datasource with a reference to the fake server
    //     const dataSource = createServerSideDatasource(fakeServer)
    //     // register the datasource with the grid
    //     params.api.setServerSideDatasource( )
    //   })
    params.api.setServerSideDatasource(datasource)
  }
  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={theme}>
        <AgGridReact
          ref={gridRef}
          // columnDefs={colDef}
          defaultColDef={defaultColDef}
          rowModelType={'serverSide'}
          // pagination={true}
          // paginationPageSize={500}
          animateRows={true}
          serverSideStoreType={storeType}
          enableRangeSelection={true}
          onGridReady={onGridReady}
        />
      </div>
      <Box
        sx={{
          width: 'auto',
        }}
        display="flex"
        justifyContent="space-between"
        style={{ marginTop: '10px' }}
      >
        {/* <button type="button" className="" onClick={() => addRow(0)}>
          Add Row
        </button> */}
        <Box display="flex">
          <Button
            variant="contained"
            onClick={() => addData()}
            style={{ marginRight: '10px' }}
          >
            Add Row
          </Button>
          <Button variant="contained">Publish</Button>
        </Box>
        <Box display="flex" justifyContent={'flex-end'}>
          <Button variant="contained" style={{ marginRight: '10px' }}>
            Save
          </Button>
          <Button variant="contained">Cancel</Button>
        </Box>
      </Box>
    </div>
  )
}
