import React,{createContext, useState} from 'react' 

export const ListContext=createContext();
export const ListProvider = props =>{
    const [list,setList]=useState(new Map());
    return (
        <ListContext.Provider value={{list,setList}}>
            {props.children}
        </ListContext.Provider>
    );
}
