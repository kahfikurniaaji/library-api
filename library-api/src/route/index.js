import bookRouter from "./book-route.js";
import memberRouter from "./member-route.js";
import borrowRouter from "./borrow-route.js";

// Combine all routers
const router = [bookRouter, memberRouter, borrowRouter];

export default router;
