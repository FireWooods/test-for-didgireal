const db = require('../db');

class ActionsController {
    async updateBalance(req, res) {
        try {
            const userId = req.params.id;
            const { amount } = req.body;

            const user = await db.query(`SELECT * FROM users where id = $1`, [
                userId,
            ]);

            const userById = user.rows[0];

            if (!userById) {
                res.status(400).send({
                    success: false,
                    message: 'User id not found',
                });
            }

            if (userById.balance <= 0 || userById.balance < amount) {
                res.status(400).send({
                    success: false,
                    message: 'There are not enough funds on your balance',
                });
            } else {
                const result = await db.query(
                    `WITH inserted_actions AS (INSERT INTO history_of_actions (user_id, actions, amount) values ((SELECT id FROM users where id = $1),$2,$3) RETURNING actions),
                    update_balance AS (UPDATE users set balance = balance - $3 where id = $1 RETURNING id)
                    SELECT (SELECT * FROM update_balance) AS user,
                           (SELECT * FROM inserted_actions) AS actions`,
                    [userId, 'purchase', amount]
                );

                res.send({ success: true });
            }
        } catch (e) {
            console.log(e);
            res.status(500).send({ success: false, message: 'Server error' });
        }
    }
}

module.exports = new ActionsController();
