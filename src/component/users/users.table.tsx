"use client";
import { IUser } from "@/types/backend";
import { Button, Popconfirm, Table } from "antd";
import type { TableColumnsType } from "antd";
import {
  PlusOutlined,
  DeleteTwoTone,
  EditTwoTone,
  InfoOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CreateUser from "@/component/users/create.user";
import UpDateUser from "@/component/users/update.user";
import { handleDeleteUserAction } from "@/action";
import { Suspense } from "react";
import Loading from "@/app/users/loading";
import router from "next/router";
import Link from "next/link";

interface IProps {
  users: IUser[] | [];
  meta: {
    current: number;
    pageSize: number;
    total: number;
  };
}

const UserTable = (props: IProps) => {
  const { users, meta } = props;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<any>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const columns: TableColumnsType<IUser> = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Actions",
      align: "center",

      render: (text, record, index) => {
        // console.log("record", record);

        return (
          <>
            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: "pointer", margin: "0 20px" }}
              onClick={() => {
                setDataUpdate(record);
                setIsUpdateModalOpen(true);
              }}
            />

            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa user"}
              description={"Bạn có chắc chắn muốn xóa user này ?"}
              onConfirm={() => handleDeleteUser(record)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer" }}>
                <DeleteTwoTone twoToneColor="#ff4d4f" />
              </span>
            </Popconfirm>
            <Link href={`/users/${record.id}`}>
              <InfoOutlined style={{ cursor: "pointer", margin: "0 20px" }} />
            </Link>
          </>
        );
      },
    },
  ];
  const handleDeleteUser = async (user: IUser) => {
    await handleDeleteUserAction({ id: user.id });
  };

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pagination.current);
      replace(`${pathname}?${params.toString()}`);
      // setIsFetching(true)
    }
  };
  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table List Users</span>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Thêm mới
        </Button>
      </div>
    );
  };
  // const handleRowClick = (record: any) => {
  //   const { id } = record;
  //   router.push(`/users/${id}`);
  // };
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Table
          title={renderHeader}
          bordered
          rowKey={"id"}
          dataSource={users}
          columns={columns}
          onChange={onChange}
          pagination={{
            ...meta,
            // showTotal: (total, range) => {
            //   return (
            //     <div>
            //       {" "}
            //       {/* {range[0]}-{range[range.length - 1]} */}
            //     </div>
            //   );
            // },
          }}
        />
      </Suspense>

      <CreateUser
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      <UpDateUser
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </div>
  );
};
export default UserTable;
