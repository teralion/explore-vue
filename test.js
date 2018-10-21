function makeTest() {
  let app = new Vue({
    el: '#app',
    data: {
      message: 'Hello, Vue!',
    }
  })

  let app2 = new Vue({
    el: '#app2',
    data: {
      message: 'You loaded this page on ' + new Date().toLocaleString(),
    }
  })

  let app3 = new Vue({
    el: '#app3',
    data: {
      seen: true,
    }
  })

  let app4 = new Vue({
    el: '#app4',
    data: {
      todos: [
        { text: 'Learn JS' },
        { text: 'Learn Vue' },
        { text: 'Learn Node' },
      ]
    }
  })

  let app5 = new Vue({
    el: "#app5",
    data: { 
      message: "Hey, ho, let's go!"
    },
    methods: {
      reverseMessage: function() {
        this.message = this.message.split('').reverse().join('');
      }
    }
  })

  let app6 = new Vue({
    el: "#app6",
    data: {
      message: 'Hello from the outside',
    }
  })

  let div7 = new Vue({
    el: '#app7',
    data: {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' },
      ]
    }
  })
}

export default makeTest;