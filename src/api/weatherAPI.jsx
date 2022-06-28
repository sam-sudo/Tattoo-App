import React from "react";
import { View } from "react-native";


export async function getWeather() {
    try {
        const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=4dfa1c3dd7d1475481b100206221506 &q=Granada&days=7&aqi=no&alerts=no');
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);
    }
  }


