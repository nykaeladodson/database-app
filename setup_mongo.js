const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: String
})

const Cat = mongoose.model('Cats', PetSchema);
const cat1 = new Cat({name: 'Moof'})
const cat2 = new Cat({name: 'Coco'})
const cat3 = new Cat({name: 'Chanel'})
cat1.save()
cat2.save()
cat3.save()
module.exports = Cat;