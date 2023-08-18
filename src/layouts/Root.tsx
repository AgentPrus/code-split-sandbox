import { NavLink, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <header>
        <nav>
          <NavLink to="about">About</NavLink>
          <NavLink to="dashboard">Dashboard</NavLink>
          <NavLink to="contact">Contact</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;
