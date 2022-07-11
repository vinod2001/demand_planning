import { DisplayDynamicHeader } from "../agGrid/AgGridDynamic";
import { GroupMenus } from "./GroupMenus";
import { TableHeaderMenu } from "./TableHeaderMenu";
import { TabComponent } from "./Tabs";
import { filterHeader, checkDomain } from "../utils/utils";
import { AgGridReact } from "ag-grid-react";

type Props = {
  tableHeader: string;
  group: string;
  filter: boolean;
  slicers?: boolean;
  sideSlicers?: boolean;
  layout?: {
    type: string;
    withoutTab: number;
  };
  setSlicers?: (args: any) => void;

  id: number;
};
import Box from "@mui/material/Box";
import { SlicersGroup } from "./SlicersGroup";
import { GridReadyEvent } from "ag-grid-community";
import { useEffect, useRef, useState } from "react";

interface newFilter {
  sport: string[];
  year: string[];
}
interface secondFilterInterface {
  sport: string[];
  year: string[];
}
export const Groups = ({
  tableHeader,
  group,
  filter,
  slicers,
  sideSlicers,
  layout,
  id,
  setSlicers,
}: Props) => {
  const [newFilterModel, setNewFilterModel] = useState<newFilter>({
    sport: [],
    year: [],
  });

  const [newParam, setNewParam] = useState<any>();

  const gridRef = useRef<AgGridReact>(null);

  const [newValueUrl, setnewValueUrl] = useState("");

  useEffect(() => {
    let { urls, numbers } = checkDomain(0);
    let url: string = urls + "";

    if (newFilterModel.sport.length > 0)
      url =
        url +
        newFilterModel.sport.map((val) =>
          urls == "https://jsonplaceholder.typicode.com/comments?"
            ? "postId=" + val + "&"
            : "sport=" + val + "&"
        );
    if (newFilterModel.year.length > 0)
      url =
        url +
        newFilterModel.year.map((val) =>
          urls == "https://jsonplaceholder.typicode.com/comments?"
            ? `email=${val}&`
            : `year=${val}&`
        );

    setnewValueUrl(url.replace(",", ""));

    fetch(url.replace(",", ""))
      .then((httpResponse) => httpResponse.json())
      .then((response) => {
        // setNewParam(response);
        if (newParam) {
          newParam.successCallback(response);
          newParam.api.setColumnDefs(filterHeader(response));
        }
        // gridRef.current!.api.setServerSideDatasource(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [newFilterModel]);

  const datasource = {
    getRows(params: any) {
      setNewParam(params);
      const { urls, numbers }: any = checkDomain(0);
      // console.log(process.env);
      // console.log(`params:${params}`);
      const { startRow, endRow, filterModel, sortModel } = params.request;
      if (urls) {
        let url = urls;
        // Sorting
        if (sortModel.length) {
          const { colId, sort } = sortModel[0];
          url += `_sort=${colId}&_order=${sort}&`;
        }
        //Pagination
        url += `_start=${startRow}&_end=${endRow}&`;

        //Filtering
        const filterKeys = Object.keys(filterModel);
        filterKeys.forEach((filter) => {
          const value =
            filterModel[filter].filter.charAt(0).toUpperCase() +
            filterModel[filter].filter.slice(1);
          url += `${filter}=${value}&`;
        });

        fetch(url)
          .then((httpResponse) => httpResponse.json())
          .then((response) => {
            params.successCallback(response, numbers);
            // console.log(response, numbers);

            params.api.setColumnDefs(filterHeader(response));
          })
          .catch((error) => {
            console.error(error);
            params.failCallback();
          });
      }
    },
  };

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
    // if (newFilterModel) {
    //   params.api.setServerSideDatasource(params.successCallback(newParam));
    // }

    params.api.setServerSideDatasource(datasource);
  };

  return (
    <>
      {group === "group" && (
        <Box style={{ height: "100%" }}>
          <GroupMenus
            heading={tableHeader}
            filter={filter}
            group={"group"}
            slicers={slicers}
            sideSlicers={sideSlicers}
            onGridReady={onGridReady}
            newFilterModel={newFilterModel}
            setNewFilterModel={setNewFilterModel}
            id={id}
          />
          {/* {slicers && <SlicersGroup />} */}
          <TableHeaderMenu
            heading={tableHeader}
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
      {group === "tab" && (
        <Box style={{ height: "100%" }}>
          <GroupMenus
            id={id}
            heading={tableHeader}
            filter={filter}
            group={"tab"}
            slicers={slicers}
            sideSlicers={sideSlicers}
            onGridReady={onGridReady}
            newFilterModel={newFilterModel}
            setNewFilterModel={setNewFilterModel}
          />
          <TabComponent
            sideSlicers={sideSlicers}
            filter={filter}
            slicers={slicers}
            id={id}
            layout={layout}
            group={"tab"}
            onGridReady={onGridReady}
            newFilterModel={newFilterModel}
            setNewFilterModel={setNewFilterModel}
          />
        </Box>
      )}
    </>
  );
};
