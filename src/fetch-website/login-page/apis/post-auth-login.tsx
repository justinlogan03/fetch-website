export const postAuthLogin = async (
  name: string,
  email: string
): Promise<{ isSuccess: boolean }> => {
  try {
    const authBody = { name, email };
    const authRes = await fetch(
      "https://frontend-take-home-service.fetch.com/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authBody),
        credentials: "include",
      }
    );

    if (authRes.ok === true && authRes.status === 200) {
      return { isSuccess: true };
    } else {
      return { isSuccess: false };
    }
  } catch (error) {
    return { isSuccess: false };
  }
};
