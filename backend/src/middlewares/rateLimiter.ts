// Rate limit
import { rateLimit } from 'express-rate-limit';

// Server response
import serverResponse from '../utils/helpers/reponses.js';

// Messages
import messages from '../configs/messagesConfig.js';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  handler: (req, res, next) => {
    next(serverResponse.createError(messages.TOO_MANY_REQUESTS));
  },
});

export default limiter;
