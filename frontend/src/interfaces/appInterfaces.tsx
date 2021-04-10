export interface taskInterface {
  id: null;
  nameTask: string;
  description: string;
  complete: boolean;
  editing: boolean;
}

export interface fieldsInterface {
  name: string;
  value: string;
}


export interface toDoProviderInterface {
  taskList: [];
  setTaskList: (state:any) => void;
}