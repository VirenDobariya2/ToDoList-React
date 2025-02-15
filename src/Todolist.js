import React, { useState, useEffect } from "react";
import "./index.css"

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists);
    }else{
        return[];
    }
    };
    

const Todolist = () => {
    const [ inputdata, setInputData] = useState();
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);


    // add the items function
    const addItem = () => {
        if(!inputdata){
            alert("plz fill the data");
        }else if (inputdata && toggleButton) {
            setItems(
              items.map((curElem) => {
                if (curElem.id === isEditItem) {
                  return { ...curElem, name: inputdata };
                }
                return curElem;
              })
            );
      
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name:inputdata,
            };
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    };

    //edit the items
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
        return curElem.id === index;
    });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    };

    // how to Delete items
    const deleteItem =(index) =>{
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedItems);
    };

    // remove all the elements
    const removeAll = () => {
    setItems([]);
  };

  // adding localStorage
    useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);
 

  return (
   <>
   <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./Image/todo.svg" alt="todologo" />
                <figcaption>Add Your list Here ✌</figcaption>
            </figure>
            <div className="addItem">
                <input type="text" 
                placeholder="✍ Add Item" 
                className="form-control"
                value={inputdata}
                onChange={(event) => setInputData(event.target.value)}></input>
                {toggleButton ? (
                    <i className="fa fa-edit add-btn" onClick={addItem}></i>
                    ) : (
                    <i className="fa fa-plus add-btn" onClick={addItem}></i>
                )}
            </div>
            {/* show our items */}
            <div className="showItems">
                {
                    items.map((curElem) => {
                        return(
                            <div className="eachItem" key={curElem.id}>
                            <h3>{curElem.name}</h3>
                            <div className="todo-btn">
                            <i className="far-solid fas fa-edit add-btn" 
                            onClick={() => editItem(curElem.id)}></i>
                            <i className="far-solid fas fa-trash-alt add-btn" 
                            onClick={() => deleteItem(curElem.id) }></i>
                            </div>
                            </div>
                        );
                    })
                }                
            </div>

            {/* remove all button */}
            <div className="showItem">
                <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                    <span>CHECK LIST </span> </button>
            </div>
        </div>
   </div>
   </>
  );
};

export default Todolist;
