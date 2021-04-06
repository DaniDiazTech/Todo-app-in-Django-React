import React, { createContext, ReactNode, useState } from 'react'

const initialState = {
  taskList: [],
  setTaskList: (state:any) => void
}

const ToDoContext = createContext(initialState);
    
type ToDoProviderProps = {
  children: ReactNode
}

const ToDoProvider = ({children}:ToDoProviderProps) => {
    const [taskList, setTaskList] = useState({
      data: [],
      loading: true,
    });

    return (
       <ToDoContext.Provider value={{
         taskList,
         setTaskList
       }}>
         {children}
       </ToDoContext.Provider>
    )
}

export default React.memo(ToDoProvider);
