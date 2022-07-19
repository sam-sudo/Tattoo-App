import { Image, View, Text, Modal, Pressable, Button, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import StyledText from './StyledText'
import { getWeather } from '../api/weatherAPI'
import { format } from "date-fns";
import styles from "../../styles/styles"
import { CheckBox, Icon } from "react-native-elements"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TaskItemModel } from '../model/TaskItemModel';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ScrollView } from 'react-native-gesture-handler';


const ModalPoup = ({ visible, children }) => {

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
        <Modal onRequestClose={() => setShowModal(false)} transparent visible={showModal}  >
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


// class TaskItemModel {

//     id
//     title
//     descriptiong
//     date
//     hourStart
//     hourEnd
//     img

//     constructor(id, title, description, date, hourStart, hourEnd, img) {
//         this.id = id
//         this.title = title
//         this.description = description
//         this.date = date
//         this.hourStart = hourStart
//         this.date = hourEnd
//         this.img = img
//     }



// }


const TaskItem = (propsItem) => {

    console.log('primero');
    const propsItemObject = new TaskItemModel(propsItem.id, propsItem.title, propsItem.description, propsItem.date, propsItem.hourStart, propsItem.hourEnd, propsItem.position, propsItem.img)


    const [imageTime, setImageTime] = useState(null)
    const [Modalvisible, setModalVisible] = useState(false)
    const [showFullImg, setShowFullImg] = useState(false)
    const [datePicker, setDatePicker] = useState(false)
    const [datePickerTimerStart, setDatePickerTimerStart] = useState(false)
    const [datePickerTimerEnd, setDatePickerTimerEnd] = useState(false)
    const [propsItemTemp, setPropsItemTemp] = useState(propsItemObject)






    useEffect(() => {
        (async () => {
            const image = await getIcon(propsItem)
            setImageTime(`http:${image}`)
        })()
    }, [])



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
        console.log('confirm start');
        let timeFormated = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let hour = timeFormated.split(':')[0]
        let minutes = timeFormated.split(':')[1]
        propsItemTemp.hourStart = hour + ':' + minutes

        setDatePickerTimerStart(false)
    }
    const confirmHourEndPicker = (time) => {

        let timeFormated = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        let hour = timeFormated.split(':')[0]
        let minutes = timeFormated.split(':')[1]
        propsItemTemp.hourEnd = hour + ':' + minutes

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
                            console.log('index', index);

                            setIndexDot(index)
                        }}
                        renderItem={({ item, index }) => {

                            return <TouchableOpacity delayPressIn={1000} onPressIn={() => {
                                //touch
                                console.log('aquiiiiii');
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
        <View style={{}}>
            {showDate(propsItem.date, propsItem.lastDate)}
            {console.log('dentro')}
            <Modal visible={showFullImg} transparent={true} onRequestClose={() => setShowFullImg(false)}>
                <View style={styles.modal.modalContainerImg}>
                    <Image style={{ flex: 1, width: "100%", resizeMode: "contain" }} source={{ uri: "https://picsum.photos/200" }}></Image>

                </View>
            </Modal>


            <ModalPoup visible={Modalvisible} >

                <DateTimePickerModal

                    isVisible={datePicker}
                    mode={'date'}

                    style={{}}
                    date={new Date(propsItem.date)}
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
                    date={new Date(propsItem.date)}
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
                    date={new Date(propsItem.date)}
                    onCancel={hideDatePicker}
                    onConfirm={(props) => {
                        confirmHourEndPicker(props)
                    }}

                >

                </DateTimePickerModal>

                <View style={styles.modal.modalHeader}>
                    <View >
                        <TextInput multiline={true} maxLength={35} numberOfLines={2} style={{ textAlign: 'center', fontSize: 30, color: 'white', fontWeight: 'bold' }}>{propsItemTemp.title}</TextInput>
                    </View>


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
                                <Text style={{ color: 'white', fontSize: 15, }}>{propsItemTemp.date}</Text>
                            </View>
                            <View >
                                <Icon name="calendar" type="feather" size={25} style={{ borderTopEndRadius: 10, borderBottomEndRadius: 10, }} color="white" />

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
                                <Text style={{ color: 'white', fontSize: 15, textAlign: 'left', marginEnd: 5 }}>{propsItemTemp.hourStart}</Text>
                            </View>
                            <View >
                                <Icon name="clock" type="feather" size={25} style={{ borderTopEndRadius: 10, borderBottomEndRadius: 10, }} color="white" />

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
                                <Text style={{ color: 'white', fontSize: 15, textAlign: 'left', marginEnd: 5 }}>{propsItemTemp.hourEnd}</Text>
                            </View>
                            <View >
                                <Icon name="clock" type="feather" size={25} style={{ borderTopEndRadius: 10, borderBottomEndRadius: 10, }} color="white" />

                            </View>
                        </TouchableOpacity>
                    </View>

                    <View >

                        <TextInput style={{
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
                        {showImages(Array.from(propsItemTemp.img ?? []))}
                        {/* <Image style={{height:100, width:100}} source={{uri:Array.from(propsItem.img ?? '')[0]}}></Image> */}
                    </View>



                </View>

                <View style={{}}>
                    <View style={{ alignItems: 'center', }}>

                        <View style={{ padding: 10, flexDirection: 'row', alignSelf: 'flex-end' }}>
                            <View style={{ marginRight: 5 }}>
                                <Button title='Cancel' onPress={() => {
                                    console.log('aqui');
                                    setModalVisible(false)
                                    setPropsItemTemp(propsItemObject)
                                    console.log(propsItemTemp);

                                }}
                                    color='black' >

                                </Button>
                            </View>
                            <View>
                                <Button title='Save' onPress={() => {
                                    //send data update to firebase
                                    //firebase.update( propsItem)
                                }}></Button>
                            </View>
                        </View>
                    </View>

                </View>

            </ModalPoup>
            <Pressable onPress={() => setModalVisible(true)}>
                <View key={propsItem.id} style={{ flexDirection: 'row', borderColor: 'grey', borderRadius: 10, borderWidth: 0, padding: 10, alignItems: 'flex-start' }}>
                    <Image style={{ width: 15, height: 15 }} source={getColor(propsItem.color)}></Image>

                    <View style={{ flexDirection: 'column', flex: 1, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <StyledText alignCenter > {getHour(propsItem.hourStart)} - {getHour(propsItem.hourEnd)}</StyledText>
                        </View>
                        <View >
                            <StyledText bold black > {propsItem.title}</StyledText>
                            <Text numberOfLines={2} > {propsItem.description}</Text>

                        </View>


                    </View>
                    <Image style={{ width: 30, height: 30, }} source={{ uri: imageTime }} ></Image>


                </View>
            </Pressable>
        </View>
    )
}



//------------------------function------------------------


function getHour(hour) {
    let time = parseInt(hour)
    let hourFormated = hour.split(':')[0]
    let minutesFormated = hour.split(':')[1]
    return time < 12 ? (hourFormated + ':' + minutesFormated) + ' AM' : (hourFormated + ':' + minutesFormated) + ' PM'

}

function getColor(color) {

    const colors = {
        'blue': require('../../assets/circleBlue.png'),
        'red': require('../../assets/circleRed.png'),
        'grey': require('../../assets/circleGrey.png'),
        'purple': require('../../assets/circlePurple.png'),
        'yellow': require('../../assets/circleYellow.png')
    }


    return colors[color] ?? require('../../assets/circleGrey.png')

    // switch (color) {
    //     case 'blue':
    //         return require('../../assets/circleBlue.png')
    //     case 'red':
    //         return require('../../assets/circleRed.png')
    //     case 'grey':
    //         return require('../../assets/circleGrey.png')
    //     case 'purple':
    //         return require('../../assets/circlePurple.png')
    //     case 'yellow':
    //         return require('../../assets/circleYellow.png')
    //     default:
    //         break;
    // }


}

async function getIcon(propsItem) {

    const response = await getWeather()
    const actualHour = propsItem.hourStart.split(':')[0] 
    const forecast = response.forecast.forecastday
    let icon = ''

    const date = format(new Date(propsItem.date), "yyyy-MM-dd")

    forecast.forEach(day => {

        const dayFormat = format(new Date(day.date), "yyyy-MM-dd")

        if (dayFormat == date) {
            let hourChanged = ''
            day.hour.forEach(hour => {


                hourChanged = hour.time.split(' ', 2)[1].split(':')[0]
                console.log(hourChanged == actualHour);
                console.log(hourChanged);
                console.log(actualHour);
                if (hourChanged == actualHour) {

                    icon = hour.condition.icon
                }
            });



        }




    });
    return icon

}




function showDate(date, lastDate) {

    const actualDate = new Date(date)
    const lastDayFormatted = new Date(lastDate)
    const day = actualDate.getDate()
    const lastDay = lastDayFormatted.getDate()
    const month = actualDate.getMonth()
    const lastMonth = lastDayFormatted.getMonth()

    if (day !== lastDay || month !== lastMonth) {
        return <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center', padding: 5 }}>
            <StyledText padding5 bold small style={{}}>
                {actualDate.getDate()}/{actualDate.getMonth()}/{actualDate.getFullYear()}

            </StyledText>
            <Icon style={{ alignContent: 'center' }} size={13} name="calendar" type="feather" color="grey"></Icon>
        </View>
    }

    return null

}

export default TaskItem