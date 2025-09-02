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
    Textarea,
    useToast,
    Spinner,
} from '@chakra-ui/react';
import axios from 'axios';

function AddAchievement({ isOpen, onClose }) {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        date: '',
        description: '',
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
            const response = await axiosInstance.post('/api/achievements', formData);
            toast({
                title: response.data.message || 'Achievement added successfully!',
                status: 'success',
                position: 'top',
                duration: 5000,
                isClosable: true,
            });
            setFormData({
                title: '',
                category: '',
                date: '',
                description: '',
            });
            setLoading(false);
            onClose();
        } catch (error) {
            toast({
                title: error.response?.data?.message || 'Failed to add achievement.',
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
                    <ModalHeader>Add Achievement</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            mt={3}
                            mb={3}
                            type='text'
                            required
                            placeholder='Achievement Title'
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <Input
                            mt={3}
                            mb={3}
                            type='text'
                            required
                            placeholder='Category (e.g., Frontend, Soft Skills)'
                            name='category'
                            value={formData.category}
                            onChange={handleChange}
                        />
                        <Input
                            mt={3}
                            mb={3}
                            type='date'
                            required
                            placeholder='Date Achieved'
                            name='date'
                            value={formData.date}
                            onChange={handleChange}
                        />
                        <Textarea
                            mt={3}
                            mb={3}
                            placeholder='Description'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='solid' color="white" bg='darkcyan' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='outline' type="submit">
                            {loading ? <Spinner color='green' /> : 'Add Achievement'}
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}

export default AddAchievement;
