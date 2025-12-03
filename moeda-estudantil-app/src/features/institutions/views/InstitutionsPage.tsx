import type { FC } from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import { useLoadInstitutions } from "../hooks/useLoadInstitutions";
import { useCreateInstitution } from "../hooks/useCreateInstitution";
import { useUpdateInstitution } from "../hooks/useUpdateInstitution";

import {
  Container,
  HeaderWrapper,
  HeaderTop,
  HeaderBottom,
  SearchField,
  TableWrapper,
  CreateButton,
  TableContainer,
  StyledTableHead,
} from "./styles/InstitutionsPage.styled";

import { INSTITUTIONS_PAGE_TEXT } from "../utils/constants";
import type { IInstitution } from "../types/IInstitution";

const InstitutionsPage: FC = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<IInstitution | null>(null);
  const [instName, setInstName] = useState("");

  const { data: institutions, refetch } = useLoadInstitutions(
    page + 1,
    limit,
    search
  );

  const items = institutions?.items ?? [];
  const total = institutions?.total ?? 0;

  const { mutateAsync: createInstitution } = useCreateInstitution();
  const { mutateAsync: updateInstitution } = useUpdateInstitution();

  const handleCreate = () => {
    setEditing(null);
    setInstName("");
    setOpenModal(true);
  };

  const handleEdit = (institution: IInstitution) => {
    setEditing(institution);
    setInstName(institution.name);
    setOpenModal(true);
  };

  const handleSave = async () => {
    if (editing) {
      await updateInstitution({ id: editing.id, newInstitutionName: instName });
    } else {
      await createInstitution(instName);
    }
    setOpenModal(false);
    await refetch();
  };

  return (
    <Container>
      <HeaderWrapper>
        <HeaderTop>
          <h2 style={{ margin: 0 }}>{INSTITUTIONS_PAGE_TEXT.title}</h2>
        </HeaderTop>

        <HeaderBottom>
          <SearchField
            placeholder={INSTITUTIONS_PAGE_TEXT.searchPlaceholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
          />

          <CreateButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            {INSTITUTIONS_PAGE_TEXT.createButton}
          </CreateButton>
        </HeaderBottom>
      </HeaderWrapper>

      <TableWrapper>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>{INSTITUTIONS_PAGE_TEXT.table.name}</TableCell>
            </TableRow>
          </StyledTableHead>
        </Table>

        <TableContainer>
          <Table>
            <TableBody>
              {items.length === 0 && (
                <TableRow>
                  <TableCell>{INSTITUTIONS_PAGE_TEXT.table.empty}</TableCell>
                </TableRow>
              )}

              {items.map((i: IInstitution) => (
                <TableRow key={i.id} hover>
                  <TableCell
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingRight: "56px",

                      "& .edit-btn": {
                        opacity: 0,
                        transition: "opacity 0.2s",
                      },
                      "&:hover .edit-btn": {
                        opacity: 1,
                      },
                    }}
                  >
                    {i.name}

                    <IconButton
                      className="edit-btn"
                      onClick={() => handleEdit(i)}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={limit}
          onRowsPerPageChange={(e) => {
            setLimit(parseInt(e.target.value, 10));
            setPage(0);
          }}
          sx={{ overflow: "hidden" }}
          labelRowsPerPage={INSTITUTIONS_PAGE_TEXT.pagination.rowsPerPage}
        />
      </TableWrapper>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth>
        <DialogTitle>
          {editing
            ? INSTITUTIONS_PAGE_TEXT.modal.editTitle
            : INSTITUTIONS_PAGE_TEXT.modal.createTitle}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label={INSTITUTIONS_PAGE_TEXT.modal.nameLabel}
            value={instName}
            onChange={(e) => setInstName(e.target.value)}
            sx={{ marginTop: 1 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>
            {INSTITUTIONS_PAGE_TEXT.modal.cancel}
          </Button>
          <Button variant="contained" onClick={handleSave}>
            {INSTITUTIONS_PAGE_TEXT.modal.save}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InstitutionsPage;
