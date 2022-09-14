import React, { useEffect, useMemo, useState, } from 'react'
import { View, Text, TouchableOpacity, FlatList, Animated, BackHandler } from "react-native";
import tasks from '../data/tasks';
import styles from '../../styles/styles';
import { Agenda, Calendar } from 'react-native-calendars'
import { format } from 'date-fns';
import StyledText from './StyledText'




const TaskCalendar = () => {


    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState({});
    const [markedDates, setMarked] = useState({});

    const memoiezMarkDates = useMemo(() =>{
        console.log('render ----');
        return markedDates
    },[markedDates])
    const memoiezItems = useMemo(() =>items,[items])


    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    useEffect(() => {
        marketDates()
        const timeOut = setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        return () => {
            clearTimeout(timeOut)
        }
    }, [])





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
        let t0 = performance.now()
        let dateTempDay = formatDate(day.dateString.trim())
        const firstObjectTEMP = {}
        const newItems = [];
        let objectTemp = {}
        tasks.forEach((key) => {
            let dateTemp = formatDate(key.date.trim())
            
            if (dateTempDay == dateTemp) {
                objectTemp = {
                    id: key.id,
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
        let t1 = performance.now()
        // console.log('day -> ', dateTempDay);
        // console.log('time -> ', (t1-t0));
        // console.log('items -> ', firstObjectTEMP);

    };

    //{"2022-06-24":  [{ "2022-06-24": {"name": "task-3", },},], }


    const renderDay = item => {
        //console.log('items day -> ', items);

        return (
            <View key={item.id}>
                <TouchableOpacity style={styles.calendar.itemContainer}>

                    <StyledText big black bold>{item.title}</StyledText>
                    <Text>{item.description}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const WaitingComponent = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 50, color: 'black', opacity: 0.1 }}>Loading...</Text>
            </View >
        )
    }




    return  (
        <View style={styles.calendar.container}>

            <Agenda
                //keyExtractor={item}
                items={memoiezItems}
                onDayPress={loadItems}
                scrollEventThrottle={1} // <-- Use 1 here to make sure no events are ever missed
                renderEmptyData={() => {
                    return (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 50, color: 'black', opacity: 0.1 }}>NO TASK</Text>
                        </View>
                    )
                }}
                renderItem={(item) => renderDay(item)}
                
                hideExtraDays={false}
                pastScrollRange={20}
                
                futureScrollRange={20}
                key={(item) => item.id}
                markedDates={memoiezMarkDates}
                collapsable={true}
                
               
                maxToRenderPerBatch={5}
                initialNumToRender={5}
                updateCellsBatchingPeriod={30}
                windowSize={21}
                hideKnob={false}
                showClosingKnob={true}
                //onRefresh={() => items}
                showOnlySelectedDayItems={true}

                markingType={'multi-dot'}


            />
            
        </View>
    )



}


export default TaskCalendar