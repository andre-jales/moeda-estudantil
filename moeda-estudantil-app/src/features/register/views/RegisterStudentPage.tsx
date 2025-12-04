import { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Form,
  SubmitButton,
  Title,
  BackButton,
} from "./styles/RegisterStudentPage.styled";
import { REGISTER_STUDENT_PAGE_TEXTS } from "../utils/constants";
import { useLoadInstitutions } from "../../institutions/hooks/useLoadInstitutions";
import { useCreateStudent } from "../../students/hooks/useCreateStudent";
import {
  isValidCpf,
  isValidEmail,
  formatCpf,
} from "../../../shared/utils/helperFunctions";

const RegisterStudentPage = () => {
  const navigate = useNavigate();
  const { mutateAsync: createStudent, isPending } = useCreateStudent();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
    address: "",
    course: "",
    institutionId: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [institutionSearch, setInstitutionSearch] = useState("");
  const [page] = useState(1);
  const [limit] = useState(20);

  const {
    data: institutionsData,
    isLoading,
    refetch,
  } = useLoadInstitutions(
    page,
    limit,
    institutionSearch.length >= 3 ? institutionSearch : undefined
  );

  useEffect(() => {
    if (institutionSearch.length >= 3) refetch();
  }, [institutionSearch, refetch]);

  const handleChange = (field: keyof typeof form, value: string) => {
    if (field === "cpf") {
      value = formatCpf(value.replace(/\D/g, ""));
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.cpf ||
      !form.address ||
      !form.course ||
      !form.institutionId
    ) {
      return setError("Preencha todos os campos.");
    }

    if (!isValidEmail(form.email)) return setError("Email inválido.");
    if (!isValidCpf(form.cpf)) return setError("CPF inválido.");

    try {
      await createStudent(form);
      navigate("/login");
    } catch {
      setError("Erro ao cadastrar o aluno.");
    }
  };

  return (
    <Container>
      <Card elevation={6}>
        <Title variant="h5" fontWeight={700} gutterBottom>
          {REGISTER_STUDENT_PAGE_TEXTS.title}
        </Title>

        <Typography variant="body2" color="text.secondary" mb={3}>
          {REGISTER_STUDENT_PAGE_TEXTS.subtitle}
        </Typography>

        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Nome"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Senha"
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="CPF"
                value={form.cpf}
                onChange={(e) => handleChange("cpf", e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Endereço"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Curso"
                value={form.course}
                onChange={(e) => handleChange("course", e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Autocomplete
                options={institutionsData?.items || []}
                getOptionLabel={(option) => option.name}
                noOptionsText={"Instituição não encontrada"}
                loading={isLoading}
                onInputChange={(_, value) => setInstitutionSearch(value)}
                onChange={(_, value) =>
                  handleChange("institutionId", value?.id || "")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Instituição"
                    fullWidth
                    required
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoading ? <CircularProgress size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>

          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {error}
            </Typography>
          )}

          <SubmitButton
            type="submit"
            variant="contained"
            fullWidth
            disabled={isPending}
            sx={{ mt: 2 }}
          >
            {REGISTER_STUDENT_PAGE_TEXTS.submitButton}
          </SubmitButton>

          <BackButton
            variant="outlined"
            fullWidth
            onClick={() => navigate("/register")}
            sx={{ mt: 1 }}
          >
            {REGISTER_STUDENT_PAGE_TEXTS.backButton}
          </BackButton>
        </Form>
      </Card>
    </Container>
  );
};

export default RegisterStudentPage;
