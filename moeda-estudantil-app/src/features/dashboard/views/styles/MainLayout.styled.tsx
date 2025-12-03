import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const Content = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  marginTop: "4rem",
  overflow: "hidden",
}));
