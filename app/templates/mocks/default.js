module.exports = [
  {
    route: '/default',
    method: 'GET',
    code: 200,
    timeout: 1000,
    response: () => {
      return {
        "data": {
          {
            "id": 1234,
            "value": "awesome"
          }
        }
      }
    }
  }
];
