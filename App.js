import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Router from './src/Navigations/Router';

export default function App() {
  return (
    <>
    <StatusBar style="auto" />
    <Router />
    </>
  );
}

