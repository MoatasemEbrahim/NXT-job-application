import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface AppBarProps {
    toggleSidebar: () => void
}

const AppBar = ({ toggleSidebar }: AppBarProps) => (
  <MuiAppBar position="static" className='bg-black1'>
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        className='mr-2'
        onClick={toggleSidebar}
      >
        <MenuIcon />
      </IconButton>
      <h3 className='grow text-white'>
                NXT solutions
      </h3>
      <div>
        <IconButton
          size="medium"
          edge="start"
          className='ml-1 text-white flex items-center'
        >
          <p className='text-sm'>Jane Doe</p>
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
    </Toolbar>
  </MuiAppBar>
);

export default AppBar;
