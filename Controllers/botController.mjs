import User from "../models/userModel.mjs";
import Referral from "../models/ReferralModal.mjs";
import { Bot, InlineKeyboard } from "grammy";

const startTGBot = () => {
  const paidUsers = new Map();
  const bot = new Bot(process.env.TELEGRAM_BOT_API_KEY);

  async function getPhotoUrl(file_id) {
    try {
      const file = await bot.api.getFile(file_id);
      return `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_API_KEY}/${file.file_path}`;
    } catch (error) {
      console.error("Failed to get file:", error);
      return "";
    }
  }

  bot.on("message:text", async (ctx) => {
    const messageText = ctx.message.text;
    // Regular expression to match /start command with an optional parameter
    const startCommandRegex = /^\/start(?:\s+(.+))?$/;
    const match = messageText.match(startCommandRegex);

    if (match) {
      const referrer_userId = match[1];

      if (referrer_userId) {
        const username = ctx.from.username;
        const userId = ctx.from.id;
        const first_name = ctx.from.first_name;
        const last_name = ctx.from.last_name;
        const is_premium = ctx.from.is_premium;
        let photoUrl = "";
        const photos = await bot.api.getUserProfilePhotos(ctx.from.id);

        if (photos.total_count > 0) {
          let file_id = photos.photos[0][0].file_id;
          photoUrl = await getPhotoUrl(file_id);
        }

        try {
          const user = await User.findOne({ userId: userId });
          if (userId == referrer_userId) {
            const welcomeMessage = username
              ? `Hi @${username}! excuse me, you can not invite yourself.`
              : `Hi! excuse me, you can not invite yourself.`;

            ctx.reply(welcomeMessage);

            return;
          }

          if (!user) {
            const newUser = new User({
              userId: userId,
              username: username,
              first_name: first_name,
              last_name: last_name,
              profile_picture: photoUrl,
              is_premium: is_premium ? is_premium : false,
            });

            await newUser.save();
          } else {
            console.log("This user already exists.");
          }

          const referral = await Referral.findOne({ referred_userId: userId });

          if (!referral) {
            const user = await User.findOne({ userId: referrer_userId });

            if (!user) {
              throw new Error(`User with userId ${referrer_userId} not found`);
            }

            const newReferral = new Referral({
              referrer_userId: referrer_userId,
              referred_userId: userId,
              is_premium: user.is_premium,
            });

            await newReferral.save();

            await User.findOneAndUpdate(
              { userId: referrer_userId },
              { $inc: { invite_count: 1 } },
              { new: true }
            );
          } else {
            console.log("This user is already invited: ", userId);
          }

          const welcomeMessage = username
            ? `Hi @${username}! Welcome our XS VPN! 🎉`
            : `Hi! Welcome our XS VPN! 🎉`;

          ctx.reply(welcomeMessage, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Open App",
                    web_app: { url: "https://xs-vpn.vercel.app/" },
                  },
                ],
              ],
            },
          });
        } catch (error) {
          console.error("Database error:", error);
          ctx.reply("An error occurred while processing your request.");
        }
      } else {
        const username = ctx.from.username;
        const userId = ctx.from.id;
        const first_name = ctx.from.first_name;
        const last_name = ctx.from.last_name;
        const is_premium = ctx.from.is_premium;
        let photoUrl = "";
        const photos = await bot.api.getUserProfilePhotos(ctx.from.id);

        if (photos.total_count > 0) {
          let file_id = photos.photos[0][0].file_id;
          photoUrl = await getPhotoUrl(file_id);
        }
        const invoiceLink = await bot.api.createInvoiceLink(
          "Monthly Subscription",
          "XS VPN monthly subscription",
          "{}",
          "",
          "XTR",
          [{ amount: 500, label: "Monthly Subscription" }]
        );
        const invoiceLink_ = await bot.api.createInvoiceLink(
          "6 Months Subscription",
          "XS VPN 6 month subscription",
          "{}",
          "",
          "XTR",
          [{ amount: 1100, label: "6 Months Subscription" }]
        );
        const invoiceLink__ = await bot.api.createInvoiceLink(
          "Anual Subsciption",
          "XS VPN anual subscription",
          "{}",
          "",
          "XTR",
          [{ amount: 1800, label: "Anual Subscription" }]
        );
        // console.log(invoiceLink, invoiceLink_, invoiceLink__);

        try {
          const user = await User.findOne({ userId: userId });

          if (!user) {
            const newUser = new User({
              userId: userId,
              username: username,
              first_name: first_name,
              last_name: last_name,
              profile_picture: photoUrl,
              is_premium: is_premium ? is_premium : false,
            });

            await newUser.save();
          } else {
            console.log("This user already exists.");
          }
          const welcomeMessage = username
            ? `Hi @${username}! Welcome our XS VPN! 🎉`
            : `Hi! Welcome our XS VPN! 🎉`;

          ctx.reply(welcomeMessage, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "Open App",
                    web_app: { url: "https://xs-vpn.vercel.app/" },
                  },
                ],
              ],
            },
          });
        } catch (error) {
          console.error("Database error:", error);
          ctx.reply("An error occurred while processing your request.");
        }
      }
    }

    if (messageText === "/adminXS33") {
      const welcomeMessage = `Hi Admin! Welcome your admin panel!`;

      ctx.reply(welcomeMessage, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Admin panel",
                web_app: { url: "https://xs-vpn.vercel.app/" },
              },
            ],
          ],
        },
      });
    }
  });

  bot.on("pre_checkout_query", (ctx) => {
    return ctx.answerPreCheckoutQuery(true).catch(() => {
      console.error("answerPreCheckoutQuery failed");
    });
  });

  bot.on("message:successful_payment", (ctx) => {
    if (!ctx.message || !ctx.message.successful_payment || !ctx.from) {
      return;
    }

    paidUsers.set(
      ctx.from.id,
      ctx.message.successful_payment.telegram_payment_charge_id
    );
  });

  bot.start();

  console.log("Bot server started in the polling mode...");
};

export default startTGBot;
