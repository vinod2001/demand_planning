import { DisplayDynamicHeader } from '../agGrid/AgGridDynamic'
import { GroupMenus } from './GroupMenus'
import { TableHeaderMenu } from './TableHeaderMenu'
import { TabComponent } from './Tabs'
type Props = {
  tableHeader: string;
  group: string;
  filter: boolean;
  slicers?: boolean;
  sideSlicers?: boolean;
}
import Box from '@mui/material/Box'
import { SlicersGroup } from './SlicersGroup'
export const Groups = ({
  tableHeader,
  group,
  filter,
  slicers,
  sideSlicers,
}: Props) => {
  return (
    <>
      {group === 'group' && (
        <Box style={{ height: '100%' }}>
          <GroupMenus
            heading={tableHeader}
            filter={filter}
            group={'group'}
            slicers={slicers}
            sideSlicers={sideSlicers}
          />
          {slicers && <SlicersGroup />}
          <TableHeaderMenu
            heading={tableHeader}
            filter={filter}
            slicers={slicers}
            sideSlicers={sideSlicers}
          />
          <DisplayDynamicHeader storeType="partial" theme="ag-theme-alpine" />
        </Box>
      )}
      {group === 'tab' && (
        <Box style={{ height: '100%' }}>
          <GroupMenus
            heading={tableHeader}
            filter={filter}
            group={'tab'}
            slicers={slicers}
            sideSlicers={sideSlicers}
          />
          <TabComponent
            filter={filter}
            slicers={slicers}
            sideSlicers={sideSlicers}
          />
        </Box>
      )}
    </>
  )
}
