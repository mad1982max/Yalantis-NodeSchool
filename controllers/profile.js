const uuid = require('uuid');
const profilesDB = require('../db');
const fs = require('fs');
const MyErrors = require('../helpers/handleError')

const controller = {
  register: (req, res, next) => {

    const { email, name, surname } = req.body;

    const userInDB = profilesDB.find(user => user.email === email);

    if (userInDB) {
      next(new MyErrors(400, 'Bad request', 'profile with such email is exists'));
      return;
    }

    const profile = {
      id: uuid.v1(),
      ...req.body, photo: req.file.filename
    }
    profilesDB.push(profile)

    const answer = {
      status: 200,
      message: `profile with id: ${profile.id} is saved`
    }
    res.send(answer)
  },

  getProfileById: (req, res, next) => {
    const { id } = req.body;

    const profile = profilesDB.find(user => user.id === id);

    if (!profile) {
      next(new MyErrors(400, 'Bad request', 'profile with such id doesn\'t exist'))
      return
    }

    const answer = {
      status: 200,
      profile
    }
    res.send(answer)
  },

  getPhotoById: (req, res, next) => {
    const { id } = req.body;

    const profile = profilesDB.find(user => user.id === id);

    if (!profile) {
      next(new MyErrors(400, 'Bad request', 'profile with such id doesn\'t exist'))
      return
    }

    readFile('/etc/passwd', (err, data) => {
      if (err) throw err;
      console.log(data);

      const answer = {
        status: 200,
        profile
      }
      res.send(answer)
    });

  },

  getAll: (req, res, next) => {
    const answer = {
      status: 200,
      profiles: profilesDB
    }
    res.send(answer)
  }
}

module.exports = controller;
