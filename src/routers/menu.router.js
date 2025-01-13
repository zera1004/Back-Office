import express from 'express';
import { requireAccessToken } from '../middlewares/authorization.middleware.js';
import { menuValidator } from '../middlewares/validators/menu-validator.middleware.js';
import menuController from '../controllers/menu.controller.js';

const router = express.Router();

router.post(
  '/owners/me/menus',
  menuValidator,
  requireAccessToken,
  (req, res, next) => {
    menuController.createMenu(req, res, next);
  },
);

router.get('/restaurnts/:restaurantId/menus', (req, res, next) => {
  menuController.getMenus(req, res, next);
});

router.patch(
  '/owners/me/menus/:menuId',
  requireAccessToken,
  (req, res, next) => {
    menuController.updateMenu(req, res, next);
  },
);

router.delete(
  '/owners/me/menus/:menuId',
  requireAccessToken,
  (req, res, next) => {
    menuController.deleteMenu(req, res, next);
  },
);

export default router;
