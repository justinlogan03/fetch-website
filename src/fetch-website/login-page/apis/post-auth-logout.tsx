export const postAuthLogout = async (): Promise<{ isSuccess: boolean }> => {
  try {
    const authRes = await fetch(
      "https://frontend-take-home-service.fetch.com/auth/logout",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
