import React, { useState, useRef, useEffect, Suspense } from 'react'
import ProposalsList from './ProposalsList'
import { View, Text, Switch, Image, ImageBackground, Animated, Pressable, TouchableOpacity } from 'react-native'
import TaskList from './TaskList'
//import TaskCalendar from './TaskCalendar'
import { createDrawerNavigator, DrawerContentScrollView, useDrawerStatus, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler'
import styles from '../../styles/styles';
import { Icon } from 'react-native-elements';
import { getWeather } from '../api/weatherAPI'
import { format } from 'date-fns'
import StyledSheet from './StyledText'





const Drawer = createDrawerNavigator();

const TaskCalendar = React.lazy(() => import('./TaskCalendar'));


//---------------------ICON STATE EFFECT---------------------
const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 300,
            }
        ).start();
    }, [fadeAnim])

    return (
        <Animated.View                 // Special animatable View
            style={{
                ...props.style,
                opacity: fadeAnim,         // Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    );
}


//-coustomDrawer---------------------

const CustomDrawer = props => {

    const [switchState, setSwitchState] = useState(false)

    const isDrawerOpen = useDrawerStatus() === 'open';





    return (
        <DrawerContentScrollView contentContainerStyle={{ height: '100%', }} {...props}  >
            <View style={{ padding: 10, height: '20%', flexDirection: 'column', }}>
                <View style={{ flexDirection: 'row', flex: 1, alignContent: 'center', alignItems: 'center' }}>
                    <ImageBackground style={{ width: 100, height: 100, }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/147/147144.png' }}>
                        <View style={{ height: 100, justifyContent: 'flex-end' }}>

                            <FadeInView>
                                <Icon
                                    style={{ alignItems: 'flex-end' }}
                                    size={25}
                                    name={!switchState ? 'minuscircle' : 'checkcircle'}
                                    type={!switchState ? 'antdesign' : 'antdesign'}
                                    color={switchState ? '#16D300' : '#DE0000'} />
                            </FadeInView>


                        </View>
                    </ImageBackground>

                    <Switch style={{ flex: 1 }} value={switchState} onChange={() => { setSwitchState(!switchState) }}></Switch>

                </View>
                <View>
                    <StyledSheet bold small black>Taks finish: 100 pieces</StyledSheet>
                    <StyledSheet bold small black>Money earn: 1000€</StyledSheet>
                </View>
            </View>
            <View style={{ height: '70%', borderTopColor: 'black', borderTopWidth: 2, paddingTop: 50 }}>
                <DrawerItemList   {...props} />

            </View>
            <View style={{ height: '10%', flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'center', borderTopColor: 'black', borderTopWidth: 1, }}>
                <Text style={{ fontWeight: 'bold' }}>@T-APP - </Text>
                <Icon name='github' type='antdesign'></Icon>
                <Text style={{ fontWeight: 'bold' }}>sam-sudo</Text>
            </View>


        </DrawerContentScrollView>
    )
}







//drawer-------------
const MyDrawer = () => {


    const [imageTime, setImageTime] = useState(null)
    const [today, setToday] = useState(null)
    const [ascent, setAscent] = useState(false)


    useEffect(() => {
        (async () => {
            const image = await getTodayIcon()
            setImageTime(`http:${image}`)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const today = await getToday()
            setToday(today)
        })()
    }, [])


    async function getTodayIcon() {
        const response = await getWeather()
        const icon = response.current.condition.icon
        return icon
    }

    async function getToday() {
        const response = await getWeather()
        let day = response.location.localtime.split(' ', 1)
        day = format(new Date(day), "dd/MM/yyyy")
        return day
    }

    const CustomHeaderTime = ({ navigation }) => {
        return (
            <View style={{ marginTop: styles.statusBarHeight, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPressIn={() => navigation.toggleDrawer()}>
                    <Icon style={{ alignItems: 'flex-start', margin: 10 }} name='nav-icon-a' type='fontisto' size={20}></Icon>

                </TouchableOpacity>
                <Text style={styles.styles.listTile}>TODAY - {today}</Text>
                <Image style={{ width: 40, height: 40, }} source={{ uri: imageTime }} ></Image>
            </View>
        )
    }

    const CustomHeaderCalendar = ({ navigation }) => {
        return (
            <View style={{ marginTop: styles.statusBarHeight, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <TouchableOpacity onPressIn={() => navigation.toggleDrawer()}>
                    <Icon style={{ alignItems: 'flex-start', margin: 10 }} name='nav-icon-a' type='fontisto' size={20}></Icon>

                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#6556D9', fontSize: 30 }}>Calendar</Text>
                    <Icon name='calendar' type='feather' size={25} color='#6556D9' ></Icon>
                </View>
            </View>
        )
    }

    const CustomHeaderProposal = ({ navigation }) => {
        return (
            <View style={{ marginTop: styles.statusBarHeight, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <TouchableOpacity onPressIn={() => navigation.toggleDrawer()}>
                    <Icon style={{ alignItems: 'flex-start', margin: 10 }} name='nav-icon-a' type='fontisto' size={20}></Icon>

                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#6556D9', fontSize: 30 }}>Proposals</Text>
                    <Icon name="arrow-right" type='evilicon' size={35} color='#6556D9' ></Icon>
                </View>


            </View>
        )
    }



    return (
        <Drawer.Navigator
            screenOptions={{
                isDrawerOpen: true,
                drawerStyle: {
                    backgroundColor: styles.colors.mainColor,
                    opacity: 0.95,
                    padding: 5

                },

                drawerActiveTintColor: 'black',
                drawerInactiveTintColor: 'white',

            }}


            drawerContent={(props) => <CustomDrawer {...props} />}
            initialRouteName='Home'>
            <Drawer.Screen name="TaskList" component={TaskList}
                options={{
                    headerShown: true,

                    header: (props) => <CustomHeaderTime {...props} />,
                    drawerActiveBackgroundColor: 'white',
                    drawerActiveTintColor: 'black',
                    drawerIcon: ({ focused }) => <Icon name='tasks' type='font-awesome' color={focused ? 'black' : 'white'} />
                }} />
            <Drawer.Screen name="Calendar" component={() => {
                return <Suspense fallback={
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {/* <Image source={require('../../assets/calendarAnimated.gif')}></Image> */}
                        <Text style={{ fontSize: 20 }}>Loading...</Text>
                    </View>
                }>
                    <TaskCalendar />
                </Suspense>
            }} options={{
                headerShown: true,
                header: (props) => <CustomHeaderCalendar {...props} />,
                drawerActiveBackgroundColor: 'white',
                drawerActiveTintColor: 'black',
                drawerIcon: ({ focused }) => <Icon name='calendar' type='feather' color={focused ? 'black' : 'white'} />
            }} />
            <Drawer.Screen name="Proposals" component={ProposalsList}

                options={{
                    headerShown: true,
                    header: (props) => <CustomHeaderProposal {...props} />,
                    drawerActiveBackgroundColor: 'white',
                    drawerActiveTintColor: 'black',

                    drawerIcon: ({ focused }) => <Icon name='draw' type='material-community' color={focused ? 'black' : 'white'} />
                }} />

            {/* <Drawer.Screen name="Config" component={} options={{
                headerShown: false,
                
                drawerActiveBackgroundColor: 'white',
                drawerActiveTintColor: 'black',

                drawerIcon: ({ focused }) => <Icon name='md-settings-outline' type='ionicon' color={focused ? 'black' : 'white'} />
            }} /> */}

        </Drawer.Navigator>
    );
}





export const Main = () => {

    return (
        <NavigationContainer >
            <MyDrawer />
        </NavigationContainer>
    )
}