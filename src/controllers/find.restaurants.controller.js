import { StatusCodes } from '../utils/constants/constants.js';

export class FindRestaurantsController {
  constructor(findRestaurantsService) {
    this.findRestaurantsService = findRestaurantsService;
  }

  // 음식점 검색 기능
  getAllRestaurants = async (req, res, next) => {
    try {
      const { category } = req.query;
      const encodeCategory = encodeURI(category);
      const restaurants = await this.findRestaurantsService.findAllRestaurants(
        encodeCategory,
      );
      return res.status(StatusCodes.OK).send({ data: restaurants });
    } catch (err) {
      next(err);
    }
  };
}
