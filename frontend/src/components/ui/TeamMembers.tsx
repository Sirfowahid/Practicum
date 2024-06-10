import React from 'react'
import photo from '../../assets/home/mehedi.png'
import TeamMemberImgCard from './TeamMemberImgCard'
import Title from './Title'
const TeamMembers = () => {
  return (
    <div className="container mx-auto p-4">
        <Title>About Us</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:mx-12 gap-4">
        <TeamMemberImgCard
          src={photo}
          name="John Doe"
          description="Owner - Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
        <TeamMemberImgCard
          src={photo}
          name="Jane Smith"
          description="Supervisor - Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <TeamMemberImgCard
          src={photo}
          name="Mike Johnson"
          description="Manager - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
      </div>
    </div>
  )
}

export default TeamMembers