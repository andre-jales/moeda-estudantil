import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { Content } from "./styles/MainLayout.styled";

const MainLayout = () => {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />

      <Content>
        <Outlet />
      </Content>
    </Box>
  );
};

export default MainLayout;
