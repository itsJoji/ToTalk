import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  headers: {
    "API-KEY": "4a415add-87af-4e15-8373-1f7a1706053b",
  },
  baseURL: 'https://social-network.samuraijs.com/api/1.0/'
});
export const getUsers = (currentPage, pageSize) => {
  return instance
    .get(
      `users?page=${currentPage}&count=${pageSize}`
    )
    .then((response) => response.data);
};


export const deleteFollow = (userId) => {
  return instance.delete('follow/' + userId)
}
