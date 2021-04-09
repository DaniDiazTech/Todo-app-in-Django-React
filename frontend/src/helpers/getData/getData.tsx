const url: string = 'http://localhost:8000/api/task-list';

export const getData = async () =>{
  const response = await fetch(url)
  const data = await response.json()
  return data;
}


