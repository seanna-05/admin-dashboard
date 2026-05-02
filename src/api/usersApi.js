export const fetchUsers = async ({ queryKey }) => {
  const [_key, page] = queryKey;

  const limit = 10;
  const skip = (page - 1) * limit;

  const res = await fetch(
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await res.json();
  return data;
};