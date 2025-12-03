import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./features/login/views/LoginPage";
import { PrivateRoute } from "./PrivateRoute";
import MainLayout from "./features/dashboard/views/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
