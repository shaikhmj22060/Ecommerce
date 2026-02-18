import { Nav } from "./Components/Nav";
import { Outlet } from "react-router";
import { Error } from "./Components/Error";
import { useSelector } from "react-redux";

export const Layout = () => {
  const { error, loading } = useSelector((state) => state.products);
  return (
    <div>
      <Nav />
      <div className="flex flex-col space-y-3 flex-wrap absolute top-20 right-3 z-30">
        {error.length > 0 &&
          error.map((err) => (
            <Error key={err.id} id={err.id} error={err.message} />
          ))}
      </div>
      {
        loading && (
          <div>
            <h1>Loading ...</h1>
          </div>
        )
      }
      <Outlet />
    </div>
  );
};
