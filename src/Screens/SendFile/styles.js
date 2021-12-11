import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: Dimensions.get('window').height,
    },
    layerContainer: {
        width: '100%',
        height: '100%',
    },
    topContainer: {
        width: '100%',
        height: 60,
        backgroundColor:'#33b9ff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    backButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    backButtonText: {
        fontWeight: 'bold',
        color:'white',
        fontSize:15
    },

    middleContainer: {
        width: '100%',
        marginTop:10
    },

    sendDetailContainer:{
        width: '100%',
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },

    detailContainer:{
        width: '100%',
        backgroundColor:'white',
        paddingHorizontal: 10,
        paddingTop: 25,
        paddingBottom: 25,
    },

    detailHeaderText:{
        fontWeight:'bold',
        fontSize:20,
        marginBottom:10
    },

    detailText:{
        fontSize:15,
        lineHeight:20,
        marginBottom:5,
        color: 'gray',
    },

    sendNameText:{
        fontSize:15,
        fontWeight: 'bold',
        lineHeight:20,
        marginBottom:5,
        color: '#ffaa49',
    },

    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    bottomFirstButton:{
        backgroundColor: '#ffaa49',
        width: '15%',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    bottomButton:{
        backgroundColor: '#ffaa49',
        width: '83%',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    bottomButtonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },

    optionsMainContainer:{
        width:'100%',
        height:'100%',
    },

    optionsHeaderContainer:{
        width:'100%',
        height:40,
        paddingHorizontal:10,
        paddingVertical:5,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    optionsHeaderText:{
        fontSize:15
    },

    optionsContainer:{
        width:'100%',
        height:60,
        backgroundColor:'white',
        marginBottom:2,
        paddingHorizontal:10,
        paddingVertical:5,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    optionsText:{
        color:'#33b9ff',
        fontWeight:'bold',
        marginLeft:15,
        fontSize:15
    },

    messageMainContainer:{
        paddingHorizontal:10,
        paddingVertical:5,
        width:'100%',
        height:80,
        borderBottomWidth:0.5,
        borderBottomColor:"gray", 
        backgroundColor:"white",
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    leftMainContainer:{
        width:'80%',
        height:'100%',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    pdfContainer:{
        width:'15%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },


    textContainer:{
        width:'85%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    title:{
        fontWeight: 'bold',
        marginBottom:5
    },

    rightMainContainer:{
        width:'20%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    previewText:{
        fontWeight: 'bold',
        color: '#ffaa49',
    }

})


export default styles;