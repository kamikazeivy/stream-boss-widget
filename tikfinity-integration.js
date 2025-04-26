// This file handles the integration logic with Tikfinity. It exports functions to interact with Tikfinity's API and manage data flow between StreamBoss and Tikfinity.

const API_BASE_URL = 'https://api.tikfinity.com'; // Replace with the actual Tikfinity API base URL

// Fetch data from Tikfinity API
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

// Post data to Tikfinity API
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

// WebSocket integration with Tikfinity
export const connectToTikfinityWebSocket = (onMessageCallback) => {
    const websocket = new WebSocket('ws://localhost:21213/'); // Updated to use the provided WebSocket endpoint

    websocket.onopen = () => {
        console.log('Connected to Tikfinity WebSocket');
    };

    websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received data from Tikfinity WebSocket:', data);
        if (onMessageCallback) {
            onMessageCallback(data); // Pass data to the callback function
        }
    };

    websocket.onclose = () => {
        console.warn('Tikfinity WebSocket connection closed. Reconnecting...');
        setTimeout(() => connectToTikfinityWebSocket(onMessageCallback), 1000); // Reconnect after 1 second
    };

    websocket.onerror = (error) => {
        console.error('Error with Tikfinity WebSocket:', error);
    };

    return websocket;
};