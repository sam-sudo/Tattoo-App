import { Image, View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import StyledText from './StyledText'
import { getWeather } from '../api/weatherAPI'
import { format } from "date-fns";
import styles from "../../styles/styles"
import { Icon } from "react-native-elements"
import { TaskItemModel } from '../model/TaskItemModel';
import ItemModal from './Modal/ItemModal'
import Swipeable from 'react-native-swipeable';
import { deleteTask, getSupabaseTasks } from '../api/supabaseApi';





const TaskItem = (propsItem) => {


    const propsItemObject = new TaskItemModel(
        propsItem.id,
        propsItem.title,
        propsItem.description,
        propsItem.date,
        propsItem.hourStart,
        propsItem.hourEnd,
        propsItem.position,
        propsItem.img)


    const [imageTime, setImageTime] = useState(null)
    const [Modalvisible, setModalVisible] = useState(false)







    useEffect(() => {
        (async () => {
            const image = await getIcon(propsItem)
            setImageTime(`http:${image}`)
        })()
    }, [])



    const deleteButon = [
        <TouchableOpacity style={styles.swipeList.rowBackDelete}>
            <Pressable
            
            style={[styles.swipeList.deleteButon]}
            onPressIn={() => {
                //console.log('item ->',);
                deleteTask(propsItemObject.id).then(() =>{
                    console.log('deleted!!!');
                    
                    getSupabaseTasks().then((values) => {
                        propsItem.setSupabaseItems(values)
                    })
                }).catch(() => {
                    console.log('erroe deleting!!!');
                })
            }}>
                <Icon name="trash" type="feather"></Icon>
            
        </Pressable>
        </TouchableOpacity>
    ];





    return (
        <View style={{}}>
            {showDate(propsItem.date, propsItem.lastDate)}



            <ItemModal setSupabaseItems={propsItem.setSupabaseItems} propsItemObject={propsItemObject} visible={Modalvisible} setModalVisible={setModalVisible} ></ItemModal>


            <Swipeable
                onRightActionRelease={() => {
                }}

                rightButtonWidth={100}
                rightButtons={deleteButon}>
                <Pressable onPress={() => setModalVisible(true)}>
                    <View key={propsItem.id} style={{ flexDirection: 'row', borderColor: 'grey', borderRadius: 10, borderWidth: 0, padding: 10, alignItems: 'flex-start' }}>
                        <Image style={{ width: 15, height: 15 }} source={getColor(propsItem.color)}></Image>

                        <View style={{ flexDirection: 'column', flex: 1, }}>
                            <View style={{ flexDirection: 'row' }}>
                                <StyledText alignCenter > {getHour(propsItem.hourStart)} - {getHour(propsItem.hourEnd)}</StyledText>
                            </View>
                            <View >
                                <StyledText bold black > {propsItem.title ?? 'Title'}</StyledText>
                                <Text numberOfLines={2} > {propsItem.description ?? 'Description'}</Text>

                            </View>


                        </View>
                        <Image style={{ width: 30, height: 30, }} source={{ uri: imageTime }} ></Image>


                    </View>
                </Pressable>
            </Swipeable>

        </View>
    )
}



//------------------------function------------------------


function getHour(hour) {
    let time = parseInt(hour)
    let hourFormated = hour?.split(':')[0] ?? '--:--'
    let minutesFormated = hour?.split(':')[1] ?? '--:--'
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

                if (hourChanged == actualHour) {

                    icon = hour.condition.icon
                }
            });



        }




    });
    return icon

}




function showDate(date, lastDate) {

    

    const actualDate = date == null ? new Date() : new Date(date)
    const lastDayFormatted = new Date(lastDate)

    console.log('-----actualDate -> ', actualDate.getMonth());
    console.log('lastDayFormatted -> ', actualDate);

    const day = actualDate.getDate()
    const lastDay = lastDayFormatted.getDate()
    const month = (actualDate.getMonth() + 1)
    const lastMonth = lastDayFormatted.getMonth() +1

    if (day !== lastDay || month !== lastMonth) {
        return <View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center', padding: 5 }}>
            <StyledText padding5 bold small style={{}}>
                {actualDate.getDate() ?? '--/'}/{month ?? '--/'}/{actualDate.getFullYear() ?? '----'}

            </StyledText>
            <Icon style={{ alignContent: 'center' }} size={13} name="calendar" type="feather" color="grey"></Icon>
        </View>
    }

    return null

}

export default TaskItem