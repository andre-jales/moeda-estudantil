import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./features/login/views/LoginPage";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div>Protected App Content</div>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
