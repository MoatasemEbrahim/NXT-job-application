import React, { FC } from "react";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import IconButton from "@mui/material/IconButton";

const TimeCell: FC<{row: Record<string, string | number | null>}> = ({ row }) => {
  return (
    <div className="flex gap-1 items-center">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="time"
      >
        <AccessAlarmOutlinedIcon />
      </IconButton>
      <p>{`${row.from || ""} - ${row.till || ""}`}</p>
    </div>
  );
};

export default TimeCell;
