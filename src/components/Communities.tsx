import React, { useEffect, useState } from 'react'
import MenuTab from './MenuTab'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigation } from '../context/NavigationContext'

// Define the structure of a Community
interface Community {
  id: number
  name: string
  attendees: number
  totalKacToken: string
  profileVideo: string // Added profile video field
}

// Mock user-attended communities
const attendedCommunities: Community[] = [
  {
    id: 100,
    name: 'Futuristic Drivers',
    attendees: 200,
    totalKacToken: '60234220',
    profileVideo: '/videos/futuristic-drivers.mp4', // MP4 video for Futuristic Drivers
  },
]

const Communities: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([])
  const [animate, setAnimate] = useState<boolean>(false)
  const { navigateTo } = useNavigation()

  useEffect(() => {
    // Simulate fetching data from an API or smart contract
    const fetchCommunities = async () => {
      const data: Community[] = [
        {
          id: 1,
          name: 'Downtown Drivers',
          attendees: 150,
          totalKacToken: '50000322',
          profileVideo: '/videos/downtown-drivers.mp4', // MP4 video for Downtown Drivers
        },
        {
          id: 2,
          name: 'Airport Express',
          attendees: 80,
          totalKacToken: '3770090',
          profileVideo: '/videos/airport-express.mp4', // MP4 video for Airport Express
        },
        {
          id: 3,
          name: 'Night Riders',
          attendees: 60,
          totalKacToken: '20323',
          profileVideo: '/videos/night-riders.mp4', // MP4 video for Night Riders
        },
      ]
      setCommunities(data)
    }

    fetchCommunities()

    setAnimate(true)
    const timer = setTimeout(() => setAnimate(false), 1000) // 1 second duration
    return () => clearTimeout(timer) // Cleanup
  }, [])

  // todo: replace KAC text with KAC token icon everywhere in the code

  return (
    <div className="min-h-screen bg-gray-900 px-4 pt-12">
      {/* Title */}
      <h2
        className="text-5xl font-cartoon text-center text-[#30ddf0] mb-8"
        style={{ textShadow: '2px 2px 8px rgba(0, 229, 255, 0.6)' }}
      >
        Communities
      </h2>

      {/* User-Attended Communities */}
      <h3
        className="text-2xl text-[#f4f442] mb-4"
        style={{ textShadow: '2px 2px 8px rgba(0, 229, 255, 0.6)' }}
      >
        My Communities
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {attendedCommunities.map((community) => (
          <div
            key={community.id}
            className="bg-gradient-to-br from-[#00E5FF] to-[#4D00FF] p-6 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-200 flex items-center"
          >
            {/* Profile Video */}
            <video
              src={community.profileVideo}
              className="w-24 h-24 rounded-full mr-4 object-cover border-4 border-stone-800"
              autoPlay
              loop
              muted
            ></video>
            {/* Community Info */}
            <div>
              <h4 className="text-xl font-bold text-white">{community.name}</h4>
              <p className="text-sm text-gray-300 mt-2">
                Attendees:{' '}
                <span className="text-[#f4f442] font-semibold">
                  {community.attendees}
                </span>
              </p>
              <p className="text-sm text-gray-300">
                Total:{' '}
                <span className="text-[#ee6537]">
                  {community.totalKacToken.toString()} KAC
                </span>
              </p>

              <Button
                label="Community Page"
                size="small"
                variant="primary"
                icon={<FaArrowRight />}
                iconPosition="right"
                onClick={() =>
                  navigateTo('DriverCommunity', {
                    communityName: community.name,
                  })
                }
              />
            </div>
          </div>
        ))}
      </div>

      {/* Communities Table */}
      <h3
        className="text-2xl text-[#f4f442] mb-6"
        style={{ textShadow: '2px 2px 8px rgba(0, 229, 255, 0.6)' }}
      >
        Available Communities
      </h3>
      <div
        className={`overflow-x-auto rounded-xl ${
          animate ? 'animate-slide-hint' : ''
        }`}
      >
        <table className="min-w-full bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 shadow-md rounded-lg">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#4D00FF] text-white">
              <th className="px-4 py-3 text-left text-sm uppercase tracking-wide">
                Community Name
              </th>
              <th className="px-4 py-3 text-left text-sm uppercase tracking-wide">
                Drivers
              </th>
              <th className="px-4 py-3 text-left text-sm uppercase tracking-wide">
                Total
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {communities.map((community) => (
              <tr
                key={community.id}
                className="hover:bg-gray-700 transition-colors duration-200"
              >
                {/* Community Name */}
                <td className="border-t border-gray-700 px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-[#00E5FF]">
                      {community.name}
                    </span>

                    <span className="text-sm text-gray-500">
                      Active Drivers: {community.attendees}
                    </span>
                  </div>
                </td>

                {/* Attendees */}
                <td className="font-medium border-t border-gray-700 px-6 py-4 text-center">
                  <span className="text-[#f4f442] font-medium">
                    {community.attendees}
                  </span>
                </td>

                {/* Total Pool */}
                <td className="border-t border-gray-700 px-6 py-4 text-center">
                  <span className="text-[#ee6537] font-medium">
                    {community.totalKacToken.toString()} KAC
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Menu Tab */}
      <MenuTab />
    </div>
  )
}

export default Communities
