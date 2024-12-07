import axios from 'axios';
import { Profile } from '../Contract/Profile';

const API_URL = process.env.REACT_APP_API_URL;

// Function to fetch all profiles and determine the next ID
const getNextId = async (): Promise<number> => {
    const response = await axios.get(`${API_URL}/profiles`);
    const profiles: Profile[] = response.data;

    // Find the maximum ID in the existing profiles and increment by 1
    const maxId = profiles.length > 0 ? Math.max(...profiles.map(profile => profile.id)) : 0;
    return maxId + 1;
};

// Function to create a new profile
export const createProfile = async (profileData: Omit<Profile, 'id'>): Promise<Profile> => {
    const nextId = await getNextId(); // Generate the next ID dynamically
    const profileWithId: Profile = {
        id: nextId,
        ...profileData,
    };
    const response = await axios.post(`${API_URL}/profiles`, profileWithId);
    return response.data;
};

// Fetch all profiles
export const fetchProfiles = async (): Promise<Profile[]> => {
    try {
        const response = await axios.get(`${API_URL}/profiles`);
        return response.data;
    } catch (error) {
        console.error("Error fetching profiles:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

export const fetchProfileById = async (id: number): Promise<Profile> => {
    const response = await axios.get(`${API_URL}/profiles/${id}`);
    return response.data;
};

// Update profile by ID
export const updateProfile = async (id: number, updatedData: Partial<Profile>): Promise<Profile> => {
    const response = await axios.put(`${API_URL}/profiles/${id}`, updatedData);
    return response.data;
};

export const deleteProfile = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/profiles/${id}`);
    } catch (error) {
        console.error("Error deleting profile:", error);
        throw error;
    }
};
