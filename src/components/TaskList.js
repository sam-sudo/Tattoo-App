import React, { useState, useEffect } from 'react'
import styles from '../../styles/styles.js'
import { Text, View, Image, FlatList, VirtualizedList, Animated, TouchableOpacity } from 'react-native'
import { format } from "date-fns";

import TaskItem from './TaskItem'
import { getSupabaseTasks, listenerTasks, mySubscription, supabase } from '../api/supabaseApi.js'
import { Snackbar } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import ItemModal from './Modal/ItemModal'
import { TaskItemModel } from '../model/TaskItemModel.js'



function sortDates(ascent, tasks) {
    if (ascent) {
        return tasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
    return tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}








const TaskList = () => {

console.log('entra en el componente task');
    const [supabaseItems, setSupabaseItems] = useState([])
    const [isRefresh, setIsRefresh] = useState(false)
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Error, something happened!')

    //modal-----
    const [Modalvisible, setModalVisible] = useState(false)
    const propsNewItemObject = new TaskItemModel()

    const [ascent, setAscent] = useState(false)


    //const sorted_dates = sortDates(ascent, tasks)
    const sorted_dates = sortDates(ascent, supabaseItems)

    useEffect(() => {
        getSupabaseTasks().then((values) => {
            setSupabaseItems(values)
        })
    }, [])








    return (
        <View style={styles.styles.container}>


            <ItemModal setIsRefresh={setIsRefresh} isNewItem={true} propsItemObject={propsNewItemObject} visible={Modalvisible} setModalVisible={setModalVisible} ></ItemModal>


            <Snackbar
                visible={showSnackbar}

                onDismiss={
                    setTimeout(() => {
                        setShowSnackbar(false)
                    }, 3000)
                }


            >
                {errorMessage}
            </Snackbar>

            {supabaseItems.length == 0 ?
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 100 }}>
                    <Text style={{ fontSize: 30, color: 'black', opacity: 0.1 }}>--- NO TASKS ---</Text>
                </View>
                :
                null
            }


            <VirtualizedList
                data={sorted_dates}
                initialNumToRender={10}
                getItem={(item, index) => {
                    return item[index]
                }}
                getItemCount={(data) => sorted_dates.length}

                showsVerticalScrollIndicator={false}
                //key={item => item.id}
                keyExtractor={item => {

                    // return item.id

                }}
                refreshing={isRefresh}

                onRefresh={() => {
                    setIsRefresh(true)
                    getSupabaseTasks().then((values) => {
                        setSupabaseItems(values)
                    }).finally(() => {
                        setIsRefresh(false)
                    })
                }}
                //ItemSeparatorComponent={() => <Text >  </Text>}
                renderItem={({ item: task, index }) => {
                    console.log('renderiza el item ',index);
                    var todayDate = format(new Date(), "yyyy-MM-dd")
                    var taskDate = format(new Date(task.date), "yyyy-MM-dd")


                    const regexShowItem = task.date != null && taskDate >= todayDate;
                    const regexShowItemTemp = task.date != null

                    if (regexShowItemTemp)
                        return <TaskItem
                            {...task}
                            lastDate={supabaseItems[index - 1]?.date ?? '0'}
                            setSupabaseItems={setSupabaseItems}
                        ></TaskItem>
                }}

            >

            </VirtualizedList>

            <TouchableOpacity style={styles.buttons.floatButton} onPressIn={() => {
                setModalVisible(true)
            }}>
                <Icon name='add-circle-sharp' color={styles.colors.mainColor} type='ionicon' size={50} />
            </TouchableOpacity>


        </View>

    )
}




export default TaskList