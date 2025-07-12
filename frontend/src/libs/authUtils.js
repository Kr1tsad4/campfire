const userLogin = async (url, user) => {
  try {
    const res = await fetch(`${url}/auth`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...user,
      }),
    });
    const loginResult = await res.json();
    return loginResult;
  } catch (e) {
    throw new Error("can not login");
  }
};

export { userLogin };
