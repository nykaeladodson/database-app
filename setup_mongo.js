import mongoose from 'mongoose'

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String, 
      required: true,
    }
  }
)

const Cat = mongoose.model("Cats", petSchema)
const cat1 = new Cat({ name: 'Moof'})
const cat2 = new Cat({ name: 'Coco'})
const cat3 = new Cat({ name: 'Chanel'})

const createCats = async() => {
  await cat1.save()
  await cat2.save()
  await cat3.save()
}

createCats()

export default Cat