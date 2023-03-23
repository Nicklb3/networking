const router = require('express').Router();

const {
    getThoughts, 
    createThought,
    getSingleThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// get all thoughts or create a thought
router.route('/').get(getThoughts).post(createThought);

// get or update single thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// add reaction
router.route('/:thoughtId/reactions').put(addReaction);

// delete reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;