import express from 'express';
// import { authorization } from '../middlewares/authorization.middleware.js';
import menuController from '../controllers/menu.controller.js';

const router = express.Router();

router.post(
  '/owners/me/menus',
  //authorization,
  menuController.createMenu,
);

router.get('/restaurnts/:restaurantId/menus', menuController.getMenus);

router.patch(
  '/owners/me/menus/:menuId',
  //authorization,
  menuController.updateMenu,
);

router.delete(
  '/owners/me/menus/:menuId',
  //authorization,
  menuController.deleteMenu,
);

export default router;
