import React, { useState, useEffect } from 'react'
import styles from '../../styles/styles.js'
import { Text, View, Image, FlatList, Animated } from 'react-native'
import tasks from '../data/tasks'
import TaskItem from './TaskItem'
import { supabase } from '../api/supabaseApi.js'




function sortDates(ascent, tasks) {
    if (ascent) {
        return tasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
    return tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}



async function getSupabaseTasks ()   {
    let {data: tasksSupabase,error} = await supabase
    .from('tasks')
    .select()
    return tasksSupabase

}




const TaskList = () => {

    const [supabaseItems,setSupabaseItems] = useState([])
    const [isRefresh,setIsRefresh] = useState(false)

     useEffect(() => {
        getSupabaseTasks().then((values) => {
            setSupabaseItems(values)
        })
     },[])

   
    const [ascent, setAscent] = useState(false)


    //const sorted_dates = sortDates(ascent, tasks)
    const sorted_dates = sortDates(ascent, supabaseItems)


    


    return (
        <View style={styles.styles.container}>

            <FlatList
                data={sorted_dates}
                style={{}}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                refreshing={isRefresh}
                onRefresh={() =>{
                    setIsRefresh(true)
                    getSupabaseTasks().then((values) => {
                        setSupabaseItems(values)
                    }).finally(() => {
                        setIsRefresh(false)
                    })
                }}
                ItemSeparatorComponent={() => <Text >  </Text>}
                renderItem={({ item: task, index }) => (
                    <TaskItem
                        {...task}
                        lastDate={tasks[index - 1]?.date ?? 0}
                    ></TaskItem>
                )}
                >

            </FlatList>

        </View>

    )
}

export default TaskList