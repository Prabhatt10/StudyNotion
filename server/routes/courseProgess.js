const express = require("express");
const router = express.Router();

import { auth, isStudent, isAdmin, isInstructor } from '../middleware/auth';
import {getFullCourseDetails} from '../controller/courseProgess';

router.get("/getFullCourseDetails",auth,getFullCourseDetails);


module.exports = router;