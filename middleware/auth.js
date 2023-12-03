const auth = function (req, res, next) {
  // JWT 驗證
  let authorization = req.headers.authorization;
  let idToken = authorization ? authorization.split(" ")[1] : null;
  if (idToken) {
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        // console.log(decodedToken)
        req.uid = decodedToken.uid;
        next();
      })
      .catch((err) => {
        res.status(403).json({ error: err });
      });
  } else {
    res.status(403).json({ error: "無效的 token" });
  }
}

module.exports = auth;