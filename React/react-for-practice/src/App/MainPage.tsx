import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import "./main-page-style.css";

export const MainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current location is ", location);
  }, [location]);

  return (
    <>
      <header>
        <button onClick={() => navigate("/", { replace: false })}>Main</button>
        <button onClick={() => navigate("one", { replace: false })}>
          Task One
        </button>

        <button onClick={() => navigate("two", { replace: false })}>
          Task Two
        </button>
        <button onClick={() => navigate("three", { replace: false })}>
          Task Three
        </button>
        <button onClick={() => navigate("four", { replace: false })}>
          Task four
        </button>
        <button onClick={() => navigate("five", { replace: false })}>
          Task five
        </button>
        <button onClick={() => navigate("six", { replace: false })}>
          Task six
        </button>
        <button onClick={() => navigate("eight", { replace: false })}>
          Task eight
        </button>
        <button onClick={() => navigate("nine", { replace: false })}>
          Task nine
        </button>
      </header>

      <div className="content">
        <Outlet />
      </div>
    </>
  );
};
