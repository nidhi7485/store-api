const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  const product = await Product.find({ name: 'wooden table' })
  res.status(200).json({ product, nbHits: product.length })
}

const getAllProducts = async (req, res) => {
  const search = 'a'

  const { featured, company, name } = req.query
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if (company) {
    queryObject.company = company
  }
  if (name) {
    queryObject.name = name
  }
  const product = await Product.find({
    name: {
      $regex: search,
      $options: 'i',
    },
  })
  res.status(200).json({ product, nbHits: product.length })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}
