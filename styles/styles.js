import Constants from 'expo-constants'
import { StyleSheet, Dimensions, StatusBar } from 'react-native';

//calcula la altura usable de la pantalla
const windowHeight = Dimensions.get('window').height
const windoWidth = Dimensions.get('window').width
const statusBarHeight = Constants.statusBarHeight

const colors = {
    mainColor: '#6556D9',
    onTapInColor: '#F2F3F4',
    onTapOutColor: '#FFFFFF'
}

const styles = StyleSheet.create({

    container: {
        //marginTop: Constants.statusBarHeight,
        //flexGrow: 1,
        // margin: 10,
        height: windowHeight-statusBarHeight,
    },

    title: {
        fontSize: 30,
        textAlign: 'center'
    },
    titleMax: {
        fontSize: 30,
        textAlign: 'center',
        borderTopColor: 'grey',
        borderBottomColor: 'grey',
        borderWidth: 1,
    },
    listView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center'
    },
    listTile: {
        fontSize: 15,
        color: colors.mainColor,
        fontWeight: 'bold',
    },
    linesTop: {
        borderTopColor: 'grey',
        borderBottomColor: 'grey',
        borderWidth: 1
    }
});

const proposal = StyleSheet.create({
    container: {
        //marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        margin: 10,
        height: windowHeight,
    }


})

const calendar = StyleSheet.create({
    container: {
        //marginTop: Constants.statusBarHeight,
        flex: 1,
        margin: 10,

        //padding:10
    },
    itemContainer: {
        marginRight: 10,
        marginTop: 17,
        width: '100%',
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    }


})



const modal = StyleSheet.create({
    editableColor: '#7B6FD8',
    editableInput: {
        color: 'white',
        borderBottomWidth: 1,
        borderColor: 'white',
        maxHeight:150,
        borderRadius: 10,
        paddingBottom: 5,
        paddingStart: 5,
        textAlignVertical:'bottom',

    },
    modalItemTask: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '90%',
        height: '90%',
        
        backgroundColor: colors.mainColor,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        elevation: 20
    },
    modalContainerImg: {
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.8)',

        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        elevation: 20
    },
    modalHeader: {
        width: '100%',
      //  height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})


const swipeList = StyleSheet.create({
    contaier: {
        backgroundColor: 'green',
        flex: 1
    },
    rowBack: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 15,
        margin: 5,
        marginBottom: 0,
        borderRadius: 5
    },
    button_right: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    button_right_back_left: {
        backgroundColor: '#5DADE2',

    },
    button_right_back_right: {
        backgroundColor: '#CD6155',

        left: 75,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    }
})




export default { styles, colors, proposal, calendar, modal, swipeList, windoWidth, windowHeight, statusBarHeight }
