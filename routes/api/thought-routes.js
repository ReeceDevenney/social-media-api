const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReply
  } = require('../../controllers/thought-controller');
  
router.route('/')
.get(getAllThoughts)


router.route('/:id')
.get(getSingleThought)
.post(createThought)
.put(updateThought)
.delete(deleteThought)

router.route('/:thoughtId/reactions')
.post(addReaction)


router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReply)



module.exports = router;