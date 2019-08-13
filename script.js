const { render } = ReactDOM;
const { createElement, Component } = React;

const root = document.querySelector('#container');

const users = [
  faker.helpers.createCard(),
  faker.helpers.createCard(),
  faker.helpers.createCard(),
  faker.helpers.createCard(),
  faker.helpers.createCard(),
  faker.helpers.createCard(),
  faker.helpers.createCard(),
];

users.forEach(user => user.isFavorite = false);

class App extends Component {
  constructor() {
    super();
    this.state = {
      users,
      count: 0
    };
  }

  render() {
    const toggle = (user) => {
      user.isFavorite = !user.isFavorite;
      const count = users.filter(user => user.isFavorite).length;
      this.setState({ users, count });
    }

    const addUser = (users) => {
      users.push(faker.helpers.createCard());
      this.setState({ users });
    };

    const { users } = this.state;
    const title = createElement('h1', null, 'Acme Faker Favorites');
    const counter = createElement(
      'h2',
      {
        onClick: () => addUser(users)
      },
      `You have (${this.state.count}) favorite users!`
    );

    const listOfUsers = users.map(user => createElement(
      'li',
      {
        key: user.name,
        className: 'list-group-item',
        className: user.isFavorite ? 'favorite' : '',
        onClick: () => toggle(user)
      },
      user.name
    ));

    const list = createElement('ul', {className: 'list-group'}, listOfUsers);

    return createElement('div', { id: 'user-list'}, title, counter, list);
  }
}

render(createElement(App), root);
