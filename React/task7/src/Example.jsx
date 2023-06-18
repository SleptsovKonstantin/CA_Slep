import { createRef } from "react";

import {
  Outlet,
  createBrowserRouter,
  NavLink,
  useLocation,
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Container, Navbar, Nav } from "react-bootstrap";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contacts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./example-style.css";

const routes = [
  { path: "/", name: "Home", element: <Home />, nodeRef: createRef() },
  { path: "/about", name: "About", element: <About />, nodeRef: createRef() },
  {
    path: "/contact",
    name: "Contact",
    element: <Contact />,
    nodeRef: createRef(),
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Example />,
    children: routes.map((route) => ({
      index: route.path === "/",
      path: route.path === "/" ? undefined : route.path,
      element: route.element,
    })),
  },
]);

function Example() {
  const location = useLocation();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};

  return (
    <>
      <Navbar bg="light">
        <Nav className="mx-auto">
          {routes.map((route) => (
            <Nav.Link
              key={route.path}
              as={NavLink}
              to={route.path}
              className={({ isActive }) => (isActive ? "active" : undefined)}
              end
            >
              {route.name}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar>
      <Container className="container">
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            {(state) => (
              <div ref={nodeRef} className="page">
                <Outlet />
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </Container>
    </>
  );
}
