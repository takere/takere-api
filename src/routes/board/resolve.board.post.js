const job = require('../../jobs/handleJobs')

const express = require('express');
const router = express.Router();
const Board = require('../../models/Board');
const executedService = require('../../services/executed.service');

router.post('/', async function(req, res, next) {
    const {boardId, result} = req.body

    let board = await Board.findById(boardId);
    board.completed = true;

    if(!board.executed) {
       const executed = await executedService.insert(
            result,
            board._id
       );
        board.executed = executed._id;
    }
    board.save()

    res.send(board);
});

module.exports = router;

