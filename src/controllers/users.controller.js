const { success, failed } = require('../helpers/response');
const userModel = require('../models/user.model');
const deleteFile = require('../utils/deleteFile');

module.exports = {
  allUsers: async (req, res) => {
    try {
      const { search, page, limit, sort, mode } = req.query;
      const searchQuery = search || '';
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 5;
      const offsetValue = (pageValue - 1) * limitValue;
      const sortQuery = sort ? sort : 'name';
      const modeQuery = mode ? mode : 'ASC';
      const allData = await userModel.allUser();
      const totalData = Number(allData.rows[0].total);
      const data = {
        searchQuery,
        offsetValue,
        limitValue,
        sortQuery,
        modeQuery,
      };
      const dataUser = await userModel.allUsersData(data);
      if (dataUser.rowCount === 0) {
        const err = {
          message: `data not found`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      if (search) {
        // return console.log(combData);
        const pagination = {
          currentPage: pageValue,
          dataPerPage:
            limitValue > dataUser.rowCount ? dataUser.rowCount : limitValue,
          totalPage: Math.ceil(dataUser.rowCount / limitValue),
        };
        success(res, {
          code: 200,
          status: 'success',
          message: `Success get data user`,
          data: dataUser.rows,
          pagination: pagination,
        });
      } else {
        const pagination = {
          currentPage: pageValue,
          dataPerPage:
            limitValue > dataUser.rowCount ? dataUser.rowCount : limitValue,
          totalPage: Math.ceil(totalData / limitValue),
        };

        success(res, {
          code: 200,
          status: 'success',
          message: `Success get data user`,
          data: dataUser.rows,
          pagination: pagination,
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'error',
        message: error.message,
        error: [],
      });
      return;
    }
  },
  detailUser: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await userModel.detailUsersData(id);
      if (data.rowCount === 0) {
        const err = {
          message: `users with id ${id} not found`,
        };
        failed(res, {
          code: 500,
          status: 'error',
          message: err.message,
          error: [],
        });
        return;
      }
      success(res, {
        code: 200,
        status: 'success',
        message: `Success get users with id ${id}`,
        data: data.rows[0],
        paggination: [],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'error',
        message: error.message,
        error: [],
      });
      return;
    }
  },
  updateUser: async (req, res) => {
    try {
      const id = req.APP_DATA.tokenDecoded.id;
      const { name, username, email, phone, bio } = req.body;

      // get detail user
      const detailUser = await userModel.detailUsersData(id);

      // check name
      const nameCheck = await userModel.nameCheck(name);
      if (name != detailUser.name) {
        if (nameCheck.rowCount > 0) {
          failed(res, {
            code: 400,
            status: 'Error',
            message: 'Name is already exist',
            error: null,
          });
          return;
        }
      }

      // check username
      const usernameCheck = await userModel.usernameCheck(username);
      if (username != detailUser.username) {
        if (usernameCheck.rowCount > 0) {
          failed(res, {
            code: 400,
            status: 'Error',
            message: 'username is already exist',
            error: null,
          });
          return;
        }
      }

      // check email
      const emailCheck = await userModel.emailCheck(email);
      if (email != detailUser.email) {
        if (emailCheck.rowCount > 0) {
          failed(res, {
            code: 400,
            status: 'Error',
            message: 'Email is already exist',
            error: null,
          });
          return;
        }
      }
      const data = { id, ...req.body };
      const result = await userModel.updateUserData(data);
      success(res, {
        code: 200,
        status: 'success',
        message: `update user success`,
        data: result,
        paggination: [],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: 'error',
        message: error.message,
        error: [],
      });
      return;
    }
  },
  updateUserPhoto: async (req, res) => {
    try {
      const id = req.APP_DATA.tokenDecoded.id;
      const checkPhoto = await userModel.checkPhoto(id);
      const usersPhoto = checkPhoto.rows[0].photo;
      const photo = req.file.filename;
      if (usersPhoto == 'default.png') {
        await userModel.updatePhoto(photo, id);
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Update photo success',
          data: photo,
        });
      } else {
        await userModel.updatePhoto(photo, id);
        success(res, {
          code: 200,
          status: 'Success',
          message: 'Update photo success',
          data: photo,
        });
        deleteFile(`./public/uploads/users/${usersPhoto}`);
      }
    } catch (error) {
      // console.log(error);
      failed(res, {
        code: 400,
        status: 'Failed',
        message: 'Update photo failed',
        error: error.message,
      });
    }
  },
};
