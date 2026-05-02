export const fetchUsers = async (page, search) => {
  const limit = 10;
  const skip = (page - 1) * limit;

  let url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
  if (search) {
    url = `https://dummyjson.com/users/search?q=${search}`;
  }

  const res = await fetch(url);
  return res.json();
};