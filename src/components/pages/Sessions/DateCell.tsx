import React, { FC } from "react";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import IconButton from "@mui/material/IconButton";

const DateCell: FC<{row: Record<string, string | number | null>}> = ({ row }) => {
  return (
    <div className="flex gap-1 items-center">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="date"
      >
        <CalendarTodayOutlinedIcon />
      </IconButton>
      <p>{row.date}</p>
    </div>
  );
};

export default DateCell;
