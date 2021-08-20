const uuid = require('uuid');
const fs = require('fs');
const profiles = require('../db');
const MyErrors = require('../helpers/handleError');
const constants = require('../constants');

const controller = {
  register: (req, res, next) => {

    const { email } = req.body;
    const userInDB = profiles.find(user => user.email === email);

    if (userInDB) {
      const pathToFile = './' + constants.photoFolder + "/" + req.fileName
      fs.unlink(pathToFile, (err, stats) => {
        if (err) throw new Error('error while deleting file');
        console.log('file was deleted');
      })
      next(new MyErrors(400, 'Bad request', 'profile with such email is exists'));
      return;
    }

    const profile = {
      id: uuid.v1(),
      ...req.body,
      photoUrl: req.fileName
    }
    profiles.push(profile)

    const answer = {
      status: 200,
      message: `profile with id: ${profile.id} is saved`
    }
    res.send(answer)
  },

  getProfileById: (req, res, next) => {
    const { id } = req.body;
    const profile = profiles.find(user => user.id === id);

    if (!profile) {
      next(new MyErrors(400, 'Bad request', 'profile with such id doesn\'t exist'))
      return
    }

    const answer = {
      status: 200,
      profile,
    }
    res.send(answer)
  },

  getPhotoById: (req, res, next) => {
    const { id } = req.body;
    const profile = profiles.find(user => user.id === id);

    if (!profile) {
      next(new MyErrors(400, 'Bad request', 'profile with such id doesn\'t exist'))
      return
    }

    res.sendFile(profile.photoUrl, { root: './' + constants.photoFolder }, (err) => {
      if (err) {
        next(new MyErrors(500, 'Server Error', 'Error while reading file'))
      } else {
        console.log('Sent:', profile.photoUrl)
      }
    })
  },

  getAll: (req, res, next) => {
    const answer = {
      status: 200,
      profiles
    }
    res.send(answer)
  }
}
module.exports = controller;
