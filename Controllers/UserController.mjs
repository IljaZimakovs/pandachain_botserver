import User from "../models/userModel.mjs";

const fetchUserInfo = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({
      userId: userId,
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const updateConnectWallet = async (req, res) => {
  const {
    user_id,
    wallet_address
  } = req.body;

  try {
    await User.findOneAndUpdate(
      { userId: user_id },
      { $set: { wallet_address: wallet_address } },
      { new: true }
    );

    res.status(200).json({ success: "Wallet connected successfully." });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

const followTwitter = async (req, res) => {
  const {
    user_id
  } = req.body;

  try {
    await User.findOneAndUpdate(
      { userId: user_id },
      {
        $set: {
          twitter_follow: true
        }
      },
      { new: true }
    );

    res.status(200).json({ success: "Followed Twitter successfully." });
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

export {
  fetchUserInfo,
  updateConnectWallet,
  followTwitter
};
