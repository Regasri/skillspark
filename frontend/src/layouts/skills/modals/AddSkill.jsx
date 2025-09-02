import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Select,
    useToast,
    Spinner,
} from '@chakra-ui/react';
import axios from 'axios';

function AddSkill({ isOpen, onClose }) {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        skillName: '',
        category: '',
        proficiency: '',
        status: 'In Progress',
        acquiredDate: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const token = localStorage.getItem("tm_token");
    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/skills', formData);
            toast({
                title: response.data.message || 'Skill added successfully!',
                status: 'success',
                position: 'top',
                duration: 5000,
                isClosable: true,
            });
            setFormData({
                skillName: '',
                category: '',
                proficiency: '',
                status: 'In Progress',
                acquiredDate: '',
            });
            setLoading(false);
            onClose();
        } catch (error) {
            toast({
                title: error.response?.data?.message || 'Failed to add skill.',
                status: 'error',
                position: 'top',
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit}>
                    <ModalHeader>Add Skill</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            mt={3}
                            mb={3}
                            type='text'
                            required
                            placeholder='Skill Name'
                            name='skillName'
                            value={formData.skillName}
                            onChange={handleChange}
                        />
                        <Input
                            mt={3}
                            mb={3}
                            type='text'
                            required
                            placeholder='Category (e.g., Frontend, Backend)'
                            name='category'
                            value={formData.category}
                            onChange={handleChange}
                        />
                        <Select
                            mt={3}
                            mb={3}
                            name='proficiency'
                            value={formData.proficiency}
                            onChange={handleChange}
                            placeholder='Select Proficiency'
                            required
                        >
                            <option value='Beginner'>Beginner</option>
                            <option value='Intermediate'>Intermediate</option>
                            <option value='Advanced'>Advanced</option>
                        </Select>
                        <Select
                            mt={3}
                            mb={3}
                            name='status'
                            value={formData.status}
                            onChange={handleChange}
                            placeholder='Select Status'
                            required
                        >
                            <option value='In Progress'>In Progress</option>
                            <option value='Mastered'>Mastered</option>
                            <option value='Dropped'>Dropped</option>
                        </Select>
                        <Input
                            mt={3}
                            mb={3}
                            type='date'
                            required
                            placeholder='Acquired Date'
                            name='acquiredDate'
                            value={formData.acquiredDate}
                            onChange={handleChange}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='solid' color="white" bg='darkcyan' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='outline' type="submit">
                            {loading ? <Spinner color='green' /> : 'Add Skill'}
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}

export default AddSkill;
