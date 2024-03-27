import { registerUser, loginUser ,wrongUrl} from '../controllers/usersController.js';
import { Router } from 'express';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.use('*' , wrongUrl);

export default router;
