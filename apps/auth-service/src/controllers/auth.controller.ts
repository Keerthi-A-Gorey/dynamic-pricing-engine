import { signup, login } from "../services/auth.service";

export const signupHandler = async (req: any, reply: any) => {
  const { email, password } = req.body;

  const result = await signup(email, password);

  return reply.send(result);
};

export const loginHandler = async (req: any, reply: any) => {
  const { email, password } = req.body;

  const result = await login(email, password);

  return reply.send(result);
};