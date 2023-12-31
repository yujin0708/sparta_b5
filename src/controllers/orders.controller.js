import { StatusCodes } from './../utils/constants/constants.js';

export class OrdersController {
  constructor(ordersService) {
    this.ordersService = ordersService;
  }

  handleCreateOrder = async (req, res, next) => {
    const { restaurantId } = req.params;
    const { id: userId } = req.user;
    try {
      const order = await this.ordersService.createOrder({
        userId,
        restaurantId,
      });

      return res.status(StatusCodes.CREATED).json({
        message: '주문이 정상처리 되었습니다.',
        data: order,
      });
    } catch (err) {
      next(err);
    }
  };

  handleGetOrder = async (req, res, next) => {
    const { orderId } = req.params;
    try {
      const order = await this.ordersService.getOrder(orderId);

      return res.status(StatusCodes.OK).json({
        message: '상세 주문 내역을 확인하였습니다.',
        data: order,
      });
    } catch (err) {
      next(err);
    }
  };

  handleGetAllOrders = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const orders = await this.ordersService.getAllOrders(restaurantId);

      return res.status(StatusCodes.OK).json({
        message: '전체 주문 내역을 확인하였습니다.',
        data: orders,
      });
    } catch (err) {
      next(err);
    }
  };

  handleGetOrdersByUserId = async (req, res, next) => {
    const { id: userId } = req.user;
    try {
      const orders = await this.ordersService.getOrdersByUserId(userId);

      return res.status(StatusCodes.OK).json({
        message: '주문 내역을 확인하였습니다.',
        data: orders,
      });
    } catch (err) {
      next(err);
    }
  };

  handleUpdateOrder = async (req, res, next) => {
    const { orderId } = req.params;
    const { deliveryStatus } = req.body;
    try {
      const order = await this.ordersService.updateOrder({
        orderId,
        deliveryStatus,
      });

      return res.status(StatusCodes.OK).json({
        message: '배달 상태가 업데이트 되었습니다.',
        data: order,
      });
    } catch (err) {
      next(err);
    }
  };

  handleDeleteOrder = async (req, res, next) => {
    const { orderId } = req.params;
    try {
      await this.ordersService.deleteOrder(orderId);

      return res.status(StatusCodes.OK).json({
        message: '주문이 취소되었습니다.',
      });
    } catch (err) {
      next(err);
    }
  };
}
