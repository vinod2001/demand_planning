import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faArrowUp91,
  faArrowDown91,
  faFileExcel,
  faFilter,
  faMaximize,
} from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button'
import { GroupDialog } from './GroupDialog'

type Props = {
  heading: string;
  filter: boolean;
  group: string;
  slicers?: boolean;
  sideSlicers?: boolean;
}
export const GroupMenus = ({
  heading,
  filter,
  group,
  slicers,
  sideSlicers,
}: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'flex-end'}
        style={{ background: '#fff', padding: '5px', border: '0px solid' }}
      >
        <FontAwesomeIcon
          icon={faMaximize}
          onClick={() => setIsDialogOpen(true)}
          style={{ cursor: 'pointer' }}
        />
      </Box>
      {isDialogOpen && (
        <GroupDialog
          heading={heading}
          filter={filter}
          setIsDialogOpen={setIsDialogOpen}
          group={group}
          slicers={slicers}
          sideSlicers={sideSlicers}
          layout={{ type: 'dialog', withoutTab: 100 }}
        />
      )}
    </>
  )
}
