import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import { DisplayDynamicHeader } from "../agGrid/AgGridDynamic";
import { TableHeaderMenu } from "./TableHeaderMenu";

import { SlicersGroup } from "./SlicersGroup";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#adc2d9",
    padding: "10px",
  },
  paper: {
    padding: "10px",
    color: theme.palette.text.secondary,
    backgroundColor: "#fff",
  },
  pad: {
    padding: "10px",
  },
  menuIconsize: { height: "20px", width: "20px" },
  subMenuBorder: { borderRight: "1px solid #ccc" },
  mar: {
    marginTop: "10px",
  },
  fileUploader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    width: "100%",
    boxSizing: "border-box",
  },
  h4: {
    textTransform: "uppercase",
    textAlign: "center",
  },
  dropzone: {
    height: "168px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #d1ddf8",
    borderRadius: "20px",
    cursor: "pointer",
    padding: "15px",
  },
}));

type Props = {
  filter: boolean;
  slicers?: boolean;
  sideSlicers?: boolean;
  layout?: {
    type: string;
    withoutTab: number;
  };
  setSlicers?: ({}) => void;

  onGridReady: any;
  group?: string;
  setNewFilterModel: (arg: any) => void;
  id: number;
  newFilterModel: {};
};
export const TabComponent = ({
  filter,
  slicers,
  sideSlicers,
  layout,
  group,
  onGridReady,
  newFilterModel,
  setNewFilterModel,
  setSlicers,
  id,
}: Props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", height: "100%" }}>
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
        <Tab label="Item Eight" />
      </Tabs>
      {value === 0 && (
        // <Paper
        //   className={classes.paper}
        //   style={{
        //     height: '533px',
        //     border: '0px solid',
        //     overflowY: 'scroll',
        //   }}
        // >
        // <Grid container>
        //   <Grid item xs={12} sm={12} md={12}>
        //     <TableHeaderMenu heading={'Table 2'} />
        //     <DisplayDynamicHeader storeType="partial" theme="ag-theme-alpine" />
        //     {/* <Groups tableHeader={'Table 2'} /> */}
        //   </Grid>
        // </Grid>
        <Box style={{ height: "100%" }}>
          {/* {slicers && <SlicersGroup />} */}
          <TableHeaderMenu
            heading={"Table 2"}
            filter={filter}
            setSlicers={setSlicers}
            sideSlicers={sideSlicers}
            slicers={slicers}
            id={id}
            newFilterModel={newFilterModel}
            setNewFilterModel={setNewFilterModel}
          />
          <DisplayDynamicHeader
            onGridReady={onGridReady}
            storeType="partial"
            theme="ag-theme-alpine"
            group={group}
            layout={layout}
          />
        </Box>
        // </Paper>
      )}
      {value === 1 && (
        // <Paper
        //   className={classes.paper}
        //   style={{
        //     height: '533px',
        //     border: '0px solid',
        //     overflowY: 'scroll',
        //   }}
        // >
        // <Grid container>
        //   <Grid item xs={12} sm={12} md={12}>
        //     <TableHeaderMenu heading={'Table 3'} />
        //     <DisplayDynamicHeader storeType="partial" theme="ag-theme-alpine" />
        //   </Grid>
        // </Grid>
        // </Paper>

        <Box style={{ height: "100%", overflowY: "scroll" }}>
          {/* {slicers && <SlicersGroup />} */}
          <TableHeaderMenu
            heading={"Table 3"}
            filter={filter}
            slicers={slicers}
            sideSlicers={sideSlicers}
            id={id}
            setSlicers={setSlicers}
            newFilterModel={newFilterModel}
            setNewFilterModel={setNewFilterModel}
          />
          <DisplayDynamicHeader
            storeType="partial"
            theme="ag-theme-alpine"
            layout={layout}
            onGridReady={onGridReady}
          />
        </Box>
      )}
    </Box>
  );
};
