const db = require('../db');

async function findUserById(id) {
    const user = await db.query(`SELECT * FROM users where id = $1`, [id]);

    const userById = user.rows[0];

    return userById;
}

class ActionsController {
    async updateBalance(req, res) {
        try {
            const userId = req.params.id;
            const { amount, actions } = req.body;

            const user = await findUserById(userId);

            if (!user) {
                res.status(400).send({
                    success: false,
                    message: 'User id not found',
                });
            }

            if (user.balance <= 0 || user.balance < amount) {
                res.status(400).send({
                    success: false,
                    message: 'There are not enough funds on your balance',
                });
            } else {
                await db.query(
                    `INSERT INTO history_of_actions (user_id, actions, amount, ts) values ((SELECT id FROM users where id = $1), $2, $3, $4)`,
                    [userId, actions, amount, new Date()]
                );

                await db.query(`UPDATE users set balance = balance - $2 where id = $1`, [
                    userId,
                    amount,
                ]);
               
                res.send({ success: true });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send({ success: false, message: 'Server error' });
        }
    }
}

module.exports = new ActionsController();
