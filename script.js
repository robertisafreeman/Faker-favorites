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

console.log(users);

class App extends Component {
  constructor() {
    super();
    this.state = {
      users,
      count: 0
    };
  }

  render() {
    const { users, count } = this.state;
    const title = createElement('h1', null, 'Acme Faker Favorites');
    const counter = createElement('h2', null, `You have (${count}) favorite users!`);

    const toggle = (user) => {
      user.isFavorite = !user.isFavorite;
      this.setState({ users });
    }

    const listOfUsers = users.map(user => createElement(
      'li',
      {
        key: user.name,
        className: user.isFavorite ? 'favorite' : '',
        onClick: () => toggle(user)
      },
      user.name
    ));

    const list = createElement('ul', null, listOfUsers);

    return createElement('div', { id: 'user-list'}, title, counter, list);
  }
}

render(createElement(App), root);
