import Verifier from "email-verifier";

export const verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    let verifier = new Verifier(process.env.EMAIL_VERIFIER_KEY, {
      checkCatchAll: false,
      checkDisposable: false,
      checkFree: false,
      validateDNS: true,
      validateSMTP: true,
    });
    verifier.verify(email, (err, data) => {
      // console.log(data);
      if (err) {
        return res
          .status(404)
          .json({ success: false, message: "Can't verify" });
      }
      if (
        data.formatCheck !== "true" &&
        data.smtpCheck !== "true" &&
        data.dnsCheck !== "true"
      ) {
        return res
        .status(404)
        .json({ success: false, message: "Invalid Email" });
        
      } 
    });
    next();
  } catch (e) {
    return res.status(404).json({ success: false, message: `Cant verify${e}` });
  }
};
