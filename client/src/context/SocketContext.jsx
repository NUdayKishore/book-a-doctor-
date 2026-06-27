import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { doctorAPI } from '../api';

const SocketContext = createContext(null);

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const newSocket = io(SOCKET_URL, { transports: ['websocket', 'polling'] });
    setSocket(newSocket);

    const joinRooms = async () => {
      let doctorId = null;
      if (user.role === 'doctor') {
        try {
          const res = await doctorAPI.getMyProfile();
          doctorId = res.data.doctor._id;
        } catch {
          /* profile may not exist yet */
        }
      }
      newSocket.emit('join', {
        userId: user._id,
        role: user.role,
        doctorId,
      });
    };

    newSocket.on('connect', joinRooms);

    const handleNotification = (data, type) => {
      setNotifications((prev) => [
        { id: Date.now(), type, data, read: false, time: new Date() },
        ...prev.slice(0, 19),
      ]);
    };

    newSocket.on('appointment:update', (data) => handleNotification(data, 'update'));
    newSocket.on('appointment:new', (data) => handleNotification(data, 'new'));
    newSocket.on('appointment:statusUpdated', (data) => handleNotification(data, 'status'));
    newSocket.on('appointment:created', (data) => handleNotification(data, 'created'));

    return () => newSocket.disconnect();
  }, [user?._id]);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(() => setNotifications([]), []);

  return (
    <SocketContext.Provider value={{ socket, notifications, markAllRead, clearNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used within SocketProvider');
  return context;
};
