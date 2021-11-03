import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: Dimensions.get('window').height,
    },
    layerContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    topContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    topContainerShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.12,
        shadowRadius: 2.22,

        elevation: 1,
    },

    backButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    backButtonText: {
        fontWeight: 'bold',
    },

    middleContainer: {
        width: '100%',
    },

    HeadingTextContainer: {
        paddingHorizontal: 10,
        marginBottom: 25,
        paddingTop:20
    },

    HeadingText: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    },

    SocialButtonContainer: {
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 25,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },

    FollowGroupButtonContainer: {
        width: '100%',
        backgroundColor:'white',
        paddingHorizontal: 10,
        paddingTop: 25,
        paddingBottom: 25,
        borderTopWidth:0.5,
        borderTopColor: 'gray',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },

    FollowGroupButton: {
        width: '45%',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#33b9ff',
        alignItems: 'center',
        borderRadius:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },

    FollowGroupText:{
        color:'white',
        fontWeight: 'bold',
        marginTop: 10,
    },

    detailContainer:{
        width: '100%',
        backgroundColor:'white',
        paddingHorizontal: 10,
        paddingTop: 25,
        paddingBottom: 25,
        borderTopWidth:0.5,
        borderTopColor: 'gray',
    },

    detailHeaderText:{
        fontWeight:'bold',
        fontSize:20,
        marginBottom:10
    },

    detailText:{
        fontSize:14,
        marginBottom:5,
        color: 'gray',
    },

    noteContainer:{
        width: '100%',
        backgroundColor:'white',
        paddingHorizontal: 10,
        paddingTop: 25,
        paddingBottom: 25,
        borderTopWidth:0.5,
        borderTopColor: 'gray',
    },

    timelineContainer:{
        width: '100%',
        backgroundColor:'white',
        paddingHorizontal: 10,
        paddingTop: 25,
        paddingBottom: 55,
        borderTopWidth:0.5,
        borderTopColor: 'gray',
        borderBottomWidth:0.5,
        borderBottomColor: 'gray',
        marginBottom:130
    },

    timelineHeaderText:{
        fontWeight:'bold',
        fontSize:20,
        marginBottom:25
    },

    timelineItemContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    
    timelineItemOtherContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    addActivityIcon:{
        width:35,
        height:35,
        borderRadius:20,
        backgroundColor:'#fff',
        borderWidth: 2,
        borderColor: '#33b9ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },

    timelineIcon:{
        width:35,
        height:35,
        borderRadius:20,
        backgroundColor:'#33b9ff',
        borderWidth: 2,
        borderColor: '#33b9ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },

    timelineDetailText:{
        width:200,
    },

    addActivityText:{
        color:'#33b9ff',
        fontWeight:'bold',
        fontSize:16
    },
    
    timelineText:{
        color:'#000',
        fontWeight:'bold',
        fontSize:16,
        position:'absolute',
        top:30
    },

    timelineDateContainer:{
        flexDirection: 'row',
        width:100,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:5
    },

    timelineDate:{
        color:'#000',
        fontWeight:'bold',
        fontSize:14,
    },

    timelineTime:{
        color:'gray',
        fontWeight:'bold',
        fontSize:12,
    },

    timeLine:{
        width:1,
        height:60,
        backgroundColor:'#33b9ff',
        position:'relative',
        left:17
    },

    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical:10,
    },

    bottomButton:{
        backgroundColor: '#ffaa49',
        width: '100%',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    bottomButtonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    }

})


export default styles;