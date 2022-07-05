import { Image, View, Text, Modal, Pressable, Button, TextInput, TouchableHighlight } from 'react-native'
import React, { Children, useEffect, useState } from 'react'
import StyledText from './StyledText'
import { getWeather } from '../api/weatherAPI'
import { format } from "date-fns";
import styles from "../../styles/styles"
import { CheckBox, Icon } from "react-native-elements"



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
    const [visible, setVisible] = useState(false)


    useEffect(() => {
        (async () => {
            const image = await getIcon(propsItem)
            setImageTime(`http:${image}`)
        })()
    }, [])




    return (
        <View>
            {showDate(propsItem.date, propsItem.lastDate)}
            <ModalPoup visible={visible} >
                <View style={styles.modal.modalHeader}>
                    <View >
                        <TextInput style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>pruebs</TextInput>
                    </View>


                </View>

                <View style={{ marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={{ color: 'white' }}>Start time</Text>
                        <Icon name="calendar" type="feather" color="white"></Icon>

                        <Text style={{ color: 'white' }}>End time</Text>
                        <Icon name="calendar" type="feather" color="white"></Icon>

                    </View>

                    <View>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Color</Text>

                    </View>

                    <View>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Description</Text>
                        <TextInput multiline={true} numberOfLines={10} style={{ color: 'white', paddingBottom: 5, paddingStart: 5 }} placeholder='Description' >{propsItem.description}</TextInput>
                    </View>


                </View>

                <View>
                    <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', }}>
                            <Button title='Cancel' onPress={() => setVisible(false)} color='black' ></Button>
                            <Button title='Save' ></Button>
                        </View>
                    </View>

                </View>

            </ModalPoup>
            <Pressable onPress={() => setVisible(true)}>
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