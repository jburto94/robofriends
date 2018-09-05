import React, { Component } from 'react';
import 'tachyons';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      robots: [],
      searchField: ''
    };
  }

  onSearchChange = e => {
    this.setState({
      searchField: e.target.value
    });
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(users => this.setState({ robots: users.data}));
  }

  render() {
    const { robots, searchField } = this.state;
    const filteredRobots = robots.filter(robot => (
      robot.name.toLowerCase().includes(searchField.toLowerCase())
    ));

    return (
      <div className='tc'>
        <h1>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList robots={ filteredRobots } />
        </Scroll>
      </div>
    )
  }
}

export default App;