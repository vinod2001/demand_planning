import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { filterHeader, checkDomain } from '../utils/utils'

export const AutocompleteComponent = () => {
  const [lists, setLists] = useState<any[]>([])
  const { urls } = checkDomain(0)
  useEffect(() => {
    if (urls) {
      fetch(urls)
        .then((res) => res.json())
        .then((data) => {
          const items = filterHeader(data)
          setLists(items)
        })
    }
  }, [])
  return (
    <>
      <Stack sx={{ width: '100%' }}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={lists}
          getOptionLabel={(option) => option.field}
          defaultValue={lists[0]}
          renderInput={(params) => (
            <TextField {...params} label="Slicer" placeholder="Favorites" />
          )}
        />
      </Stack>
    </>
  )
}
