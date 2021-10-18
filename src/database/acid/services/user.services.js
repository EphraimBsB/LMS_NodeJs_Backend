import model from "./../../models";

class UserService {
  createUser = async (user) => {
    const create = await model.User.create(user);
    return create;
  };

  findUser = async (roll_number) => {
    const userFind = await model.User.findOne({ where: { roll_number } });
    return userFind;
  };

  findAllUser = async () => {
    const userFind = await model.User.findAll();
    return userFind;
  };
}
export default UserService;
