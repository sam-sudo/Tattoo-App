import React, { createRef, useEffect, useState } from 'react'
import { View, Text, Pressable, TouchableOpacity, FlatList } from "react-native";
import tasks from '../data/tasks';
import EventCalendar from 'react-native-events-calendar'
import styles from '../../styles/styles';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { format } from 'date-fns';
import StyledText from './StyledText'



const TaskCalendar = () => {

    const [items, setItems] = useState({});
    const [markedDates, setMarked] = useState({});
    const [lastDay, setLastDay] = useState('')

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


    const renderDay = (item) => {
        return <TouchableOpacity style={{ marginRight: 10, marginTop: 17, marginBottom: 10 }}>
            <View
                style={{
                    padding: 10,
                    backgroundColor: 'white',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}>
                <StyledText big black bold>{item.title}</StyledText>
                <Text>{item.description}</Text>
            </View>
        </TouchableOpacity>
    }





    return (
        <View style={styles.calendar.container}>

            <Agenda
                items={items}

                //loadItemsForMonth={{}}
                onDayPress={day => {
                    loadItems(day)
                    const dotsDefault = { key: 'dotDefault', color: '#5ACEF9' };
                    const dotsSelected = { key: 'dotDefault2', color: 'red', };
                    // console.log('last day -> ', lastDay);
                    // console.log('items ->', items);
                    //lastDay != '' ? markedDates[lastDay] = { dots: [dotsDefault] } : ''

                   // markedDates[day.dateString] != null ? markedDates[day.dateString] = { dots: [dotsSelected] } : null

                    setLastDay(day.dateString)
                    console.log('day pressed');
                }}

                onDayChange={() => {
                    console.log('day changed -> ');
                }}
                


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

                onRefresh={() => { }}

                markingType={'multi-dot'}

                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={30}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={30}


            />
        </View>
    )





}


export default TaskCalendar