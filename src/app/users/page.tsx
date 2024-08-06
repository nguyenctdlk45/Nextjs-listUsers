import React from "react";
import UserTable from "@/component/users/users.table";
// import Head from "next/head";
interface Props {
  params: string;
  searchParams: {
    [key: string]: string;
  };
}

async function Users(props: Props) {
  const LIMIT = 5;
  console.log(">>>>>>>>>>>>>>>", props);

  const page = props?.searchParams?.page ?? 1; // nếu có props mà props có searchParams mà searchParams có page thì lấy giá trị đó, ngược lại trả về 1
  const res = await fetch(
    `http://localhost:8000/users?_page=${page}&_limit=${LIMIT}`,
    {
      method: "GET",
      next: { tags: ["list-user"] },
    }
  );
  const total_items = +(res.headers?.get("X-Total-Count") ?? 0);
  const data = await res.json();

  // console.log("check data", res.headers.get("X-Total-Count"));
  return (
    <div>
      {/* <link rel="canonical" href="http://localhost:8000/users/" /> */}
      <div>user</div>
      <UserTable
        users={data ? data : []}
        meta={{
          current: +page,
          pageSize: LIMIT,
          total: total_items,
        }}
      />
    </div>
  );
}

export default Users;
