import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/InstructorSchedule.module.css';
import api from '../services/api';

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
const timeSlots = [];
for (let h = 9; h < 20; h++) {
    timeSlots.push(`${h.toString().padStart(2, '0')}:00`);
    timeSlots.push(`${h.toString().padStart(2, '0')}:30`);
}

const InstructorSchedule = () => {
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getWeekRange = (date) => {
        const start = new Date(date);
        start.setDate(start.getDate() - start.getDay());
        const end = new Date(start);
        end.setDate(end.getDate() + 6);
        return { start, end };
    };

    const [weekRange, setWeekRange] = useState(getWeekRange(currentDate));

    useEffect(() => {
        const fetchLessons = async () => {
            setLoading(true);
            try {
                const startDate = weekRange.start.toISOString().split('T')[0];
                const endDate = weekRange.end.toISOString().split('T')[0];
                const response = await api.get(`/instructor/schedule?start_date=${startDate}&end_date=${endDate}`);
                setLessons(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                
                setError('스케줄을 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchLessons();
    }, [weekRange]);

    const handleGoBack = () => {
        navigate('/instructor/dashboard');
    };

    const handleSlotClick = (dayIndex, time) => {
        alert(`레슨 추가/수정: ${weekDays[dayIndex]}요일 ${time}`);
        // 🚨 실제로는 모달(Modal)을 띄워 레슨 정보를 입력받습니다.
    };

    const changeWeek = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7 * direction);
        setCurrentDate(newDate);
        setWeekRange(getWeekRange(newDate));
    };

    const currentPeriod = `${weekRange.start.toLocaleDateString()} - ${weekRange.end.toLocaleDateString()}`;

    return (
        <div className={styles.container}>
            
            <div className={styles.header}>
                <h1 className={styles.title}>🗓️ 전체 스케줄 관리</h1>
                <button 
                    onClick={handleGoBack} 
                    className={styles.backButton}
                >
                    &larr; 대시보드
                </button>
            </div>

            {/* 캘린더 컨트롤 */}
            <div className={styles.calendarControls}>
                <button onClick={() => changeWeek(-1)} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">&lt; 이전</button>
                <span className={styles.currentPeriod}>{currentPeriod}</span>
                <button onClick={() => changeWeek(1)} className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">다음&gt;</button>
            </div>

            {loading && <div className={styles.weekContainer}>로딩 중...</div>}
            {error && <div className={styles.weekContainer}>{error}</div>}

            {!loading && !error && (
                <div className={styles.calendarView}>
                    <div className={styles.dayHeader}>
                        <div className={styles.dayName}></div>
                        {weekDays.map((day, index) => (
                            <span key={index} className={styles.dayName}>{day}</span>
                        ))}
                    </div>
                    <div className={styles.weekContainer}>
                        {timeSlots.map((time, index) => (
                            <React.Fragment key={index}>
                                <div className={styles.timeLabelSlot}>
                                    {index % 2 === 0 ? time : ''}
                                </div>
                                {weekDays.map((_, dayIndex) => (
                                    <div 
                                        key={dayIndex} 
                                        className={styles.timeSlot}
                                        onClick={() => handleSlotClick(dayIndex, time)}
                                    >
                                        {lessons
                                            .filter(lesson => 
                                                new Date(lesson.date).getDay() === dayIndex && lesson.time === time
                                            )
                                            .map(lesson => (
                                                <div 
                                                    key={lesson.id} 
                                                    className={`${styles.lessonEvent} ${lesson.status === 'full' ? styles.full : ''}`}
                                                    style={{height: `${lesson.duration / 30 * 50}px`}}
                                                >
                                                    {lesson.title}
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstructorSchedule;