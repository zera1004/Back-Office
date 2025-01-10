import express from 'express';
import { requireAccessToken } from '../middlewares/authorization.middleware.js';
import menuController from '../controllers/menu.controller.js';

const router = express.Router();

router.post('/owners/me/menus', requireAccessToken, menuController.createMenu);

router.get('/restaurnts/:restaurantId/menus', menuController.getMenus);

router.patch(
  '/owners/me/menus/:menuId',
  requireAccessToken,
  menuController.updateMenu,
);

router.delete(
  '/owners/me/menus/:menuId',
  requireAccessToken,
  menuController.deleteMenu,
);

export default router;
