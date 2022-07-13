import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import TaskList from '../components/TaskList'
import TaskCalendar from '../components/TaskCalendar'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "taskList" component = {TaskList} title = "Tasks" initial = {true} />
         <Scene key = "calendar" component = {TaskCalendar} title = "Calendar" />
      </Scene>
   </Router>
)
export default Routes