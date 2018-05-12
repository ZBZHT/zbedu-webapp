function start() {
  return new Promise((resolve, reject) => {
    resolve('start');
  });
}

start()
  .then(data => {
    // promise start
    console.log('1: ');
  })
  .then(data => {
    // promise p1
    console.log('2: ');
  })

  .then(data => {
    // promise p4
    console.log('3: ');
  });
