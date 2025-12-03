import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./features/login/views/LoginPage";
import MainLayout from "./features/dashboard/views/MainLayout";
import InstitutionsPage from "./features/institutions/views/InstitutionsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />} />

        <Route element={<MainLayout />}>
          <Route path="/instituicoes" element={<InstitutionsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
