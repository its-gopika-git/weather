import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
} from "@mui/material";
function Home() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "http://api.weatherapi.com/v1/current.json?key=2baa9a067dc84a7abe5162513262804&q=Chennai"
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, []);

  if (!weather) {
    return <p>Loading weather...</p>;
  }

  const { location, current } = weather;

  return (
   <Card sx={{ maxWidth: 500, margin: "20px auto", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {location.name}, {location.region}, {location.country}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Local Time: {location.localtime}
        </Typography>

        <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Grid item>
            <CardMedia
              component="img"
              sx={{ width: 64, height: 64 }}
              image={current.condition.icon}
              alt={current.condition.text}
            />
          </Grid>
          <Grid item>
            <Typography variant="h4">{current.temp_c} °C</Typography>
            <Typography variant="subtitle1">{current.condition.text}</Typography>
            <Typography variant="body2">
              Feels like: {current.feelslike_c} °C
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Typography>Humidity: {current.humidity}%</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              Wind: {current.wind_kph} kph {current.wind_dir}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Pressure: {current.pressure_mb} mb</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Visibility: {current.vis_km} km</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>UV Index: {current.uv}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Home;
