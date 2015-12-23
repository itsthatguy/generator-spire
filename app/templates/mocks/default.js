module.exports = [
  {
    route: '/default',
    method: 'GET',
    code: 200,
    timeout: 1000,
    response: () => {
      return {
        "data": {
          "title": "My Awesome Home Page, Dude!"
        }
      }
    }
  }
];
