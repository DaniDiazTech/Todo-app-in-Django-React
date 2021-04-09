import { taskInterface } from '../../interfaces/appInterfaces';

export const sendData = async (url: string, task: taskInterface, action:string) => {
  try {
    await fetch(url, {
      method: action,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });
  } catch (error) {
    console.warn(error)
  }
};
