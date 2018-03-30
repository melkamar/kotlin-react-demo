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
                <ul>
                    {items.map(item => (this.renderUser(item)))}
                </ul>
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
                        error:null,
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
        <li>{props.value.username} ({props.value.email})</li>
    )
}

export default App;