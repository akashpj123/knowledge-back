import express from 'express';
import { sign, admin, login, logout,loginAdmin,logoutadmin ,getuser,getalluser,delectuser} from '../controller/user-use.js';
import { auth, checkRole } from '../Middleware/auth.js';
import { createPost, viewPost, updatePostById, deletePostById, createComment,userviewPost,getPostById,searchPost,getCommentById  } from '../controller/create-use.js';
import { createProfile, getProfileById, updateProfileById, deleteProfileById } from '../controller/profile-user.js';
const router = express.Router();

// User Routes
router.post('/signup', sign);
router.post('/loginadmin' ,loginAdmin);
router.post('/login', login);
router.post('/logout',  logout); // Assuming you need to be authenticated to log out
router.post('/admin/signup', admin);
router.post('/admin/logout',checkRole('admin'), logoutadmin );
router.get('/getuser', auth,getuser);
router.get('/getalluser',getalluser);
router.delete('/delectuser/:id',delectuser);

// Post Routes
router.post('/createPost', auth, createPost);
router.get('/userviewPost/:userId',auth, userviewPost);
router.get('/viewPost', viewPost);
router.put('/updatePostById/:id', auth, updatePostById); // Assuming you pass the post ID as a URL parameter
router.delete('/deletePostById/:id', auth, deletePostById); // Assuming you pass the post ID as a URL parameter
router.put('/createComment/:id', auth, createComment);
router.get('/getCommentById/:id', getCommentById);
router.get('/searchPost', searchPost);
router.get('/getPostById', getPostById);

// Profile Routes
router.post('/createProfile', auth,  createProfile);
router.get('/getProfileById/:userId', auth, getProfileById); // Assuming you pass the profile ID as a URL parameter
router.put('/updateProfileById/:id', auth, updateProfileById); // Assuming you pass the profile ID as a URL parameter
router.delete('/deleteProfileById/:id', auth, deleteProfileById); // Assuming you pass the profile ID as a URL parameter
export { router as usermake };
