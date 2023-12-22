import React, { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { getSessions } from "@/utils/queries/sessions";
import { Session } from "@/types/session";
import DateCell from "@/components/pages/Sessions/DateCell";
import TimeCell from "@/components/pages/Sessions/TimeCell";
import ActionsCell from "@/components/pages/Sessions/ActionsCell";

const columns: GridColDef[] = [
  { field: "title", flex:1, minWidth:200, headerName: "SessionName", width: 180, cellClassName: "text-white", headerClassName: "text-white", sortable: false },
  { field: "date", headerName: "Date", width: 160, sortable: false,renderCell: DateCell },
  { field: "time", headerName: "Time", sortable: false, width: 160, renderCell: TimeCell},
  { field: "venue", headerName: "Venue", sortable: false, width: 160, valueGetter: (params: GridValueGetterParams) => params.row.venue.name || "" },
  { field: "actions",  headerName: "", sortable: false, width: 60, renderCell: ActionsCell},
];

const SessionsTable = () => {
  const [limit] = useState<number>(12);
  const [page, setPage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [sessions, setSessions] = useState<Session[]>([]);
  
  const handleGetSessions = useCallback(async() => {
    if(!hasNextPage || sessions.length > page*limit) {
      return;
    }
    const offset = page * limit;
    try {
      const data = await getSessions({ eventId: 19, offset, limit  });
      setSessions(prevSessions => [...prevSessions, ...data.sessions]);
      setCount(data.count);
      setHasNextPage(!data.is_last_offset);
    } catch (error) {
      setSessions([]);
    }
  },[page]);

  useEffect(() => {
    handleGetSessions();
  },[handleGetSessions]);

  return (
    <div className="w-full mt-4 h-[calc(100%-80px)] sm:h-[calc(100%-40px)]">
      <DataGrid
        rows={sessions}
        columns={columns}
        className="bg-gray2 h-full text-gray1 flex"
        paginationModel={{ page, pageSize: limit }}
        onPaginationModelChange={({page})=>{setPage(page);}}
        rowCount={count}
        pageSizeOptions={[12]}
        rowSelection={false}
      />
    </div>
  );
};

export default SessionsTable;

