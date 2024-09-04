import Point from "../models/pointModal.mjs";
import User from "../models/userModel.mjs";

const clickNewPoint = async (req, res) => {
    const { user_id } = req.body;

    const plusPointText = ["Bamboo-tastic!", "Earn Panda Points"];
    const minusPointText = ["Bamboo-zled! Try again", "That bamboo shoot fell short..."];

    try {
        let randomPoint;

        // Generate randomPoint with 70% chance for positive and 30% chance for negative
        if (Math.random() < 0.7) {
            // 70% chance of positive randomPoint
            randomPoint = Math.floor(Math.random() * 20) + 1; // Positive point between 1 and 20
        } else {
            // 30% chance of negative randomPoint
            randomPoint = Math.floor(Math.random() * 20) - 20; // Negative point between -1 and -19
        }

        const getRandomText = (array) => array[Math.floor(Math.random() * array.length)];

        let chosenText;

        if (randomPoint > 0) {
            chosenText = getRandomText(plusPointText);
        } else {
            chosenText = getRandomText(minusPointText);
        }

        const newPoint = new Point({
            userId: user_id,
            text: chosenText,
            point: randomPoint,
        });

        await newPoint.save();

        const newUser = await User.findOneAndUpdate(
            { userId: user_id },
            {
                $inc: { score: randomPoint },
            },
            { new: true }
        );

        res.status(200).json({ newPoint, score: newUser.score });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

const fetchPointById = async (req, res) => {
    const userId = req.params.id;

    try {
        const points = await Point.find({ userId: userId });

        res.status(200).json(points);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export { clickNewPoint, fetchPointById };