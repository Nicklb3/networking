const { User, Thought } = require('../models');

module.exports = {
    // get thoughts
    getThoughts(req, res) {
        Thought.find({})
            .then((users) =>  res.json(users))
            .catch((err) => res.status(500).json(err))    
    },

//    get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId }) 
            .select('-__v')
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: "No thought with this ID!" })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },

//   create a thought
    createThought(req, res) {
        Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            )
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: "No user with this ID!" })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
        })
    },

    // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
                !thought
                    ? res.status(404).json({ message: "No thought with this ID!" })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },

    // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => 
                !thought
                    ? res.status(404).json({ message: "No thought with this ID!" })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId }},
                        { new: true }
                    )
            )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: "Thought deleted, no user found" })
                    : res.json({ message: "Thought deleted" })
            )   
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },

    // add a reaction to a thought
    addReaction (req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: "No thought with this ID!" })
                : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    },

//    delete a reaction from a thought
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {  _id: req.params.reactionId } } },
            { new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: "No thought with this ID!" })
                : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err)
            });
    }
}