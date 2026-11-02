// const { PrismaClient } = require('@prisma/client');
const { createUserSchema, updateUserSchema, idSchema } = require('../validations/user.validation');
const prisma = require('../prisma.js');

// const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const validatedData = createUserSchema.parse(req.body);

    const newUser = await prisma.user.create({
      data: validatedData,
    });

    res.status(201).json(newUser);
  }
  catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }
    
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'User with this data already exists.' });
    }

    console.error('[Create User Error]:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUsers = async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  }
  catch (error) {
    console.error('[Get All Users Error]:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = idSchema.parse(req.params);
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: 'User NOT Found'});
    }
    res.status(200).json(user);
  }
  catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors});
    }
    console.error('[Get a User Error]:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = idSchema.parse(req.params);
    const updateData = updateUserSchema.parse(req.body);

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json(user);
  }
  catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }

    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Data conflicts with an existing user.' });
    }

    console.error('[Update User Eroror]:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = idSchema.parse(req.params);

    await prisma.user.delete({
      where: { id },
    });

    res.status(204).send();
  }
  catch (error){
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: error.errors });
    }

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }

    console.error('[Delete User Error]:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
