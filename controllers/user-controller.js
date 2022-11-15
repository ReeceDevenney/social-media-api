const { User } = require('../models')

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    getSingleUser({ params }, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'no user found'})
                return
            }
            res.json(dbUserData)
        })            
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },

    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },

    updateUser({body, params}, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            {$set: body},
            {new: true}
            )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },

    deleteUser(req, res) {
        User.findOneAndDelete(
            {_id: req.params.id},
            {new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    }
}

module.exports = userController