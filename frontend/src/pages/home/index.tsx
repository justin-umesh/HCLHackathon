import { Button } from "flowbite-react";
import React from "react";
import TableTemplate from "../../templates/table-template";

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-red-400">Welcome to the Home Page</h1>
      <Button>Default</Button>
      <Button color="dark">Dark</Button>
      <TableTemplate api="useGetUsersQuery" />
    </div>
  );
};

export default Home;
