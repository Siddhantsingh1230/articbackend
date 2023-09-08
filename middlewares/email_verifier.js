import Verifier from "email-verifier";

export const verifyEmail = async (req, res,next) => {
  const { email } = req.body;
  let verifier = new Verifier(process.env.EMAIL_VERIFIER_KEY, {
    checkCatchAll: false,
    checkDisposable: false,
    checkFree: false,
    validateDNS: true,
    validateSMTP: true,
  });
  verifier.verify(email, (err, data) => {
    if (err) {
      return res.status(404).json({ success: false, message: "Can't verify" });
    }
    if (data.smtp === "OK" && data.validFormat === "OK" && data.dns === "OK") {
        next();
    }else{
        return res.status(404).json({ success: false, message: "Invalid Email" });
    }
  });
};
