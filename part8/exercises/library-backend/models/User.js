import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
