import React from "react";
import Table from "@/UI/Table";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
  },
];
const data = [
  {
    key: "1",
    username: "demo",
    password: "5555",
  },
  {
    key: "2",
    username: "staff",
    password: "staff",
  },
];

const LoginTable = () => {
  return <Table columns={columns} data={data} pagination={false} />;
};

export default LoginTable;
