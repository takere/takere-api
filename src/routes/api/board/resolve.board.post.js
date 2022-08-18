const job = require('../../../jobs/handleJobs')

const express = require('express');
const router = express.Router();
const executedService = require('../../../services/executed.service');
const boardService = require('../../../services/board.service');

router.post('/', async function(req, res, next) {
    const {boardId, result} = req.body

    let board = await boardService.findById(boardId);
    board.completed = true;

    if(!board.executed) {
       const executed = await executedService.insert(
            result,
            board.id
       );
        board.executed = executed.id;
    }

    boardService.update(board);

    res.send(board);
});

module.exports = router;

