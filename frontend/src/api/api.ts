export const login = async (email: string, password: string) => {
  const res = await fetch(process.env.API_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  return data;
};
