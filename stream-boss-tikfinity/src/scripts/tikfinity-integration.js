// This file handles the integration logic with Tikfinity. It exports functions to interact with Tikfinity's API and manage data flow between StreamBoss and Tikfinity.

const API_BASE_URL = 'https://api.tikfinity.com'; // Replace with the actual Tikfinity API base URL

export const fetchTikfinityData = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data from Tikfinity:', error);
        throw error;
    }
};

export const postTikfinityData = async (endpoint, payload) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error posting data to Tikfinity:', error);
        throw error;
    }
};

// Additional functions for managing Tikfinity integration can be added here.