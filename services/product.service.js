const { faker } = require('@faker-js/faker')

class ProductServices {

  constructor() {
    this.products = []
    this.generate()
  }

  async generate() {
    const limit = 100
    for (let i = 0; i <= limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.url(),
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  async find() {
    return this.products
  }

  async findOne(id) {
    return this.products.find(item => item.id === id)
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1){
      throw new Error('Product not found')
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]
  }

  delete(id) {
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Product not found')
    }
    this.products.splice(index, 1)
    return { id }
  }
}

module.exports = ProductServices
