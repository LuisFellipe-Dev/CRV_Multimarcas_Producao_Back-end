import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import storageRoutes from './routes/storage.routes.js';
import customersRoutes from './routes/customers.routes.js';
import salesRoutes from './routes/sales.routes.js';
import cashFlowRoutes from './routes/cashFlow.routes.js';
import accountRoutes from './routes/account.routes.js';
import authUserRoutes from './routes/authUser.routes.js';
const app = express();
app.use(cors({
    origin: process.env.SITE_URL,
    credentials: true
}));
app.use(express.json());
app.use(storageRoutes);
app.use(customersRoutes);
app.use(salesRoutes);
app.use(cashFlowRoutes);
app.use(accountRoutes);
app.use(authUserRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT);
//# sourceMappingURL=server.js.map