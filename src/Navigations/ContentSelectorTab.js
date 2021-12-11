import React from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useWindowDimensions, Text } from 'react-native';
import FileSelectorScreen from '../Screens/FileSelectorScreen'
import MessageSelectorScreen from '../Screens/MessageSelector/index'
import PageSelectorScreen from '../Screens/PageSelector/index'

const renderScene = SceneMap({
  Messages: MessageSelectorScreen,
  Files: FileSelectorScreen,
  Pages: PageSelectorScreen,
});

const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#33b9ff' }}
      style={{ backgroundColor: 'white', color: 'white'}}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color:focused ? "#33b9ff" : "gray", margin: 8 }}>
          {route.title}
        </Text>
      )}
    />
  );

const ContentSelectorTab = ({ navigation, leadId }) => {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'Messages', title: 'Messages' },
        { key: 'Files', title: 'Files' },
        { key: 'Pages', title: 'Pages' },
    ]);
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={({ route }) => {
              switch (route.key) {
              case 'Messages':
              return <MessageSelectorScreen navigation={navigation} tabIndexNumber={index} leadId={leadId} />;
              case 'Files':
              return <FileSelectorScreen navigation={navigation} tabIndexNumber={index} leadId={leadId} />;
              case 'Pages':
              return <PageSelectorScreen navigation={navigation} tabIndexNumber={index} leadId={leadId} />;
              default:
              return null;
              }}}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            swipeEnabled={false}
        />
    )
}

export default ContentSelectorTab
