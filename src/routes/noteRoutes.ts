import { Router } from 'express';
import { createNote, DeleteNote, ListNotes, SearchMyNote, SearchMyNoteAndProduct } from '../controllers/noteController';

const router = Router();

router.post('/', createNote);
router.get('/list', ListNotes);
router.get('/client_notes', SearchMyNote);
router.get('/user_note_product', SearchMyNoteAndProduct);
router.delete('/', DeleteNote);


export const noteRoutes = router;