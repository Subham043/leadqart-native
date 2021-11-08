import React from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useWindowDimensions, Text } from 'react-native';
import FacebookScreen from '../Screens/Facebook/index'
import AllClientsScreen from '../Screens/AllClients/index'
import GroupsScreen from '../Screens/Groups/index'


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

const ClientTab = ({navigation}) => {
  
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
            renderScene= {({ route }) => {
              switch (route.key) {
              case 'first':
              return <AllClientsScreen navigation={navigation} tabIndexNumber={index} />;
              case 'second':
              return <FacebookScreen navigation={navigation} tabIndexNumber={index} />;
              case 'third':
              return <GroupsScreen navigation={navigation} tabIndexNumber={index} />;
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

export default ClientTab
