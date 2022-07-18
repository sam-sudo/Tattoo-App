import React, { useState, useEffect } from 'react'
import styles from '../../styles/styles.js'
import { Text, View, Image, FlatList, Animated } from 'react-native'
import tasks from '../data/tasks'
import TaskItem from './TaskItem'





function sortDates(ascent, tasks) {
    if (ascent) {
        return tasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
    return tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}








const TaskList = () => {

   
    const [ascent, setAscent] = useState(false)


    const sorted_dates = sortDates(ascent, tasks)


    


    return (
        <View style={styles.styles.container}>

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