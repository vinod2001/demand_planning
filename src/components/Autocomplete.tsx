import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import Autocomplete from '@mui/material/Autocomplete'
//import { Autocomplete, createFilterOptions } from "@material-ui/lab";
//import TextField from '@mui/material/TextField'
//import Stack from '@mui/material/Stack'
import { filterHeader, checkDomain } from '../utils/utils'
import { withStyles } from '@material-ui/core/styles'
import { Stack, Autocomplete, TextField } from '@mui/material'

// const StyledAutocomplete = withStyles({
//   tag: {
//     color: "#ad4e64",
//     border: "1px solid #ad4e64",
//     background: "transparent",
//     svg: {
//       color: "#ad4e64 !important"
//     }
//   }
// })(Autocomplete);

type Props = {
  type?: string;
  id?:number;
  setSlicers?:(args:any)=>void;
}

const items = [
  {
    field: '2000',
  },
  {
    field: '2002',
  },
  {
    field: '2008',
  },
  {
    field: '2009',
  },
  {
    field: '2010',
  },
  {
    field: '2011',
  },
  {
    field: '2012',
  },
]

export const AutocompleteComponent = ({id, setSlicers}:Props) => {
  const [lists, setLists] = useState<any[]>([])
  const { urls } = checkDomain(0)
  const handleChange = (event: React.SyntheticEvent, values:any) => {
    console.log(values[0].field)
    if(setSlicers){
    setSlicers((prevState: any)=> {
      return {...prevState,slicer1:values[0].field}
    }) 
  } 
  } 
  useEffect(() => {
    setLists(items)
    // if (urls) {
    //   fetch(urls)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       const items = filterHeader(data)
    //       setLists(items)
    //     })
    // }
  }, [])
  return (
    <>
      <Stack sx={{ minWidth: '100px' }}>
        <Autocomplete
          multiple
          id="tags-standard"
          options={lists}
          getOptionLabel={(option: any) => {
            return option.field
          }}
          defaultValue={lists[0]}
          renderInput={(params) => (
            <TextField {...params} label="Slicer" placeholder="Favorites" />
          )}
          size="small"
          onChange={handleChange}
        />
      </Stack>
    </>
  )
}
