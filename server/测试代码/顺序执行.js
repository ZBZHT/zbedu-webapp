function start() {
  return new Promise((resolve, reject) => {
    resolve('1');
  });
}

start()
  .then(data => {
    console.log(data);
    data = '2';
    return data
  })
  .then(data => {
    console.log(data);
    data = '3';
    return data
  })

  .then(data => {
    console.log(data);
  });
