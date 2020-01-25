interface Options {
  method?: string;
  body?: any;
}

export default (url: string, options: Options = {}, isAuth?: boolean) => {
  const { method = "GET", body = null } = options;
  const stringifiedBody = body ? JSON.stringify(body) : null;
  const token = localStorage.getItem("token") || "";
  return fetch(`http://localhost:3000${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      auth: isAuth ? token : ""
    },
    body: stringifiedBody
  })
    .then(res => {
      if (res.status !== 200) {
        throw new Error(`${res.status} ${res.statusText}`);
      }

      return res;
    })
    .then(res => res.json())
    .catch(e => alert(e.message));
};
