const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
  const opts = {
    jwtFromRequest:
      ExtractJwt.fromAuthHeaderWithScheme(
        "JWT"
      ) /* Extrae de los headers lo referente a jwt */,
    secretOrKey: "academlo", // Must be on an environment Var
  };
  passport.use(
    new JwtStrategy(opts, (decoded, done) => {
      console.log("decoded jwt", decoded);
      return done(null, decoded); // decoded sera el que retornaremos cuando se ejecute exitosamente la autenticacion
    })
  );
};
