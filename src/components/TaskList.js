import React, { useState, useEffect } from 'react'
import styles from '../../styles/styles.js'
import { Text, View, Image, FlatList } from 'react-native'
import tasks from '../data/tasks'
import { getWeather } from '../api/weatherAPI'
import TaskItem from './TaskItem'
import { format } from 'date-fns'



async function getTodayIcon() {
    const response = await getWeather()
    const icon = response.current.condition.icon
    return icon
}

async function getToday() {
    const response = await getWeather()
    let day = response.location.localtime.split(' ', 1)
    day = format(new Date(day), "dd/MM/yyyy")
    return day
}

function sortDates(ascent, tasks) {
    if (ascent) {
        return tasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
    return tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}








const TaskList = () => {

    const [imageTime, setImageTime] = useState(null)
    const [today, setToday] = useState(null)
    const [ascent, setAscent] = useState(false)


    const sorted_dates = sortDates(ascent, tasks)


    useEffect(() => {
        (async () => {
            const image = await getTodayIcon()
            setImageTime(`http:${image}`)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const today = await getToday()
            setToday(today)
        })()
    }, [])


    return (
        <View style={styles.styles.container}>

            <View style={styles.styles.listView}>
                <Text style={styles.styles.listTile}>TODAY - {today}</Text>
                <Image style={{ width: 40, height: 40, }} source={{ uri: imageTime }} ></Image>
            </View>
            <FlatList
                data={sorted_dates}
                style={{}}

                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <Text >  </Text>}
                renderItem={({ item: task, index }) => (
                    <TaskItem
                        {...task}
                        lastDate={tasks[index - 1]?.date ?? 0}
                    ></TaskItem>
                )}>

            </FlatList>

        </View>

    )
}

export default TaskList