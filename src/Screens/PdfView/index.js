import * as React from 'react';
import { WebView } from 'react-native-webview';
import styles from './styles'

export default function PdfView({route}) {

const { file } = route.params;

  return (
    <WebView
      style={styles.container}
      originWhitelist={['*']}
      source={{ uri: `http://api.leadqart.in/uploads/${file}` }}
    />
  );
}