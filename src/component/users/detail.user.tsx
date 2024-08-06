import { IUser } from "@/types/backend";

interface IProps {
  user: IUser;
}
function Detail(props: IProps) {
  const { user } = props;
  // console.log(user);

  return (
    <div>
      <div> Id :{user.id}</div>
      <div> Name :{user.name}</div>
      <div> Email :{user.email}</div>
    </div>
  );
}

export default Detail;
