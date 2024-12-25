import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/',  async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    const cityName = req.body.cityName;
    const weatherData = await WeatherService.getWeatherForCity(cityName);    
    return res.status(200).json(weatherData);

  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
    
  }
  // TODO: save city to search history
  
});

// TODO: GET search history
router.get('/history', async (_req: Request, _res: Response) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req: Request, _res: Response) => {});

export default router;
