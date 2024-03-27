import {getAll , getNote , updateNote , deleteNote , addNote , latestUpdatedNotes , changeVisiblity , deleteMany , wrongUrl} from '../controllers/notesController.js';
import { Router } from 'express';
import validateToken from '../middleware/tokenhandler.js';

const router = Router();


router.use(validateToken);

router.get('/', getAll);

router.get('/get-note', getNote);

router.get('/latest-notes', latestUpdatedNotes);

router.put('/update-note/:id', updateNote);

router.post('/add-note', addNote);

router.post('/change-visiblity', changeVisiblity);

router.delete('/delete-note/:id', deleteNote);

router.delete('/delete-many', deleteMany);

router.use('*' , wrongUrl)

export default router;
