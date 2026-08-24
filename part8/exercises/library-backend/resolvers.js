import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

import Author from './models/Author.js';
import Book from './models/Book.js';
import User from './models/User.js';

export const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {};

      if (args.author) {
        const authorInDb = await Author.findOne({ name: args.author });
        if (!authorInDb) {
          return [];
        }

        filter.author = authorInDb._id;
      }

      if (args.genre) {
        filter.genres = args.genre;
      }

      return await Book.find(filter).populate('author');
    },
    allAuthors: async () => await Author.find({}),
    me: async (root, args, { currentUser }) => currentUser,
  },
  Author: {
    bookCount: async author => {
      const authorInDb = await Author.findOne({ name: author.name });
      if (!authorInDb) {
        return 0;
      }

      return await Book.countDocuments({ author: authorInDb._id });
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'UNAUTHETICATED' },
        });
      }

      let author;
      const authorAlreadyExists = await Author.findOne({ name: args.author });
      if (!authorAlreadyExists) {
        const newAuthor = new Author({ name: args.author });
        author = await newAuthor.save();
      } else {
        author = authorAlreadyExists;
      }

      const bookAlreadyExists = await Book.findOne({ title: args.title });
      if (bookAlreadyExists) {
        throw new GraphQLError(`Title book must be unique: ${args.title}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          },
        });
      }

      const addedBook = new Book({
        title: args.title,
        author: author._id,
        published: args.published,
        genres: args.genres,
      });

      try {
        await addedBook.save();
        return addedBook.populate('author');
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'UNAUTHETICATED' },
        });
      }

      const authorInDb = await Author.findOne({ name: args.name });
      if (!authorInDb) {
        return null;
      }

      authorInDb.born = args.setBornTo;
      await authorInDb.save();

      return authorInDb;
    },
    createUser: async (root, args) => {
      console.log('args', args);
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });

      return await user.save().catch(error => {
        throw new GraphQLError(`Creating user failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'password') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== 'test') {
        throw new GraphQLError('_resetDatabase is only available in test mode');
      }

      await Author.deleteMany({});
      await Book.deleteMany({});
      await User.deleteMany({});
      return true;
    },
  },
};
