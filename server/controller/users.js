const userService = require("../service/user");
const authService = require("../service/auth");
const error = require("../utils/error");

const getUsers = async (req, res, next) => {
  /**
   * TODO: sort, filter, pagination, select
   */
  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;
  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
const putUserById = (req, res, next) => {};
const patchUserById = (req, res, next) => {};
const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }
    // TODO: call delete user service
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  patchUserById,
  deleteUserById,
};
