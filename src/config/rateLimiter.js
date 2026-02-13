import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //ajaaken
  max: 1000, // üks ip adress võib 15 minuti jooksul pärida 1000*
});


export default limiter;
