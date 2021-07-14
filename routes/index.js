"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
router.get("/", (req, res, next) => {
    res.render("../views/Content/index.ejs", {
        title: "Home",
    });
});
router.get("/explorePage", (req, res, next) => {
    res.render("../views/Explore/explore.ejs", {
        title: "Home",
    });
});
router.get("/mySurveys", (req, res, next) => {
    res.render("../views/mySurveys/mySurveys.ejs", {
        title: "Home",
    });
});
//# sourceMappingURL=index.js.map