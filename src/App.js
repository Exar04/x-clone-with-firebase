import { AuthProvider } from "./context/authContext";
import { Hehe } from "./pages/heh";
import { Home } from "./pages/home";
import {Login} from "./pages/login"
import { SignIn } from "./pages/signup";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        {/* <Login />
        <Home /> */}
        <SignIn />
        {/* <Hehe /> */}
      </div>
    </AuthProvider>
  );
}

export default App;
