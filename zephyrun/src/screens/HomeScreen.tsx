import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Text, Card } from 'react-native-paper';
import * as Location from 'expo-location';

interface WeatherData {
  temperature: number;
  weatherCode: number;
  precipitation: number;
}

export function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
      // Fetch weather data
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&current=temperature_2m,weather_code,precipitation`
        );
        const data = await response.json();
        setWeather({
          temperature: data.current.temperature_2m,
          weatherCode: data.current.weather_code,
          precipitation: data.current.precipitation,
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You are here"
        />
      </MapView>
      
      {weather && (
        <Card style={styles.weatherCard}>
          <Card.Content>
            <Text variant="titleLarge">Current Weather</Text>
            <Text variant="bodyLarge">
              Temperature: {weather.temperature}°C
            </Text>
            <Text variant="bodyLarge">
              Precipitation: {weather.precipitation}mm
            </Text>
          </Card.Content>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  weatherCard: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
}); 