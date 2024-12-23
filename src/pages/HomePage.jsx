import NavBar from '@/components/NavBar'
import React from 'react'
import TodoSection from '@/components/TodoSection'
import AboutPage from '@/components/AboutPage'
import RoutineSection from '@/components/RoutineSection'

const HomePage = () => {
  const [activeItem, setActiveItem] = React.useState("routine");

  return (
    <div>
      <NavBar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="p-4">
        {
          activeItem === 'routine' &&
          <RoutineSection />
        }
        {
          activeItem === 'todo' &&
          <TodoSection />
        }
       {
        activeItem === 'about us' &&
        <AboutPage />
       }
      </div>
    </div>
  )
}

export default HomePage