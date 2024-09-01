import { TUser } from '../../types/types';

let users: Array<TUser> = [];

export const addUser = (user: { name: string; _id: string }) => {
  users.push(user);
};
export const getUsers = () => {
  return users;
};

