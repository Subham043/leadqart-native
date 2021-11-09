import React from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useWindowDimensions, Text } from 'react-native';
import FilesScreen from '../Screens/Files/index'
import MessagesScreen from '../Screens/Messages/index'
import PagesScreen from '../Screens/Pages/index'

const renderScene = SceneMap({
  Messages: MessagesScreen,
  Files: FilesScreen,
  Pages: PagesScreen,
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

const ContentTab = ({ navigation }) => {
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
              return <MessagesScreen navigation={navigation} tabIndexNumber={index} />;
              case 'Files':
              return <FilesScreen navigation={navigation} tabIndexNumber={index} />;
              case 'Pages':
              return <PagesScreen navigation={navigation} tabIndexNumber={index} />;
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

export default ContentTab
