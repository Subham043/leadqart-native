import * as React from 'react';
import { WebView } from 'react-native-webview';
import styles from './styles'

export default function PdfView({route}) {

const { file } = route.params;

  return (
    <WebView
      style={styles.container}
      originWhitelist={['*']}
      source={{ uri: `http://156.67.217.238:8080/uploads/${file}` }}
    />
  );
}