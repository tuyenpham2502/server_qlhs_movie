import { omit, get } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import config from 'config';
import userModel, { User } from '../models/user.model';
import { excludedFields } from '../controllers/auth.controller';
import { signJwt } from '../utils/jwt';
import redisClient from '../utils/connectRedis';
import { DocumentType } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

// CreateUser service
export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

// Find User by Id
export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};

// Find All users
export const findAllUsers = async (query: FilterQuery<User>, options: QueryOptions={}) => {
  return await userModel.find(query, {}, options).lean();
};


// Find one user by any fields
export const findUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {}
) => {
  return await userModel.findOne(query, {}, options).select('+password');
};

export const updateMe = async (id: string, input: Partial<User>) => {
  return userModel.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });
}


//Hash the unique string
export const hashUniqueString = async (uniqueString: string, saltRounds:number) => {
  return await bcrypt.hash(uniqueString, saltRounds);
}

// Sign Token
export const signToken = async (user: DocumentType<User>) => {
  // Sign the access token
  const token = signJwt(
    { sub: user._id },
    "accessTokenPrivateKey",
    {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    }
  );

    // Sign the refresh token
    const refreshToken = signJwt(
        { sub: user._id },
        "refreshTokenPrivateKey",
        {
            expiresIn: `${config.get<number>('refreshTokenExpiresIn')}d`,
        }
    );


  // Create a Session
  redisClient.set(user._id.toString(), JSON.stringify(user));

    // Set the refresh token in the cookie
    

  // Return access token
  return { token, refreshToken };
};

