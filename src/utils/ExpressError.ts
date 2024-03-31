/**
 * ExpressError
 * We can throw ExpressError to catch errors that won't be
 * automatically detected by node. They will pass to next
 * and reach app.use at the bottom (of index.ts).
 */

class ExpressError extends Error {
  statusCode: string;

  constructor(message: string, statusCode: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ExpressError;
