import { handleUpdateUserAction } from "@/action";
import { Modal, Input, Form, Row, Col, message } from "antd";
import { useEffect } from "react";

interface IProps {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: any;
}

const UpDateUser = (props: IProps) => {
  const { isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } =
    props;

  const [form] = Form.useForm();
  useEffect(() => {
    if (dataUpdate) {
      //code
      form.setFieldsValue({
        name: dataUpdate.name,
        email: dataUpdate.email,
      });
    }
    // console.log(">>>>>", dataUpdate);
  }, [dataUpdate]);

  const handleCloseUpdateModal = () => {
    // form.resetFields();
    setIsUpdateModalOpen(false);
  };

  const onFinish = async (values: any) => {
    // console.log(values);
    const { name, email } = values;
    if (dataUpdate) {
      const data = {
        id: dataUpdate.id,
        name,
        email,
      };

      await handleUpdateUserAction(data);
      handleCloseUpdateModal();
      message.success("Update user succeed");
    }
  };

  return (
    <Modal
      title="Update user"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseUpdateModal()}
      maskClosable={false}
    >
      <Form
        name="from-update-user"
        onFinish={onFinish}
        layout="vertical"
        form={form}
      >
        <Row gutter={[15, 15]}>
          <Col span={24} md={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                type="email"
                // defaultValue={dataUpdate ? dataUpdate.name : ""}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpDateUser;
