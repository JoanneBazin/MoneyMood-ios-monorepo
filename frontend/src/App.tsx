import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "@/styles/index.scss";
import { InstallPrompt } from "./layouts/components";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <InstallPrompt />
    </BrowserRouter>
  );
}

export default App;
