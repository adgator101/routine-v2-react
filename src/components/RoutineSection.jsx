import React from 'react'
import DateButton from './DateButton'
import RoutineCard from './RoutineCard'
import RoutineData from '../../class-routine.json'
import { getTodayDay } from '@/lib/utils'

const RoutineSection = () => {
    const [todayRoutine, setTodayRoutine] = React.useState([])
    const [selectedDay, setSelectedDay] = React.useState('')
    const [userGroup, setUserGroup] = React.useState('')
    
  
    React.useEffect(() => {
      const dayName = getTodayDay()
      handleSelect(dayName)
      const groupNumber = localStorage.getItem('user')
      setUserGroup(groupNumber);
      setTodayRoutine(handleFilterRoutine(dayName, groupNumber))
    }, [])
    
    const handleSelect = (date) => {
      setSelectedDay(date)
      setTodayRoutine(handleFilterRoutine(date, userGroup))
    }
  
    const handleFilterRoutine = (day, group) => {
      return RoutineData.filter((data) => data.Day === day && data.Group.includes(group) );
    }
  return (
    <>
        <DateButton selectedDay={selectedDay} handleSelect={handleSelect} />
        {
        todayRoutine.map((routine, index) => (
            <RoutineCard key={index} data={routine} />
        ))
        }
    </>
  )
}

export default RoutineSection