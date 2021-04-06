export interface taskInterface {
  id: string | null;
  nameTask: string;
  description: string;
  completed: boolean;
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