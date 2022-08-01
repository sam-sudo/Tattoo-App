import { Image, View, Text, Modal, Pressable, Button, TextInput, TouchableOpacity, ImageBackground } from "react-native"
import React, { useEffect, useState } from 'react'
import { format } from "date-fns";
import styles from "../../../styles/styles"
import { CheckBox, Icon } from "react-native-elements"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ScrollView } from 'react-native-gesture-handler';
import { addNewItemTask, getSupabaseTasks, mySubscription, supabase, updateItemTask } from "../../api/supabaseApi";


const ModalPoup = ({ visible, setModalVisible,setPropsItemTemp, propsItemObject, children }) => {

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

    return (
        <Modal
            onRequestClose={() => {
                setModalVisible(false)
                setPropsItemTemp(propsItemObject)
            }}
            transparent visible={showModal}  >
            <View style={styles.modal.modalItemTask}>
                <View style={styles.modal.modalContainer}>


                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

                        {children}
                    </ScrollView>

                </View>
            </View>
        </Modal>
    )
}










const showFormatedTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}






const ItemModal = ({ setSupabaseItems, propsItemObject, isNewItem, visible, setModalVisible, }) => {


    const [showFullImg, setShowFullImg] = useState(false)
    const [datePicker, setDatePicker] = useState(false)
    const [datePickerTimerStart, setDatePickerTimerStart] = useState(false)
    const [datePickerTimerEnd, setDatePickerTimerEnd] = useState(false)
    const [propsItemTemp, setPropsItemTemp] = useState(propsItemObject)


   

    const defaultTime = new Date()





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



    const showImages = (arrayImages) => {

        const [indexDot, setIndexDot] = useState(0)

        if (arrayImages.length > 0) {



            return (

                <View>
                    <Carousel
                        layout='default'
                        //loop={true}
                        lockScrollWhileSnapping={true}
                        data={arrayImages}
                        enableMomentum={true}
                        onSnapToItem={(index) => {

                            setIndexDot(index)
                        }}
                        renderItem={({ item, index }) => {

                            return <TouchableOpacity delayPressIn={1000} onPressIn={() => {
                                //touch
                                setShowFullImg(true)
                            }}>
                                <ImageBackground style={{ width: 200, height: 200, }} source={{ uri: item }}>
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
                        windowSize={21}
                        sliderWidth={styles.windoWidth - 100}
                        itemWidth={200}
                    //autoplay={true}

                    >

                    </Carousel >
                    <Pagination
                        dotsLength={arrayImages.length}
                        activeDotIndex={indexDot}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 8,
                            backgroundColor: 'rgba(255, 255, 255, 0.92)'
                        }}

                    >

                    </Pagination>
                </View>
            )

        } else {
            return (
                <View style={{}}>
                    <Text style={{ fontSize: 20, textAlign: 'center' }}>No images</Text>
                </View>
            )
        }
    }




    return (

        <ModalPoup visible={visible} setModalVisible={setModalVisible} propsItemObject={propsItemObject} setPropsItemTemp={setPropsItemTemp} >

            <Modal visible={showFullImg} transparent={true} onRequestClose={() => setShowFullImg(false)}>
                <View style={styles.modal.modalContainerImg}>
                    <Image style={{ flex: 1, width: "100%", resizeMode: "contain" }} source={{ uri: "https://picsum.photos/200" }}></Image>

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
                        onPressIn={() => {
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
                        onPressIn={() => {
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
                        onPressIn={() => {
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

                <View style={{ marginTop: 10 }}>
                    {
                        //console.log(Array.from(propsItemTemp.img ?? []))
                        showImages(Array.from(propsItemTemp.img ?? []))
                    }
                    {/* <Image style={{height:100, width:100}} source={{uri:Array.from(propsItem.img ?? '')[0]}}></Image> */}
                </View>



            </View>

            <View style={{}}>
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
                                console.log('Propsitemtemp -> ',propsItemTemp);
                                console.log('is new? -> ',isNewItem);
                                isNewItem ? addNewItemTask(propsItemTemp) : updateItemTask(propsItemTemp)
                                setModalVisible(false)
                                getSupabaseTasks().then((values) => {
                                    console.log('aqui entra -> ',values);
                                    setSupabaseItems(values)
                                })
                                //updateItemTask(propsItemTemp)

                            }}></Button>
                        </View>
                    </View>
                </View>

            </View>
        </ModalPoup>

    )

}

export default ItemModal