import { WebView } from 'react-native-webview';

const WebViewComponent = props => {
    return <WebView source={{ uri: props.source }} allowsFullscreenVideo />;
};

export default WebViewComponent;