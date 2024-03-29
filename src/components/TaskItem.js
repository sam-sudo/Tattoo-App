import { Image, View, Text, Pressable, TouchableOpacity, Animated, Alert } from 'react-native'
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
        propsItem.title.trim(),
        propsItem.description.trim(),
        propsItem.date,
        propsItem.hourStart,
        propsItem.hourEnd,
        propsItem.position.trim(),
        propsItem.img,
        propsItem.color.trim())


    const [imageTime, setImageTime] = useState(null)
    const [Modalvisible, setModalVisible] = useState(false)


    useEffect(() => {
        (async () => {
            const image = await getIcon(propsItemObject)
            setImageTime(`http:${image}`)
        })()
    }, [])




    const state = {
        startValue: new Animated.Value(0),
        endValue: -100,
        duration: 250
    }

    const startAnimation =  () => {
        


        Animated.timing(state.startValue, {
            toValue: state.endValue,
            duration: state.duration,
            useNativeDriver: true,
        }).start(() => { 
            endAnimation()
         })


    }

    const endAnimation = () => {
        Animated.timing(state.startValue, {
            toValue: state.startValue,
            duration: state.duration,
            useNativeDriver: true,
        }).start();
    }

    const aniamtedStyle = {
        transform: [
            {
                translateX: state.startValue
            }
        ]
    }




    const deleteButon = [
        <Animated.View style={[{ flex:1},[aniamtedStyle]]}>
            <TouchableOpacity style={styles.swipeList.rowBackDelete}>
                <Pressable

                    style={[styles.swipeList.deleteButon]}
                    onPressIn={() => {
                        Alert.alert('Are you sure to delete this?','You will not be able to recover this task ever again!',[
                            
                              {
                                text: "No",
                              },
                              {
                                    
                                text: "Yes",
                                onPress: () => {
                                  deleteTask(propsItemObject.id).then(() =>{
                                      console.log('deleted!!!');
                                      
                                      getSupabaseTasks().then((values) => {
                                          propsItem.setSupabaseItems(values)
                                      })
                                  }).catch(() => {
                                      console.log('error deleting!!!');
                                  })
                                },
                              }
                        ])
                    }}>
                    <Icon name="trash" type="feather"></Icon>

                </Pressable>
            </TouchableOpacity>
        </Animated.View>
    ];





    return (
        <View style={{}}>
            
            {showDate(propsItemObject.date, propsItem.lastDate)}



            <ItemModal setSupabaseItems={propsItemObject.setSupabaseItems} propsItemObject={propsItemObject} visible={Modalvisible} setModalVisible={setModalVisible} ></ItemModal>


            <Swipeable
                
                

                rightButtonWidth={100}
                
                
                onLeftButtonsOpenRelease={() => {
                    endAnimation()
                }}
                
                
                rightButtons={deleteButon}>
                <Animated.View style={[aniamtedStyle]}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flex: 1 }}>
                            <Pressable style={{ marginEnd: 10, height: 100, marginBottom: 5 }} onPress={() => setModalVisible(true)}>
                                <View key={propsItemObject.id} style={{ flexDirection: 'row', borderColor: 'grey', borderRadius: 10, borderWidth: 0, padding: 10, alignItems: 'flex-start' }}>
                                    <Image style={{ width: 15, height: 15 }} source={getColor(propsItemObject.color)}></Image>

                                    <View style={{ flexDirection: 'column', flex: 1, }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <StyledText alignCenter > {getHour(propsItemObject.hourStart)} - {getHour(propsItemObject.hourEnd)}</StyledText>
                                        </View>
                                        <View >
                                            <StyledText bold black numberOfLines={2}> {propsItemObject.title ?? 'Title'}</StyledText>
                                            <Text numberOfLines={2} > {propsItemObject.description ?? 'Description'}</Text>

                                        </View>


                                    </View>
                                    <Image style={{ width: 30, height: 30, }} source={{ uri: imageTime }} ></Image>


                                </View>

                            </Pressable>
                        </View>
                        <Pressable onPressIn={() => {

                            startAnimation()
                            // setTimeout(() => {
                            //     startAnimation()
                            // }, 500);
                        }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, }}>

                                <Icon size={20} name='chevron-left' type='feather' ></Icon>
                            </View>
                        </Pressable>
                    </View>
                </Animated.View>

            </Swipeable>

        </View >
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
    const actualHour = propsItem.hourStart?.split(':')[0]
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



    const actualDate = date == null ? null : new Date(date)
    const lastDayFormatted = new Date(lastDate)

    

    const day = actualDate?.getDate()
    const lastDay = lastDayFormatted.getDate()
    const month = (actualDate?.getMonth() + 1)
    const lastMonth = lastDayFormatted.getMonth() + 1
    const year = actualDate?.getFullYear()

    // console.log('day ->',day);
    // console.log('month ->',month);
    // console.log('lastDay ->',lastDay);
    // console.log('lastMonth ->',lastMonth);

    if (day !== lastDay || month !== lastMonth) {
        //console.log('trueee----');
        
        return <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10, alignItems: 'center', paddingStart: 5, borderBottomWidth: 0.2, width: '20%' }}>
            <StyledText padding5 bold small >
                
                {day ?? '--'}/{month ?? '--'}/{year ?? '----'}

            </StyledText>
            <Icon style={{ alignContent: 'center' }} size={13} name="calendar" type="feather" color="grey"></Icon>
        </View>
    }
    

    return null

}

export default TaskItem