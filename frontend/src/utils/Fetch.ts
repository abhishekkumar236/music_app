const fetchData = ({
  url,
  method,
  body,
  headers,
}: {
  url: string;
  method: string;
  body?: any;
  headers?: any;
}) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      body: body,
      headers: headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject(response);
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default fetchData;
