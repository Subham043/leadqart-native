import React from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useWindowDimensions, Text } from 'react-native';
import FacebookScreen from '../Screens/Facebook/index'
import AllClientsScreen from '../Screens/AllClients/index'

const renderScene = SceneMap({
    first: AllClientsScreen,
    second: FacebookScreen,
    third: FacebookScreen,
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

const ClientTab = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'All Clients' },
        { key: 'second', title: 'Team' },
        { key: 'third', title: 'Group' },
    ]);
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    )
}

export default ClientTab
