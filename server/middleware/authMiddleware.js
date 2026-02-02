// import jwt from "jsonwebtoken";

// const protect = (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       jwt.verify(token, process.env.JWT_SECRET);
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized" });
//     }
//   } else {
//     res.status(401).json({ message: "No token" });
//   }
// };

// export default protect;

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔑 decoded = { id: "...", iat, exp }
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);
    return res.status(401).json({ message: "Token invalid" });
  }
};

export default authMiddleware;


