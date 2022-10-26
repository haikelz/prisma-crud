import { Children } from "src/types";

const Layout = ({ children }: Children) => {
  return (
    <div className="container max-w-full bg-white dark:bg-gray-900 min-h-screen dark:text-white">
      <main className="flex justify-center items-center">{children}</main>
    </div>
  );
};

export default Layout;
