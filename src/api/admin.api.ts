import express from "express";
import authadmin from "./admin/admin-auth.api";
import authclient from "./client/client-auth.api";
// import authtalent from "./customer/talent-auth.api";

import blog from "./admin/blog.api";
import contact from "./admin/contact.api";
import contactinfo from "./admin/contactinfo.api";
import service from "./admin/service.api"
import portfolio from "./admin/portfolio.api"
import hero from "./admin/hero.api"
import about from "./admin/about.api"
import event from "./admin/event.api"
import testimonial from "./admin/testimonial.api"


import team from "./admin/team.api"
import faq from "./admin/faq.api"
import partner from "./admin/partner.api"
import step from "./admin/step.api"
import book from "./admin/book.admin.api"
import skill from "./admin/skill.api"
import subscribe from "./admin/subscribe.api"

const router = express.Router();

router.use("/auth-admin", authadmin);
// router.use("/auth-client", authclient);
// router.use("/auth-talent", authtalent);
router.use("/blog", blog);
router.use("/service", service);
router.use("/portfolio", portfolio);
router.use("/hero", hero);
router.use("/book", book);
router.use("/skill", skill)
router.use("/about", about);
router.use("/team", team);
router.use("/faq", faq);
router.use("/step", step);
router.use("/partner", partner);
router.use("/event", event);
router.use("/testimonial", testimonial);
router.use("/contact", contact);
router.use("/subscribe", subscribe);

router.use("/contact-info", contactinfo);

export default router;
