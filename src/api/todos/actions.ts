import axios from 'api/axios';

export const getTodos = (url: string) => {

  return axios.get(url).then(result => {
    const formatedData: {
      id: string,
      name: string,
      date: string,
      status: string,
    }[] = [];

    for (const key in result.data) {
      const {name, date, status} = result.data[key];
      formatedData.push({
        id: key,
        name,
        date,
        status,
      });
    }

    return formatedData;
  })
}
