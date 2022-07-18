import React, {  useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import tasks from '../data/tasks';
import styles from '../../styles/styles';
import { Agenda } from 'react-native-calendars'
import { format } from 'date-fns';
import StyledText from './StyledText'



const TaskCalendar = () => {


    const [items, setItems] = useState({});
    const [markedDates, setMarked] = useState({});

    useEffect(() => marketDates(), [])





    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    };

    const formatDate = (time) => {
        const date = new Date(time)
        return format(date, 'yyyy-MM-dd')
    }



    function marketDates() {
        let tempObject = {}

        const taskPerDay = {}

        tasks.forEach(element => {
            taskPerDay[element.date] = (taskPerDay[element.date] || 0) + 1
        })


        tasks.forEach(element => {

            let dateTemp = formatDate(element.date)
            const dotsDefault = { key: 'dotDefault', color: '#5ACEF9' };
            const dots = { key: 'dot', color: 'grey' };
            const dots2 = { key: 'dot2', color: 'pink' };
            const dots3 = { key: 'dot3', color: 'brown' };
            if (taskPerDay[element.date] == 2) {

                tempObject[dateTemp] = { dots: [dots, dots2], }
            } else if (taskPerDay[element.date] >= 3) {
                tempObject[dateTemp] = { dots: [dots, dots2, dots3], }

            } else {
                tempObject[dateTemp] = { dots: [dotsDefault] }

            }
        })
        setMarked(tempObject)

    }

    const loadItems = (day) => {
        let dateTempDay = formatDate(day.dateString.trim())
        const firstObjectTEMP = {}
        const newItems = [];
        let objectTemp = {}
        tasks.forEach((key) => {
            let dateTemp = formatDate(key.date.trim())

            if (dateTempDay == dateTemp) {
                objectTemp = {
                    title: key.title,
                    description: key.description,
                    color: key.color,
                    done: key.done,
                    hourStart: key.hourStart,
                    hourEnd: key.hourEnd
                }
                newItems.push(objectTemp)
            }
        });
        firstObjectTEMP[dateTempDay] = newItems
        newItems.length !== 0 ? setItems(firstObjectTEMP) : null
    };

    //{"2022-06-24":  [{ "2022-06-24": {"name": "task-3", },},], }


    const renderDay = item => {
        return <TouchableOpacity style={styles.calendar.itemContainer}>

            <StyledText big black bold>{item.title}</StyledText>
            <Text>{item.description}</Text>
        </TouchableOpacity>
    }





    return (
        <View style={styles.calendar.container}>

            <Agenda
                items={items}
                //loadItemsForMonth={{}}
                onDayPress={loadItems}


                
                renderEmptyData={() => {
                    return (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 50, color: 'black', opacity: 0.1 }}>NO TASK</Text>
                        </View>
                    )
                }}
                renderItem={renderDay}
                
                markedDates={markedDates}

                // Hide knob button. Default = false
                hideKnob={false}
                // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
                showClosingKnob={true}

                //onRefresh={() => { }}
                 
                markingType={'multi-dot'}
                
               


            />
        </View>
    )





}


export default TaskCalendar