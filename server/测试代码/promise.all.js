let p1 = new Promise((resolve, reject) => {
  resolve('成功了')
});

let p2 = new Promise((resolve, reject) => {

  console.log('11');
  resolve('')
});


Promise.all([p1, p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)
});
