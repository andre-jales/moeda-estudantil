import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./features/login/views/LoginPage";
import MainLayout from "./features/dashboard/views/MainLayout";
import InstitutionsPage from "./features/institutions/views/InstitutionsPage";
import StudentsPage from "./features/students/views/StudentsPage";
import RegisterSelectPage from "./features/register/views/RegisterSelectPage";
import RegisterStudentPage from "./features/register/views/RegisterStudentPage";
import RegisterCompanyPage from "./features/register/views/RegisterCompanyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterSelectPage />} />
        <Route path="register/student" element={<RegisterStudentPage />} />
        <Route path="register/company" element={<RegisterCompanyPage />} />
        <Route path="/" element={<MainLayout />} />

        <Route element={<MainLayout />}>
          <Route path="/instituicoes" element={<InstitutionsPage />} />
          <Route path="/alunos" element={<StudentsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
