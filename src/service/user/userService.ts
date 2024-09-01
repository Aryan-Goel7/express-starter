import { addUser, getUsers } from '../../model/user/userModel';
import { TUser } from '../../types/types';
let id = 0;
export const createUser = (name: string) => {
  const newUser: TUser = {
    name,
    _id: id.toString(),
  };
  id++;
  addUser(newUser);
};
export const fetchUser = () => {
  return getUsers();
};

