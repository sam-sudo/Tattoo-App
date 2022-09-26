import { Image, View, Text, Modal, Button, TextInput, TouchableOpacity, ImageBackground } from "react-native"
import React, { useEffect, useState } from 'react'
import { format } from "date-fns";
import styles from "../../../styles/styles"
import { Icon } from "react-native-elements"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ScrollView } from 'react-native-gesture-handler';
import { addNewItemTask, getSupabaseTasks, updateItemTask, getBucketUrlPath, getBucketNames } from "../../api/supabaseApi";
import MasonryList from "react-native-masonry-list";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from "@react-navigation/native";



const showFormatedTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}


const ItemModal = ({ propsItemObject, isNewItem, visible, setModalVisible, setSupabaseItems, isRefresh }) => {



    const [showFullImg, setShowFullImg] = useState(false)
    const [datePicker, setDatePicker] = useState(false)
    const [datePickerTimerStart, setDatePickerTimerStart] = useState(false)
    const [datePickerTimerEnd, setDatePickerTimerEnd] = useState(false)
    const [propsItemTemp, setPropsItemTemp] = useState(propsItemObject)

    const [arrayImages, setArrayImages] = useState([])

    const [url, setUrl] = useState('')


    useEffect(() => {
        getImages('user', propsItemTemp.title).then(setArrayImages)
    }, [isRefresh])

    const defaultTime = new Date()



    const [showModal, setShowModal] = useState(visible)

    useEffect(() => {
        toggleModal()

    }, [visible])

    const toggleModal = () => {
        if (visible) {
            setShowModal(true)
        } else {


            setShowModal(false)
        }
    }

    async function getImages(user, taskTitle) {



        const names = await getBucketNames('images', 'user', taskTitle)
        const path = getBucketUrlPath('images', 'user', taskTitle)
        return names.map(name => ({ uri: path.publicURL + '/' + name.name }))

    }


    const hideDatePicker = () => {
        if (datePicker == true) setDatePicker(false)
        if (datePickerTimerStart == true) setDatePickerTimerStart(false)
        if (datePickerTimerEnd == true) setDatePickerTimerEnd(false)


    }

    const confirmDatePicker = (date) => {
        let dateFormated = format(new Date(date), "yyyy-MM-dd")
        propsItemTemp.date = dateFormated

        //setPropsItemTemp(propsItemTemp)
        setDatePicker(false)
    }
    const confirmHourStartPicker = (time) => {

        let timeFormated = showFormatedTime(time)
        propsItemTemp.hourStart = timeFormated

        setDatePickerTimerStart(false)
    }
    const confirmHourEndPicker = (time) => {
        let timeFormated = showFormatedTime(time)
        propsItemTemp.hourEnd = timeFormated

        setDatePickerTimerEnd(false)
    }


    //----pages Components------

    const ImagesPages = () => {
        console.log('images rendering...');
        
        if (arrayImages.length > 0) {

            return <View style={{ flex: 1}}>
                <MasonryList
                    columns={2}
                    listContainerStyle={{ justifyContent:'center'}}
                    
                    customImageComponent={(item) => {

                        return <TouchableOpacity delayPressIn={1000} onPressIn={() => {
                            //touch
                            setUrl(item.source.uri)
                            setShowFullImg(true)
                        }}>
                            <ImageBackground style={{width:item.style.width/ 1.1, height:item.style.height / 1.1, margin:5}} source={{ uri: item.source.uri }}>
                                <TouchableOpacity onPressIn={(props) => {
                                    //delete img
                                }}>
                                    <View style={{ height: 40, justifyContent: 'flex-start', padding: 5 }}>

                                        <Icon

                                            style={{ alignItems: 'flex-end' }}
                                            size={25}
                                            name='minuscircle'
                                            type='antdesign'
                                            color='red'
                                        />



                                    </View>
                                </TouchableOpacity>
                            </ImageBackground >
                        </TouchableOpacity>
                    }}
                    backgroundColor={styles.colors.mainColor}
                    images={arrayImages}

                >

                </MasonryList>
            </View>






        } else {
            return (
                <View style={{backgroundColor:styles.colors.mainColor, justifyContent:'center', flex:1}}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>No images</Text>
                </View>
            )
        }

    }



    const FormPage = () => {
        return <ScrollView style={{backgroundColor:styles.colors.mainColor}} showsVerticalScrollIndicator={false}>

            <Modal visible={showFullImg} transparent={true} onRequestClose={() => setShowFullImg(false)}>
                <View style={styles.modal.modalContainerImg}>
                    <Image style={{ flex: 1, width: "100%", resizeMode: "contain" }} source={{ uri: url }}></Image>

                </View>
            </Modal>

            <DateTimePickerModal

                isVisible={datePicker}
                mode={'date'}
                style={{}}
                date={propsItemObject.date == undefined ? defaultTime : new Date(propsItemObject.date)}
                onCancel={hideDatePicker}
                onConfirm={(props) => {
                    confirmDatePicker(props)
                }}

            >

            </DateTimePickerModal>
            <DateTimePickerModal

                isVisible={datePickerTimerStart}
                mode={'time'}

                style={{}}
                date={propsItemObject.date == undefined ? defaultTime : new Date(propsItemObject.date)}
                onCancel={hideDatePicker}
                onConfirm={(props) => {
                    confirmHourStartPicker(props)
                }}

            >

            </DateTimePickerModal>

            <DateTimePickerModal

                isVisible={datePickerTimerEnd}
                mode={'time'}

                style={{}}
                date={propsItemObject.date == undefined ? defaultTime : new Date(propsItemObject.date)}
                onCancel={hideDatePicker}
                onConfirm={(props) => {
                    confirmHourEndPicker(props)
                }}

            >

            </DateTimePickerModal>

            <View style={styles.modal.modalHeader}>

                <TextInput
                    placeholder="Title"
                    multiline={true}
                    numberOfLines={2}
                    maxLength={35}
                    onChangeText={(newTtitle) => {
                        setPropsItemTemp((prevState) => ({
                            ...prevState,
                            title: newTtitle
                        }))
                    }}
                    style={{ width: '100%', fontSize: 30, color: 'white', fontWeight: 'bold' }}>{propsItemTemp.title}</TextInput>
            </View>




            <View style={{ flex: 1, marginTop: 20 }} >
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity
                        style={{
                            paddingBottom: 10,
                            marginEnd: 5,
                            padding: 5,
                            borderBottomWidth: 1,
                            borderColor: 'white',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            flex: 1
                        }}
                        onPress={() => {
                            setDatePicker(true)
                        }}>
                        <View >

                            <TextInput editable={false} placeholder='Empty date' style={{ color: 'white', fontSize: 15, }}>{propsItemTemp.date}</TextInput>
                        </View>
                        <View >
                            <Icon name="calendar" type="feather" size={20} style={{ borderTopEndRadius: 10, borderBottomEndRadius: 10, }} color="white" />

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            padding: 5,
                            marginStart: 5,
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            borderColor: 'white',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flex: 0.5
                        }}
                        onPress={() => {
                            setDatePickerTimerStart(true)
                        }}>
                        <View >
                            <TextInput editable={false} placeholder='00:00' style={{ color: 'white', fontSize: 15, textAlign: 'left', }}>{propsItemTemp.hourStart?.slice(0, -3)}</TextInput>
                        </View>
                        <View >
                            <Icon name="clock" type="feather" size={20} style={{ borderTopEndRadius: 10, borderBottomEndRadius: 10, }} color="white" />

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginStart: 5,
                            padding: 5,
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            borderColor: 'white',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flex: 0.5
                        }}
                        onPress={() => {
                            setDatePickerTimerEnd(true)
                        }}>
                        <View >
                            <TextInput editable={false} placeholder='00:00' style={{ color: 'white', fontSize: 15, textAlign: 'left' }}>{propsItemTemp.hourEnd?.slice(0, -3)}</TextInput>
                        </View>
                        <View >
                            <Icon name="clock" type="feather" size={20} style={{ borderTopEndRadius: 10, borderBottomEndRadius: 10, }} color="white" />

                        </View>
                    </TouchableOpacity>
                </View>

                <View >

                    <TextInput
                        maxLength={20}
                        placeholder='Position'
                        onChangeText={(newPosition) => {
                            setPropsItemTemp(prevState => ({
                                ...prevState,
                                position: newPosition
                            }))
                        }}
                        style={{
                            marginStart: 5,
                            paddingBottom: 10,
                            borderBottomWidth: 1,
                            borderColor: 'white', color: 'white', fontSize: 15, textAlign: 'left', marginTop: 10, marginEnd: 5
                        }}>{propsItemTemp.position}</TextInput>
                </View>



                <View style={{ marginTop: 30, marginBottom: 30, flexDirection: 'column' }}>

                    <TextInput
                        multiline={true}
                        maxLength={300}
                        //numberOfLines={5}
                        placeholder='Description'
                        style={styles.modal.editableInput}
                        onChangeText={(newDescription) => {
                            setPropsItemTemp(prevState => ({
                                ...prevState,
                                description: newDescription
                            }))
                        }}>{propsItemTemp.description}</TextInput>

                    <Text style={{
                        color: 'white',
                        fontSize: 12,
                        textAlign: 'center',
                        marginTop: 10
                    }}  >{(propsItemTemp.description?.length ?? '0') + '/300'}</Text>
                </View>




            </View>



            <View >

                <View style={{ alignItems: 'center', }}>

                    <View style={{ padding: 10, flexDirection: 'row', alignSelf: 'flex-end' }}>
                        <View style={{ marginRight: 5 }}>
                            <Button title='Cancel' onPress={() => {
                                setModalVisible(false)
                                setPropsItemTemp(propsItemObject)

                            }}
                                color='black' >

                            </Button>
                        </View>
                        <View>
                            <Button title='Save' onPress={() => {
                                //send data update to supabase

                                isNewItem
                                    ? addNewItemTask(propsItemTemp).then(() => {
                                        getSupabaseTasks().then((values) => {
                                            console.log('aqui');
                                            setSupabaseItems(values)
                                        })
                                    })
                                    : updateItemTask(propsItemTemp)

                                setModalVisible(false)
                                setPropsItemTemp(propsItemObject)

                                //updateItemTask(propsItemTemp)

                            }}></Button>
                        </View>
                    </View>
                </View>

            </View>
        </ScrollView>





    }

    const Tab = createMaterialTopTabNavigator()



    return (


        < Modal
            onRequestClose={() => {
                setModalVisible(false)
                setPropsItemTemp(propsItemObject)
            }}
            transparent visible={showModal} >
            <View style={styles.modal.modalItemTask}>
                <View style={styles.modal.modalContainer}>

                    <NavigationContainer  independent={true}>
                        <Tab.Navigator screenOptions={{
                            
                            tabBarShowLabel:true, 
                            tabBarShowIcon:false,
                            tabBarPressColor:'white',
                            tabBarLabelStyle:{fontWeight:'bold'},
                            tabBarActiveTintColor:'white',                            
                            tabBarContentContainerStyle:{backgroundColor:styles.colors.mainColor}
                            }} >
                            <Tab.Screen  name='form'   component={FormPage}></Tab.Screen>
                            <Tab.Screen name='Images'  component={ImagesPages}></Tab.Screen>
                        </Tab.Navigator>
                        
                    </NavigationContainer>


                </View>
            </View>
        </Modal >




    )

}





export default ItemModal