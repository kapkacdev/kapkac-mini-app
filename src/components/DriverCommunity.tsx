import React from 'react'
import { useNavigation } from '../context/NavigationContext'
import Button from './Button'
import { FaArrowLeft } from 'react-icons/fa'
import CrazyDriversProfile from '/crazy-drivers-profile.png'

interface CommunityDetailsProps {
  communityName: string // Pass community name as a prop
}

const CommunityDetails: React.FC<CommunityDetailsProps> = ({
  communityName,
}) => {
  const { navigateTo } = useNavigation()

  // Mock data for community details
  const community = {
    name: communityName,
    photo: CrazyDriversProfile, // Replace with actual photo
    description:
      'This is the Crazy Drivers community. Drive and play to earn KAC tokens! ' +
      'Follow the community page to stay updated on the latest proposals. ' +
      'Join the Telegram channel to chat with other drivers.',
    type: 'Public Driver',
    telegramLink: 'https://t.me/exampleCommunity',
    proposals: [
      { id: 1, text: 'Proposal 1 Summary', link: '#' },
      { id: 2, text: 'Proposal 2 Summary', link: '#' },
    ],
    parameters: {
      MIN_DRIVER_REFERENCE: 2,
      MAX_MEMBERS: 500,
      ACTIVITY_THRESHOLD: 50,
    },
    attendees: 220,
    totalKacToken: '60234220',
  }

  const bank = (
    <div className="relative w-32 h-30 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl p-2 flex flex-col items-center text-center">
      {/* Roof */}
      <div className="absolute top-[-24px] left-[-8px] right-[-8px] h-8 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 shadow-lg rounded-t-full flex justify-center items-center border-b-4 border-yellow-700">
        <div className="text-white font-bold text-sm tracking-wide drop-shadow-md">
          BANK
        </div>
      </div>

      {/* Building Body */}
      <div className="relative z-10 w-full h-full bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg p-4 shadow-inner flex flex-col items-center justify-between">
        {/* Vault Content */}
        <div className="flex flex-col items-center text-white">
          <p className="font-bold text-xs text-yellow-400">TOTAL KAC</p>
          <p className="text-xl font-extrabold text-white">
            {community.totalKacToken}
          </p>
        </div>

        {/* Knob */}
        <div className="relative w-8 h-8 bg-gray-600 rounded-full border-4 border-gray-900 shadow-lg flex items-center justify-center">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Decorative Base */}
      <div className="absolute bottom-[-8px] left-[-4px] right-[-4px] h-4 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg rounded-b-lg"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-900 px-6 pt-10 pb-10">
      {/* Back Button */}
      <Button
        label="Back to Communities"
        size="small"
        variant="secondary"
        iconPosition="left"
        icon={<FaArrowLeft />}
        onClick={() => navigateTo('Communities')}
      />

      {/* Community Card */}
      <div className="bg-gradient-to-b from-[#4D00FF] to-[#200072] rounded-2xl shadow-md p-2 mt-6 mb-8 pb-6">
        <div className="flex items-center justify-between mb-4 gap-4 p-4">
          <div className="p-1">
            <h3 className="text-xl font-bold text-white my-1">
              {community.name}
            </h3>
            <ul className="text-stone-100 text-sm list-disc list-inside space-y-1 p-1">
              <li>{community.type} Community</li>
              <li>{community.attendees} drivers</li>
            </ul>

            <a
              href={community.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 mt-1 inline-block text-left w-full text-sm"
            >
              Join Telegram Channel...
            </a>
          </div>
          {bank}
        </div>

        <div className="relative">
          <img
            src={community.photo}
            alt={community.name}
            className="w-16 h-16 mx-4 rounded-full object-cover border-4 border-stone-800 float-left"
          />
          <p className="text-stone-400 text-sm mx-4">{community.description}</p>
        </div>
      </div>

      {/* Proposals Section */}
      <h3 className="text-2xl text-white mb-4">Proposals</h3>
      <p className="text-stone-400 text-sm mb-2">
        View and vote on community proposals to shape the future of the Crazy
        Drivers. You can make a difference!
      </p>

      <div className="rounded-lg overflow-hidden shadow mb-4">
        <table className="min-w-full bg-gray-800">
          <thead className="overflow-hidden">
            <tr className="bg-gray-700 text-white rounded-t-lg overflow-hidden">
              <th className="px-4 py-2">Proposal</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {community.proposals.map((proposal) => (
              <tr key={proposal.id} className="text-white">
                <td className="px-4 py-2">{proposal.text}</td>
                <td className="px-4 py-2">
                  <Button label="View" size="small" variant="primary" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Community Parameters */}
      <h3 className="text-2xl text-white mt-6 mb-4">Community Parameters</h3>

      <p className="text-stone-400 text-sm">
        The Crazy Drivers community has the following parameters that define its
        operation:
      </p>

      <a
        href="https://t.me/exampleCommunity"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-300 mt-2 inline-block text-right w-full mb-4"
      >
        See parameter definitions...
      </a>

      <div className="bg-gray-700 p-4 rounded-lg">
        {Object.entries(community.parameters).map(([key, value]) => (
          <p key={key} className="text-gray-300">
            <span className="font-bold">{key}</span>: {value}
          </p>
        ))}
      </div>
    </div>
  )
}

export default CommunityDetails
