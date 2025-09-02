import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidenav from '../../components/sidenav/Sidenav';
import './skills.css';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import { FcStatistics } from 'react-icons/fc';
import AddSkill from './modals/AddSkill';
import axios from 'axios';

import totalSkillsIcon from '../../assets/tasks/totalskills.png';
import masteredIcon from '../../assets/tasks/mastered.png';
import inProgressIcon from '../../assets/tasks/inprogress.png';
import droppedIcon from '../../assets/tasks/dropped.png';

function Skills() {
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [skillsData, setSkillsData] = useState([]);
  const [skillsStats, setSkillsStats] = useState({
    totalSkills: 0,
    masteredSkills: 0,
    inProgressSkills: 0,
    droppedSkills: 0,
  });

  const openAddSkillModal = () => setIsAddSkillModalOpen(true);
  const closeAddSkillModal = () => setIsAddSkillModalOpen(false);

  const getSkills = async () => {
    try {
      const response = await axios.get('/api/skills');
      setSkillsData(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const getSkillsStats = async () => {
    try {
      const response = await axios.get('/api/skills-stats');
      setSkillsStats(response.data);
    } catch (error) {
      console.error('Error fetching skill stats:', error);
    }
  };

  useEffect(() => {
    getSkills();
    getSkillsStats();
  }, []);

  return (
    <>
      <AddSkill isOpen={isAddSkillModalOpen} onClose={closeAddSkillModal} />
      <div className='app-main-container'>
        <div className='app-main-left-container'><Sidenav /></div>
        <div className='app-main-right-container'>
          <Navbar />
          <div className='task-status-card-container'>
            <div className='add-task-inner-div'>
              <FcStatistics className='task-stats' />
              <p className='todo-text'>Skills Statistics</p>
            </div>
            <div className='stat-first-row'>
              <div className='stats-container container-bg1'>
                <img className='stats-icon' src={totalSkillsIcon} alt="Total Skills" />
                <div>
                  <p className='stats-num'>{skillsStats.totalSkills}</p>
                  <p className='stats-text'>Total Skills</p>
                </div>
              </div>
              <div className='stats-container container-bg4'>
                <img className='stats-icon' src={masteredIcon} alt="Mastered Skills" />
                <div>
                  <p className='stats-num'>{skillsStats.masteredSkills}</p>
                  <p className='stats-text'>Mastered Skills</p>
                </div>
              </div>
            </div>
            <div className='stat-second-row'>
              <div className='stats-container container-bg2'>
                <img className='stats-icon' src={inProgressIcon} alt="In Progress Skills" />
                <div>
                  <p className='stats-num'>{skillsStats.inProgressSkills}</p>
                  <p className='stats-text'>In Progress</p>
                </div>
              </div>
              <div className='stats-container container-bg3'>
                <img className='stats-icon' src={droppedIcon} alt="Dropped Skills" />
                <div>
                  <p className='stats-num'>{skillsStats.droppedSkills}</p>
                  <p className='stats-text'>Dropped Skills</p>
                </div>
              </div>
            </div>
          </div>

          <div className='table-main-header'>
            <p className='table-header-text'>Skills</p>
            <button className='table-btn' onClick={openAddSkillModal}>
              <IoMdAdd /> Add Skill
            </button>
          </div>

          <TableContainer className='table-main-container'>
            <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>Skill Name</Th>
                  <Th>Category</Th>
                  <Th>Proficiency</Th>
                  <Th>Status</Th>
                  <Th>Acquired Date</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {skillsData.map((skill) => (
                  <Tr key={skill._id}>
                    <Td>{skill.skillName}</Td>
                    <Td>{skill.category}</Td>
                    <Td>{skill.proficiency}</Td>
                    <Td>{skill.status}</Td>
                    <Td>{new Date(skill.acquiredDate).toLocaleDateString()}</Td>
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

export default Skills;
