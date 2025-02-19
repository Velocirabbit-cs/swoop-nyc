const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: String,
  password: { type: String, required: true },
});

//before saving to the schema, hash the password with bCrypt
// userSchema.pre('save', function (next){
//     bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash)=>{
//         if (err) return next(err);
//         this.password = hash;
//         return next()
//     })
// })

module.exports = mongoose.model('User', userSchema);
