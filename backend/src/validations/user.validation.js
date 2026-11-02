const { z } = require('zod');

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(2).optional(),
});

const idSchema = z.object({
  id: z.string().uuid(),
});

module.exports = { createUserSchema, updateUserSchema, idSchema };