import React, { useState, useEffect, useMemo } from 'react'
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


    const [arrayImages, setArrayImages] = useState([])


    //const sorted_dates = sortDates(ascent, tasks)
    //const sorted_dates = sortDates(ascent, supabaseItems)

    useEffect(() => {
        getSupabaseTasks().then((values) => {
            setSupabaseItems(values)
        })
    }, [])



    const memoizedSortedDates = useMemo(() => {
        console.log('render -----');
        return sortDates(ascent, supabaseItems)
    }, [supabaseItems, ascent])




    return (
        <View style={styles.styles.container}>


            <ItemModal
                propsItemObject={propsNewItemObject}
                isNewItem={true}
                visible={Modalvisible}
                setModalVisible={setModalVisible}
                setIsRefresh={setIsRefresh}
                setSupabaseItems={setSupabaseItems} >

            </ItemModal>


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
                data={memoizedSortedDates}
                initialNumToRender={12}
                key={item => item.id}
                getItem={(item, index) => item[index]  }
                getItemCount={(data) => memoizedSortedDates.length}
                showsVerticalScrollIndicator={false}
                windowSize={21}
                keyExtractor={item => {

                    return item.id

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
                    // console.log('renderiza el item ',index);
                    var todayDate = format(new Date(), "yyyy-MM-dd")
                    var taskDate = format(new Date(task.date), "yyyy-MM-dd")


                    const regexShowItem = task.date != null && taskDate >= todayDate;
                    const regexShowItemTemp = task.date != null

                    if (regexShowItemTemp)
                        return <TaskItem
                            key={task.id}
                            {...task}
                            lastDate={supabaseItems[index - 1]?.date ?? '0'}
                            setSupabaseItems={setSupabaseItems}
                            isRefresh={isRefresh}
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