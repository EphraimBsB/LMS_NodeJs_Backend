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

  checkUser = async (roll_number, email, phone_number) => {
    const userFind = await model.User.findOne({
      where: { roll_number, email, phone_number },
    });
    return userFind;
  };

  findAllUser = async () => {
    const userFind = await model.User.findAll();
    return userFind;
  };

  delete = async (obj) => {
    const destroy = await model.User.destroy(obj);
    return destroy;
  };
}
export default UserService;
