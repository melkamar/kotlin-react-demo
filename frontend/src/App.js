import * as React from "react/cjs/react.development";

class App extends React.Component {
    render() {
        return (
            <UserList/>
        )
    }
}

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    render() {
        const {error, isLoaded, items} = this.state

        if (error) {
            return <h3>Error: {error.message}</h3>
        } else if (!isLoaded) {
            return <h3>Loading...</h3>
        } else {
            return (
                <div class="container">
                    <div class="row">
                        <div class="col-10">
                            <table class="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col"/>
                                    <th scope="col"/>
                                </tr>
                                </thead>
                                <tbody>
                                {items.map(item => (this.renderUser(item)))}
                                </tbody>
                            </table>
                            <AddUserForm/>
                        </div>
                    </div>
                </div>
            )
        }
    }


    renderUser(user) {
        return (
            <User value={user}/>
        )
    }

    fetchData() {
        console.log("fetching...");
        fetch("http://localhost:8080/api/user")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        error: null,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )
    }

    componentDidMount() {
        this.fetchData();
        setInterval(this.fetchData.bind(this), 2000);
    }
}

function User(props) {
    console.log(props);
    return (
        <tr>
            <td>{props.value.username}</td>
            <td>{props.value.email}</td>
        </tr>
    )
}

class AddUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: null, email: null};
        this.usernameChange = this.usernameChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
    }

    usernameChange(username) {
        this.setState({username: username.target.value})
    }

    emailChange(email) {
        this.setState({email: email.target.value})
    }

    handleAddUser(e) {
        e.preventDefault();

        console.log("username: " + this.state.username);
        console.log("EMAIL: " + this.state.email);
        fetch("http://localhost:8080/api/user", {
                body: JSON.stringify(this.state),
                method: "POST",
                headers: {"Content-Type": "application/json"},
                mode: "cors"
            }
        ).then(response => {
            if (response.ok) this.setState({name: "", email: ""})
        })
    }

    render() {
        return (
            <form onSubmit={this.handleAddUser}>
                <input type="text" className="form-control" onChange={this.usernameChange} value={this.state.username}/>
                <input type="text" className="form-control" onChange={this.emailChange} value={this.state.email}/>
                <button type="submit" className="btn btn-primary">Add user</button>
            </form>
        )
    }
}

export default App;
