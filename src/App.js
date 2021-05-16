import AuthProvider, { addAuth } from "./AuthProvider";
import HeaderPage from "./HeaderPage";

function AppRoutes({ authInfo }) {
  if (!authInfo.initialized) return <div />;
  return <HeaderPage />;
}
const AuthAppRoutes = addAuth(AppRoutes);

function App() {
  return (
    <AuthProvider>
      <AuthAppRoutes />
    </AuthProvider>
  );
}

export default App;
