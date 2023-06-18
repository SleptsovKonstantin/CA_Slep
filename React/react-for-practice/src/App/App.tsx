import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MainPage } from "./MainPage";
import MyComponentOne from "../Components/Task1/MyComponentOne";
import { UserListWithLoading } from "../Components/Task2/MyComponentTwo";
import ModalButton from "../Components/Task3/ModalButton";
import ModalButtonWithPortal from "../Components/Task4/ModalButtonPortal";
import ButtonList from "../Components/Task5/ButtonList";
import ButtonDpopdownPortal from "../Components/Task6/ButtonDropdown";
import ListWithDeleting from "../Components/Task8/ListWithDeleting";
import Gallery from "../Components/Task9/Gallery";

import "./app-style.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route
              index
              element={
                <div
                  style={{
                    width: "30vw",
                    height: "30vh",
                    background: "azure",
                    border: "2px solid black",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  No page is selected.
                </div>
              }
            />
            <Route path="/" element={<MainPage />} />
            <Route path="one" element={<MyComponentOne />} />
            <Route path="two" element={<UserListWithLoading />} />
            <Route path="three" element={<ModalButton />} />
            <Route path="four" element={<ModalButtonWithPortal />} />
            <Route path="five" element={<ButtonList />} />
            <Route path="six" element={<ButtonDpopdownPortal />} />
            <Route path="eight" element={<ListWithDeleting />} />
            <Route path="nine" element={<Gallery />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
