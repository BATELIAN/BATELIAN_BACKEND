import { createBasic } from "./create/create.basic.controller";
import { createCertfication } from "./create/create.certfication.controller";
import { createEducation } from "./create/create.education.controller";
import { createExpierence } from "./create/create.expierence.controller";
import { createPortfolio } from "./create/create.portfolio.controller";
import { createSkills } from "./create/create.skill.controller";
import { addinterest } from "./create/add.interest.controller";
import { getProfiles, showProfile, myProfile, showInerest } from "./get.profile.controller";

import { updateEducation } from "./update/update.education.controller"
import { updatecertfication } from "./update/update.certification.controller"
import { updateportfolio } from "./update/update.portfolio.controller"
import { updateExpierence } from "./update/update.expierence.controller"
import { updateInterest } from "./update/update.interest.controller";
import { verified, Unverified } from "./update/update.status.controller";


import { addImage } from "./addImage/addimage.education.controller"
import { addPortImage } from "./addImage/addImage.portfolio.controller"
import { addCertImage } from "./addImage/addImage.certification.controller"
import { addprofileImage } from "./addImage/addImage.basic.controller"


import { deleteImage } from "./deleteImage/delete.cert.controller"
import { deleteeduImage } from "./deleteImage/delete.edu.controller"
import { deleteportImage } from "./deleteImage/delete.port.controller"


import { deleteEdu } from "./delete/delete.education.controller"
import { deleteCert } from "./delete/delete.certfication.controller"
import { deletePort } from "./delete/delete.portfolio.controller"
import { deleteExpierence } from "./delete/delete.expierence.controller"
import { deleteSkill } from "./delete/delete.skill.controller"

import { deleteInterest } from "./delete/delete.interest.controller";

export {
    createBasic,
    createCertfication,
    createEducation,
    createExpierence,
    createPortfolio,
    createSkills,
    getProfiles, showProfile, myProfile, showInerest,
    updateEducation,
    updatecertfication,
    updateportfolio,
    addImage,
    addCertImage,
    addPortImage,
    deleteImage,
    deleteeduImage,
    deleteportImage,
    deleteEdu,
    deleteCert,
    deletePort,
    addprofileImage,
    deleteExpierence, updateExpierence,
    addinterest,
    deleteInterest,
    updateInterest, 
    deleteSkill,
    verified
};
