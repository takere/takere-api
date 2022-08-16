const job = require('../../jobs/handleJobs')

const express = require('express');
const router = express.Router();
// const Board = require('../../repositories').boardCollection;
const Board = require('../../models/Board');

router.get('/', async function(req, res, next) {
    const searchEmail = await req?.query?.email;
    const boards = await Board.findByUserEmail(searchEmail);
    const data = [];

    for(const b of boards) {
       const result = handleDataNodes(b)
        data.push(result)
    }


    res.send(data);
});

module.exports = router;

const handleDataNodes = (board) => {
    return {
        type: board.node.data.type,
        completed: board.completed,
        id: board.id,
        name: board.name,
        description: board.description,
        icon: board.icon,
        executed: {
            id: board?.executed?.id,
            executedAt: board?.executed?.createdAt,
            result: board?.executed?.result
        },
        node: {
            id: board.node.id,
            results: _objectWithoutProperties(board?.node?.data?.results, ["boardName", "boardDescription"]),
        }
    }
}

function _objectWithoutProperties(obj, keys) {
    let target = {};
    for (const i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
    }
    return target;
}
