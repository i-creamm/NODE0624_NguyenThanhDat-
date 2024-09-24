const MainService = require("../../services/subscribe_service");

class SubscribeClass {

  //direct form put in
  sendEmail = async (req, res, next) => {
    await MainService.saveEmailAndSendIt(req.body)
    res.redirect('/')
  };


}

module.exports = new SubscribeClass();