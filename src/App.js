import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoList} from "./TodoList";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";

import {Login} from './component/Login';
import { TextField } from '@material-ui/core';
import {Button} from '@material-ui/core';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

localStorage.setItem("email", "test@mail.com");
localStorage.setItem("password", "123");

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {items: [], text: '', priority: 0, dueDate: moment(), isLoggedIn: false, password:'', email:''};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }


    render() {

        const LoginView = () => (
            <Login
            handleLogin = {this.handleLogin}
            handleEmail = {this.handleEmail}
            handlePassword = {this.handlePassword}
            />
        );
        const TodoView = () => (
            <div>
                
                <br/>
                <br/>
                <form onSubmit={this.handleSubmit} className="todo-form">
                    <h3>New TODO</h3>
                    <label htmlFor="text" className="right-margin">
                        Text:
                    </label>

                    <TextField
                        id="text"
                        onChange={this.handleTextChange}
                        value={this.state.text}>
                    </TextField>

                    <br/>
                    <br/>
                    <label htmlFor="priority" className="right-margin">
                        Priority:
                    </label>

                    <TextField
                        id="priority"
                        type="number"
                        onChange={this.handlePriorityChange}
                        value={this.state.priority}>
                    </TextField>
                    <br/>
                    <br/>

                    <DatePicker
                        id="due-date"
                        selected={this.state.dueDate}
                        placeholderText="Due date"
                        onChange={this.handleDateChange}>
                    </DatePicker>
                    <br/>
                    <Button
                    type="submit"
                    className="submit">
                        Add #{this.state.items.length + 1}
                    </Button>
                </form>
				
                <br/>
                <br/>
                <TodoList todoList={this.state.items}/>
            </div>
        );

        if(!this.state.isLoggedIn){
            return (
                <div className="App">
                    <Router>
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h1 className="App-title">TODO React App</h1>
                        </header>
  
                        <div>
                            <Route exact path="/" component={LoginView}/>
                        </div>
                    </div>
                    </Router>
                </div>
                    
            );
        }
        else{
            return (
                <div className="App">
                    <Router>
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h1 className="App-title">TODO React App</h1>
                        </header>

    
                        <div>
                            <Route path="/" component={TodoView}/>
                        </div>
                    </div>
                    </Router>
                </div>
                    
            );
        }
        
    }

    handleLogin = e => {
        if(localStorage.getItem("email") == this.state.email && localStorage.getItem("password") == this.state.password)
        this.setState({
            isLoggedIn: true
        });
    }

    handleEmail(e) {
        this.state.email = e.target.value
    }

    handlePassword(e) {
        this.state.password = e.target.value
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handlePriorityChange(e) {
        this.setState({
            priority: e.target.value
        });
    }

    handleDateChange(date) {
        this.setState({
            dueDate: date
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.text.length || !this.state.priority.length || !this.state.dueDate)
            return;

        const newItem = {
            text: this.state.text,
            priority: this.state.priority,
            dueDate: this.state.dueDate,

        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: '',
            priority: '',
            dueDate: ''
        }));
    }

}

export default App;
