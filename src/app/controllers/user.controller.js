/* eslint-disable consistent-return */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */

// User Authentification Class
class UserController {
  constructor(service, hashPassword, comparePassword, token) {
    (this.service = service),
      (this.hashPassword = hashPassword),
      (this.comparePassword = comparePassword),
      (this.token = token);
  }

  // eslint-disable-next-line consistent-return
  signup = async (req, res) => {
    const { user } = req;
    const { roll_number } = user;

    await this.service
      .findUser(roll_number)
      .then((userFind) => {
        if (userFind) {
          return res.status(409).json({
            status: 409,
            message: "Roll Number already exist",
          });
        }
        this.hashPassword(user)
          .then((hashuser) => {
            this.service
              .createUser(hashuser)
              .then((data) => {
                this.token(res, data);
              })
              .catch((err) => {
                res.status(500).json({
                  status: 500,
                  message: "Faild to create User",
                  err,
                });
              });
          })
          .catch((err) => {
            res.status(500).json({
              status: 500,
              message: "Vaild to Hash Password",
              err,
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Something went wrong",
          error: error,
        });
      });
  };

  login = async (req, res) => {
    const { user } = req;
    const { roll_number } = user;

    await this.service
      .findUser(roll_number)
      .then((data) => {
        if (!data) {
          return res.status(401).json({
            status: 401,
            message: "Invalid credentials",
          });
        }
        return this.comparePassword(req, res, data);
      })
      .catch((err) => {
        res.status(500).json({
          status: 500,
          message: "Something went",
          error: err.name,
        });
      });
  };

  allUsers = (_, res) => {
    this.service
      .findAllUser()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Something wrong",
          error: error.name,
        });
      });
  };
}

export default UserController;
