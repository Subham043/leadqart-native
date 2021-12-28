import * as React from 'react';
import { WebView } from 'react-native-webview';
import styles from './styles'

export default function WebPage({route}) {

const { id } = route.params;

  return (
    <WebView
      style={styles.container}
      originWhitelist={['*']}
      source={{ uri: `http://api.leadqart.in/content-page/view-page/${id}` }}
    />
  );
}