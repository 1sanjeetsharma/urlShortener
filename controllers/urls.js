const { default: mongoose } = require("mongoose");
const urlModel = require("../models/urls");
const { nanoid } = require("nanoid");

async function HandleUrlGet(req, res) {
  // const redirect = await urlModel.findOne({ short_id: req.params.id });
  const short_id = req.params.id;
  console.log("short id is: ", short_id);
  const redirect = await urlModel.findOneAndUpdate(
    { short_id },
    {
      $push: {
        visit_history: {
          timestamp: Date.now(),
          ip: req.ip,
          useAgent: req.headers["user-agent"],
        },
      },
    }
  );
  console.log(
    "got request a get request on home url with id : ",
    req.params.id,
    "data found: ",
    redirect,
    "date added: ",
    Date.now()
  );
  res.redirect(redirect.redirect_url);
  // res.json({ redirect_url: redirect.redirect_url });
  // res.send("done");
}
async function handleGenerateNewShortURL(req, res) {
  const short_id = await nanoid(8);
  console.log("got json: ", req.body, short_id);
  await urlModel.create({ ...req.body, short_id: short_id, visit_history: [] , createdBy: req.user._id});

  // return res.json({ id: short_id, ...req.body });
  return res.redirect("/");
  // return res.json({msg:"done"});
}
async function handleGetAnalytics(req, res) {
  const short_id = req.params.id;
  const Result = await urlModel.findOne({ short_id });
  return res.json({
    total_clicks: Result.visit_history.length,
    analytics: Result.visit_history,
  });
}
module.exports = {
  handleGenerateNewShortURL,
  HandleUrlGet,
  handleGetAnalytics,
};
