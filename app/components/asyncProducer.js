let asyncProducer = (component) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(component)
    }, 2000)
  })
}

export default asyncProducer;