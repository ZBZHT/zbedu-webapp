
var vm = new Vue({
  data: {
    userProfile: [
      {
      name: 'Anika'
      }
    ]
  }
});

Vue.set(vm.userProfile, 'age', 27);
console.log(userProfile);
