import Router from "./routes/Router.jsx";
import useSession from "./hooks/auth/useSession.js";

function App() {
  useSession();

  return <Router />;
}

export default App;
