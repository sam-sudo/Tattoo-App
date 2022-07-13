import { Image, View, Text, Modal, Pressable, Button, TextInput, TouchableOpacity } from 'react-native'
import React, { Children, useEffect, useState } from 'react'
import StyledText from './StyledText'
import { getWeather } from '../api/weatherAPI'
import { format } from "date-fns";
import styles from "../../styles/styles"
import { CheckBox, Icon } from "react-native-elements"
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Carousel, { ParallaxImage } from 'react-native-snap-carousel';


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
        <Modal transparent visible={showModal}  >
            <View style={styles.modal.modalItemTask}>
                <View style={styles.modal.modalContainer}>



                    {children}

                </View>
            </View>
        </Modal>
    )
}



const TaskItem = (propsItem) => {


    const [imageTime, setImageTime] = useState(null)
    const [Modalvisible, setModalVisible] = useState(false)
    const [datePicker, setDatePicker] = useState(false)



    useEffect(() => {
        (async () => {
            const image = await getIcon(propsItem)
            setImageTime(`http:${image}`)
        })()
    }, [])



    const hideDatePicker = () => {
        setDatePicker(false)
    }

    const confirmDatePicker = () => {
        setDatePicker(false)
    }

    const showImages = (arrayImages) => {

        if (arrayImages.length > 0) {

            // return <View style={{flexDirection:'row'}}>
            //     {arrayImages.map(url => {
            //         console.log('url -> ', url);
            //         return <Image style={{ height: 100, width: 100 }} source={{ uri: url }}></Image>
            //     })}
            // </View>

            return (
                <Carousel
                    layout='default'
                    data={arrayImages}
                    renderItem={({ item, index }) => {
                        console.log('item -> ', item);
                        return <View style={{ }}>
                            {/* <Text>{item}</Text> */}
                            <Image style={{ height: 200, width: 200 }}  source={{ uri: item }}></Image>
                            {/* <ParallaxImage
                                itemHeight={200}
                                itemWidth={200}
                                style={{ height: 200, width: 200 }}
                                source={{ uri:'https://images-platform.99static.com/LiwJRny-UrFbwHNA3ULRsPTS85s=/0x8:1181x1189/500x500/top/smart/99designs-contests-attachments/84/84921/attachment_84921982' }}
                                parallaxFactor={0.4}
                            ></ParallaxImage> */}
                        </View>
                    }}
                    windowSize={21}
                    sliderWidth={styles.windoWidth - 100}
                    itemWidth={200}
                    //autoplay={true}
                    hasParallaxImages={true}

                >

                </Carousel>
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


            <ModalPoup visible={Modalvisible} >

                <DateTimePickerModal

                    isVisible={datePicker}
                    mode='date'

                    style={{}}
                    date={new Date(propsItem.date)
                    }
                    onCancel={hideDatePicker}
                    onConfirm={confirmDatePicker}

                >

                </DateTimePickerModal>


                <View style={styles.modal.modalHeader}>
                    <View >
                        <TextInput multiline={true} numberOfLines={2} style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>{propsItem.title}</TextInput>
                    </View>


                </View>

                <View style={{ height: '70%' }}>

                    <TouchableOpacity style={{ backgroundColor: styles.modal.editableColor, borderRadius: 10 }} onPressIn={() => setDatePicker(true)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 20, flex: 1, textAlign: 'center' }}>{propsItem.date}</Text>
                            <Icon name="calendar" type="feather" size={50} color="white" />



                        </View>
                    </TouchableOpacity>


                    <View style={{ marginTop: 10 }}>
                        <TextInput multiline={true} numberOfLines={10} style={styles.modal.editableInput} placeholder='Description' >{propsItem.description}</TextInput>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        {showImages(Array.from(propsItem.img ?? []))}
                        {/* <Image style={{height:100, width:100}} source={{uri:Array.from(propsItem.img ?? '')[0]}}></Image> */}
                    </View>


                </View>

                <View style={{ height: '10%' }}>
                    <View style={{ alignItems: 'center', }}>

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', }}>
                            <Button title='Cancel' onPress={() => setModalVisible(false)} color='black' ></Button>
                            <Button title='Save' onPress={() => {
                                //send data update to firebase
                                //firebase.update( propsItem)
                            }}></Button>
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
    return time < 12 ? hour + ' AM' : hour + ' PM'

}

function getColor(color) {

    switch (color) {
        case 'blue':
            return require('../../assets/circleBlue.png')
        case 'red':
            return require('../../assets/circleRed.png')
        case 'grey':
            return require('../../assets/circleGrey.png')
        case 'purple':
            return require('../../assets/circlePurple.png')
        case 'yellow':
            return require('../../assets/circleYellow.png')
        default:
            break;
    }


}

async function getIcon(propsItem) {

    const response = await getWeather()
    const actualHour = propsItem.hourStart
    const forecast = response.forecast.forecastday
    let icon = ''

    const date = format(new Date(propsItem.date), "dd-MM-yyyy")

    forecast.forEach(day => {

        const dayFormat = format(new Date(day.date), "dd-MM-yyyy")


        if (dayFormat == date) {

            let hourChanged = ''
            day.hour.forEach(hour => {
                hourChanged = hour.time.split(' ', 2)[1]
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