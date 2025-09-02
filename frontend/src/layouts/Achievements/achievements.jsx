import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidenav from '../../components/sidenav/Sidenav';
import './achievements.css';
import Confetti from 'react-confetti';
import axios from 'axios';
import { IoMdAdd } from 'react-icons/io';
import AddAchievement from './modals/AddAchievement';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

function Achievements() {
  const [isAddAchievementModalOpen, setIsAddAchievementModalOpen] = useState(false);
  const [achievementsData, setAchievementsData] = useState([]);
  const [showConfetti, setShowConfetti] = useState(true);

  const openAddAchievementModal = () => setIsAddAchievementModalOpen(true);
  const closeAddAchievementModal = () => setIsAddAchievementModalOpen(false);

  const getAchievements = async () => {
    try {
      const response = await axios.get('/api/achievements');
      setAchievementsData(response.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  useEffect(() => {
    getAchievements();
  }, []);

  return (
    <>
      <AddAchievement isOpen={isAddAchievementModalOpen} onClose={closeAddAchievementModal} />
      {showConfetti && <Confetti />}
      <div className='app-main-container'>
        <div className='app-main-left-container'><Sidenav /></div>
        <div className='app-main-right-container'>
          <Navbar />
          <div className='table-main-header'>
            <p className='table-header-text'>My Achievements</p>
            <button className='table-btn' onClick={openAddAchievementModal}>
              <IoMdAdd /> Add Achievement
            </button>
          </div>
          <TableContainer className='table-main-container'>
            <Table variant='striped' colorScheme='purple'>
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Date</Th>
                  <Th>Description</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {achievementsData.map((achievement) => (
                  <Tr key={achievement._id}>
                    <Td>{achievement.title}</Td>
                    <Td>{achievement.category}</Td>
                    <Td>{new Date(achievement.date).toLocaleDateString()}</Td>
                    <Td>{achievement.description}</Td>
                    <Td>Button</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default Achievements;
