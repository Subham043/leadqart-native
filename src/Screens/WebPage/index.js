import * as React from 'react';
import { WebView } from 'react-native-webview';
import styles from './styles'

export default function WebPage({route}) {

const { id } = route.params;

  return (
    <WebView
      style={styles.container}
      originWhitelist={['*']}
      source={{ uri: `https://leadqart.herokuapp.com/content-page/view-page/${id}` }}
    />
  );
}