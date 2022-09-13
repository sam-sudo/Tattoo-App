import React from 'react'
//import '@testing-library/react-native'
import { render, act } from '@testing-library/react-native'
import TaskItem from '../src/components/TaskItem'
import TaskList from '../src/components/TaskList'



test('render TasksItem components', () => {

    const task = {
        id: '0',
        title: 'task-1',
        description: 'description task-1: this is...',
        done: false,
        date: '2022/06/28',
        hourStart: '22:00',
        hourEnd: '23:00',
        grades: '21°',
        position: 'hand',
        icon: '',
        color: 'blue'
    }

    const component = render(<TaskItem {...task}></TaskItem>)

    component.getByText('task-1')
    

})

test('render TasksList components', () => {

    const task = {
        id: '0',
        title: 'task-1',
        description: 'description task-1: this is...',
        done: false,
        date: '2022/06/28',
        hourStart: '22:00',
        hourEnd: '23:00',
        grades: '21°',
        position: 'hand',
        icon: '',
        color: 'blue'
    }

    
    const component = render(<TaskList ></TaskList>)

    component.getByText('--- NO TASKS ---')

})