import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Link from "next/link";

import SessionsTable from "@/components/pages/Sessions/SessionsTable";

const Sessions = () => {
  return (
    <div className="flex flex-col p-3 sm:p-6 h-full">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-white font-semibold">All Sessions</h3>
        </div>
        <div>
          <Link
            href="/session"
            className='flex bg-white border-0 px-1 sm:px-3 py-1 sm:py-2'
            onClick={()=>{}}
          >
            <AddOutlinedIcon className="mx-1 sm:mx-2" />
            <p className="font-semibold mx-1 sm:mx-2">
              New Session
            </p>
          </Link>
        </div>
      </div>
      <SessionsTable />
    </div>
  );
};

export default Sessions;
