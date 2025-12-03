import { styled } from "@mui/material/styles";
import { Box, Paper, TextField, Button } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  backgroundColor: theme.palette.background.default,
  height: "100vh",
}));

export const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  paddingBottom: "1rem",
  borderBottom: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
}));

export const HeaderTop = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const HeaderBottom = styled(Box)({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
});

export const SearchField = styled(TextField)({
  width: 320,
  backgroundColor: "white",
});

export const TableWrapper = styled(Paper)(({ theme }) => ({
  padding: "1rem",
  borderRadius: 12,
  boxShadow: theme.shadows[3],
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
}));

export const TableContainer = styled(Box)({
  overflowY: "auto",
  flexGrow: 1,
});

export const StyledTableHead = styled("thead")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const CreateButton = styled(Button)({
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  borderRadius: 8,
});
