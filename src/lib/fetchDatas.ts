export const fetchDatas = (url: string) =>
  fetch(url).then((res) => {
    if (res.ok) {
      return res.json() as Promise<any>;
    } else {
      return res.json().then((error) => {
        throw error;
      });
    }
  });
