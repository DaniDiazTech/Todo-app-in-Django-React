import { taskInterface } from '../interfaces/appInterfaces';

export const sendData = async (url: string, task: taskInterface) => {
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });
  } catch (error) {
    console.warn(error)
  }
};
