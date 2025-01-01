import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
import { randomUUID } from 'node:crypto';

// TODO: POST Request with city name to retrieve weather data
router.post('/',  async (req: Request, res: Response) => {
  const requestId = randomUUID();
  console.log(requestId, "POST /api/weather", req.ip);
  console.log(requestId, req.body);
  try {
    const { city } = req.body;
    console.log(requestId, city);

    return res.status(200).send("POST /api/weather");

  } catch (error) {
    console.log(requestId, "Caught error");
    console.error(error);
    if (error instanceof TypeError) {
      return res.status(400).send("Bad Request");
    }
  }
  // TODO: GET weather data from city name
  try {
    const cityName = req.body.cityName;
    const weatherData = await WeatherService.getWeatherForCity(cityName);    
    await HistoryService.saveCity(cityName);
    return res.status(200).json(weatherData);

  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
    
  }
  // TODO: save city to search history

});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  const requestId = randomUUID();
  console.log(requestId, "GET /api/weather/history", req.ip);
  try {
    res.status(200).send("GET /api/weather/history");
  } catch (error) {
    console.log(requestId, "Caught error");
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req: Request, _res: Response) => {});

export default router;
