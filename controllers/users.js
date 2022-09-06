const User = require('../models/user');

const getCurrentUser = async (req, res, next) => {
  req.user = { _id: '6315f9eb574ba0a73bd77e09' };
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(500).send({ message: 'Произошла ошибка' });
    }
    return res.send({ email: user.email, name: user.name });
  }
  catch (err) {
    if (err) {
      return res.status(500).send({ message: 'Произошла ошибка' });
    }
  }
};

const patchCurrentUser = async (req, res, next) => {
  req.user = { _id: '6315f9eb574ba0a73bd77e09' };
  const { email, name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      {
        new: true, // обработчик then получит на вход обновлённую запись
        runValidators: true, // данные будут валидированы перед изменением
        upsert: false, // если пользователь не найден, он будет создан
      },
    );
    if (!user) {
      return res.status(500).send({ message: 'Произошла ошибка' });
    }
    return res.send({ email: user.email, name: user.name });
  }
  catch (err) {
    if (err) {
      return res.status(500).send({ message: 'Произошла ошибка' });
    }
  }
};

module.exports = {
  getCurrentUser,
  patchCurrentUser,
};