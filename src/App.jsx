import React, {Component} from 'react';
import uniqid from "uniqid";

import './css/App.css';

import Task from "./task";
import Menu from "./Menu";
import EditTask from "./EditTask";
import EditList from "./EditList";

// todo PropsTypes w komponentach

class App extends Component {
    constructor(){
        super();
        this.state = {
            tasks: [
                // {id: 0, name: "programowanie", description: "zrobić tą aplikację", listId:0, date: "2020-07-31", checked: false},
                // {id: 1, name: "kupno samochodu", description: "kupic nowy samochód", listId:1, date: "2020-08-19", checked: false},
            ],
            lists: [
                {id: 0, name: "domyślne"},
                {id: 1, name: "osobiste"},
                {id: 2, name: "praca"}
            ],
            EditTaskActive: false,
            EditListActive: false,
            ActiveListId: 0,
            editedTask:{
                id: 0,
                name: "",
                description: "",
                listId: 0,
                date: "",
                checked: false,
            },
            editedList:{
                id: 3,
                name: "",
            }
        }
        this.editTaskShow = this.editTaskShow.bind(this);
        this.handleEditInit = this.handleEditInit.bind(this);
        this.changeActiveList = this.changeActiveList.bind(this);
        this.handleEditEvent = this.handleEditEvent.bind(this);
        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.handleSaveEvent = this.handleSaveEvent.bind(this);
        this.handelRemoveEvent = this.handelRemoveEvent.bind(this);

        this.editListShow = this.editListShow.bind(this);
        this.handleEditListCancel = this.handleEditListCancel.bind(this);
        this.handleSaveListEvent = this.handleSaveListEvent.bind(this);
        this.handleCheckEvent = this.handleCheckEvent.bind(this);
    }

    componentDidMount() {
        const storageTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const storageLists = JSON.parse(localStorage.getItem("lists")) || [{id: 0, name: "domyślne"}];
        this.setState({ tasks: storageTasks, lists: storageLists });
    }

    editTaskShow(){
        this.setState(prevState => {
            return {EditTaskActive: !prevState.EditTaskActive}
        })
    }

    editListShow(){
        
        this.setState(prevState => {
            return {EditListActive: !prevState.EditListActive}
        })
    }

    handleEditInit(id){
        this.editTaskShow();
        this.setState(prevState => ({
            editedTask: {...prevState.tasks.find(el => el.id === id)}
        }))
    }

    changeActiveList(id){
        this.setState({
            ActiveListId: id
        });
    }

    handleEditEvent(val, type) {
        if(type === 1){
            this.setState(prevState => {
                return {
                    editedTask: Object.assign(prevState.editedTask, val)
                };
            });
        }else{
            this.setState(prevState => {
                return {
                    editedList: Object.assign(prevState.editedList, val)
                };
            });
        }
        console.log(type);
    }


    handleEditCancel(){
        this.setState({
            editedTask: {id: uniqid(), name: "", description: "", date: "", checked: false}
        });
        this.editTaskShow();
    }

    handleSaveEvent(){
        this.setState(prevState => {
            const editedTaskExist  =prevState.tasks.find(
                el => el.id === prevState.editedTask.id
            );

            let updatedTask;
            if(editedTaskExist){
                updatedTask = prevState.tasks.map(el => {
                    if(el.id === prevState.editedTask.id)
                        return prevState.editedTask;
                    else return el;
                });
            }else{
                updatedTask =  [...prevState.tasks, prevState.editedTask];
            }

            return{
                tasks: updatedTask,
                editedTask: {id: uniqid(), name: "", description: "", listId: 0, date: "", checked: false}
            }
        }, () => localStorage.setItem("tasks", JSON.stringify(this.state.tasks)))
        this.editTaskShow();
    }

    handelRemoveEvent(id){
        this.setState(prevState => ({
            tasks: prevState.tasks.filter(el => el.id !== id)
        }), () => localStorage.setItem("tasks", JSON.stringify(this.state.tasks)));
    }

    handleEditListCancel(){
        this.setState({
            editedList: {id: uniqid(), name: ""}
        });
        this.editListShow();
    }

    handleSaveListEvent(){
        this.setState(prevState => {
            const editedListExist  = prevState.tasks.find(
                el => el.id === prevState.editedList.id
            );

            let updatedList;
            if(editedListExist){
                updatedList = prevState.lists.map(el => {
                    if(el.id === prevState.editedList.id)
                        return prevState.editedList;
                    else return el;
                });
            }else{
                updatedList =  [...prevState.lists, prevState.editedList];
            }

            return{
                lists: updatedList,
                editedList: {id: uniqid(), name: ""}
            }
        }, () => localStorage.setItem("lists", JSON.stringify(this.state.lists)))
        this.editListShow();
    }

    handleCheckEvent(id, val){
        console.log(val);
        this.setState(prevState => ({
            editedTask: Object.assign(prevState.tasks.find(el => el.id === id), val)
        }), () => localStorage.setItem("tasks", JSON.stringify(this.state.tasks)))
    }

    render(){
        const tasks = this.state.tasks.map(el => {
            if(el.listId === this.state.ActiveListId)
            return(
                <Task
                    key={el.id}
                    id={el.id}
                    name={el.name} 
                    description={el.description}
                    date={el.date}
                    checked={el.checked}
                    onEditInit={id => this.handleEditInit(id)}
                    onRemove={id => this.handelRemoveEvent(id)}
                    onCheck={(id, val) => this.handleCheckEvent(id, val)}
                />
            ); else return "";
        });
        return(
            <div className="app">
                <Menu
                    lists={this.state.lists}
                    activeListId={this.state.ActiveListId}
                    onChangeList={id => this.changeActiveList(id)}
                    editListShow={() => this.editListShow()}
                />
                <EditTask
                    active={this.state.EditTaskActive}
                    onInputChange={val => this.handleEditEvent(val, 1)}
                    onCancel={() => this.handleEditCancel()}
                    editedTask={this.state.editedTask}
                    lists={this.state.lists}
                    onSave={() => this.handleSaveEvent()}
                />
                {tasks}
                <div className="app__addButton" onClick={() => this.editTaskShow()}>
                    <i className="icon plus"></i>
                </div>
                <EditList
                    active={this.state.EditListActive}
                    onCancel={() => this.handleEditListCancel()}
                    editedList={this.state.editedList}
                    onInputChange={val => this.handleEditEvent(val, 2)}
                    onSave={() => this.handleSaveListEvent()}
                />
            </div>
        )
    }
    
}

export default App;
