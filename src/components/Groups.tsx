import { DisplayDynamicHeader } from '../agGrid/AgGridDynamic'
import { GroupMenus } from './GroupMenus'
import { TableHeaderMenu } from './TableHeaderMenu'
import { TabComponent } from './Tabs'
type Props = {
  tableHeader: string,
  group: string,
  filter:boolean
}
import Box from '@mui/material/Box'
export const Groups = ({ tableHeader, group, filter }: Props) => {
  return (
    <>
      {group === 'group' && (
        <Box style={{ height: '100%' }}>
          <GroupMenus heading={tableHeader} filter={filter} group={'group'} />
          <TableHeaderMenu heading={tableHeader} filter={filter} />
          <DisplayDynamicHeader storeType="partial" theme="ag-theme-alpine" />
        </Box>
      )}
      {group === 'tab' && (
        <Box style={{ height: '100%' }}>
          <GroupMenus heading={tableHeader} filter={filter}  group={'tab'} />
          <TabComponent filter={filter} />
        </Box>
      )}
    </>
  )
}
