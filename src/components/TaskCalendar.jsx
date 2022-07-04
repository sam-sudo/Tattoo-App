import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, TouchableOpacity, FlatList } from "react-native";
import tasks from '../data/tasks';
import EventCalendar from 'react-native-events-calendar'
import styles from '../../styles/styles';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { format } from 'date-fns';
import StyledText from '../components/StyledText'



const TaskCalendar = () => {

    const [items, setItems] = useState({});
    const [marked2, setMarked] = useState({});

    useEffect(() => marketDates(), [])

    const items_list = {
        '2022-05-22': [{ name: 'item 1 - any js object' }],
        '2022-05-23': [{ name: 'item 2 - any js object', height: 80 }],
        '2022-05-21': [{ name: 'item 2 - any js object', height: 80 }],
        '2022-05-10': [{ name: 'item 2 - any js object', height: 80 }],
        '2022-05-12': [],
        '2022-05-25': [{ name: 'item 3 - any js object' }, { name: 'any js object laklkaldkalkdlñkadlñkalskdjlakjdlñkajldkaldkjalksdjlñakjdlñkajdlñkasdjlñjalñkdjñ' }, { name: 'any js object' }, { name: 'any js object' }, { name: 'any js object' }, { name: 'any js object' }, { name: 'any js object' }]
    }



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
        tasks.forEach(element => {
            let dateTemp = formatDate(element.date)
            console.log('date --> ', dateTemp);
            tempObject[dateTemp] = { marked: true }
        })
        setMarked(tempObject)


    }

    const loadItems = (day) => {
        console.log('----------------- load items ---------------');
        setTimeout(() => {
            let dateTempDay = formatDate(day.dateString.trim())
            const firstObjectTEMP = {}
            const newItems = [];
            let objectTemp = {}
            tasks.forEach((key) => {
                let dateTemp = formatDate(key.date.trim())

                if (dateTempDay == dateTemp) {
                    console.log('dentro ----------------', key.date);
                    objectTemp = { title: key.title, description: key.description, color: key.color }
                    newItems.push(objectTemp)
                }
            });
            firstObjectTEMP[dateTempDay] = newItems
            newItems.length !== 0 ? setItems(firstObjectTEMP) : null
            console.log('is empty ? ->> ', Object.keys(firstObjectTEMP).length);
            console.log('items ---> ', firstObjectTEMP);
        }, 1000);
    };

    //{"2022-06-24":  [{ "2022-06-24": {"name": "task-3", },},], }


    const renderDay = (item) => {
        return <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
            <View
                style={{
                    padding: 10,
                    backgroundColor: item.color ?? 'white',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}>
                {console.log('item new -------> ', item)}
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
                    console.log('day pressed');
                }}
                onDayChange={day => {
                    console.log('day changed');
                }}
                
                
                renderEmptyData={() => {
                    return (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 50, color: 'black', opacity: 0.1 }}>NO TASK</Text>
                        </View>
                    )
                }}
                renderItem={renderDay}

                markedDates={marked2}

                // Hide knob button. Default = false
                hideKnob={false}
                // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
                showClosingKnob={true}

                onRefresh={() => { }}




            />
        </View>
    )





}


export default TaskCalendar