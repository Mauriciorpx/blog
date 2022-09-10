const router = require("express").Router();
const passport = require("passport");
require("../middleware/auth.middleware")(passport);

const postServices = require("./posts.http");

router
  .route("/")
  .get(postServices.getAllP)
  .post(passport.authenticate("jwt", { session: false }), postServices.publish);

router.route("/:id").get(postServices.getPByID);

router
  .route("/me/posts")
  .get(
    passport.authenticate("jwt", { session: false }),
    postServices.getMyPublications
  );

exports.router = router;
