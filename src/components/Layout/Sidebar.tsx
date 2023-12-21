import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EventIcon from "@mui/icons-material/Event";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => (
  <Drawer
    anchor="left"
    variant='persistent'
    // slotProps={{ backdrop: { invisible: true }}}
    hideBackdrop
    sx={{ "& .MuiDrawer-paper": { marginTop: "64px", backgroundColor: "#2e2e2e" } }}
    open={isOpen}
    onClose={toggleSidebar}
  >
    <div className='px-4'>
      <List className='bg-black1'>
        <ListItem disablePadding className='bg-black1'>
          <ListItemButton>
            <ListItemIcon className='text-gray1'>
              <HomeOutlinedIcon />
            </ListItemIcon >
            <ListItemText primary="Home" className='text-gray1' />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider className='bg-gray1' />
      <List>
        {["Planning", "Sessions"].map((text) => (
          <ListItem key={text} disablePadding className={text === "Sessions" ? "bg-[#484848]" : "bg-black1"}>
            <ListItemButton>
              <ListItemIcon className={text === "Sessions" ? "text-white" : "text-gray1"}>
                <EventIcon />
              </ListItemIcon >
              <ListItemText primary={text} className={text === "Sessions" ? "text-white" : "text-gray1"} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  </Drawer>
);

export default Sidebar;
