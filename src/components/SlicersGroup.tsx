import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { filterHeader, checkDomain } from '../utils/utils'
import { AutocompleteComponent } from './Autocomplete'
import Box from '@mui/material/Box'

export const SlicersGroup = () => {
  return (
    <>
      <Box display="flex" justifyContent="flex-start" sx={{ m: 0.5,mb:1, mt:1.5 }}>
        <Box sx={{ mr: 1,minWidth:'10px', }}>
          <AutocompleteComponent />
        </Box>
        <Box sx={{ mr: 1 }}>
          <AutocompleteComponent />
        </Box>
      </Box>
    </>
  )
}
