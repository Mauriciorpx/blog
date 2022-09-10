const router = require("express").Router();
const passport = require("passport");
require("../middleware/auth.middleware")(passport);

const userServices = require("./users.http");
const postServices = require("../posts/posts.http");

router
  .route("/") //* /api/v1/users/
  .get(userServices.getAll)
  .post(userServices.register);

router
  .route("/me")
  .put(
    passport.authenticate("jwt", { session: false }),
    userServices.editMyUser
  );

router
  .route("/:id")
  .get(passport.authenticate("jwt", { session: false }), userServices.getById)
  .delete(userServices.remove)
  .put(userServices.edit);

router
  .route("/me/posts")
  .get(
    passport.authenticate("jwt", { session: false }),
    postServices.getMyPublications
  );

router
  .route("/me/posts/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    postServices.getMyPublishByID
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    postServices.removeMyPublish
  )
  .put(
    passport.authenticate("jwt", { session: false }),
    postServices.editMyPost
  );

exports.router = router;
