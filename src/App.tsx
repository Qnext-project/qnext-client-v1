import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import theme from "./styles/theme";
import { reactRouts } from "./utils/reactRouts";
import Signin from "./pages/Auth";
import Home from "./pages/Home";
import User from "./pages/User";
import Admin from "./pages/Admin";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Setting from "./pages/Setting";
import TurnRating from "./pages/User/TurnRating";
import { Queue } from "./pages/Queue.jsx";



function App() {
  return (
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            // progress={undefined}
          />
          <Routes>
            <Route path={reactRouts.home} element={<Home />} />
            <Route path={reactRouts.auth.main} element={<Signin />} />
            <Route path={reactRouts.user.main} element={<User />} />
            <Route
              path={reactRouts.user.turn_rating}
              element={<TurnRating />}
            />
            <Route path={reactRouts.setting.main} element={<Setting />} />
            <Route path={reactRouts.admin.main} element={<Admin />} />
            <Route path={reactRouts.queue.main} element={<Queue />} />
          </Routes>
        </ThemeProvider>
      </Provider>
    </Router>
  );
}

export default App;
