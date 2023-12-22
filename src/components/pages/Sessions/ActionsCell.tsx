import React, { FC } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";

const ActionsCell: FC<{row: Record<string, string | number | null>}> = ({ row }) => {
  return (
    <Link href={`/session/${row.id}`}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="edit"
      >
        <ModeEditOutlineOutlinedIcon />
      </IconButton>
    </Link>
  );
};

export default ActionsCell;
