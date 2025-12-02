// src/pages/InstructorSchedule.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InstructorSchedule.module.css';

// 캘린더 날짜/요일 관련 더미 데이터 (주간 뷰 기준)
const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
const mockLessons = [
    // { day: 1 (월), time: '14:00', duration: 60, title: 'PT: 이지은 회원', status: 'full' },
    { day: 2, time: '18:30', duration: 90, title: '필라테스: 박보검 회원', status: 'full' },
    { day: 4, time: '11:00', duration: 60, title: 'PT: 김유정 회원', status: 'full' },
    { day: 6, time: '10:00', duration: 60, title: 'PT: 이종석 회원', status: 'full' },
    { day: 6, time: '15:00', duration: 30, title: '예약 가능 (30분)', status: 'empty' },
];

// 임시 시간 슬롯 생성
const timeSlots = [];
for (let h = 9; h < 20; h++) { // 오전 8시부터 저녁 9시 30분까지
    timeSlots.push(`${h.toString().padStart(2, '0')}:00`);
    timeSlots.push(`${h.toString().padStart(2, '0')}:30`);
}

const InstructorSchedule = () => {
    const navigate = useNavigate();
    const [currentPeriod, setCurrentPeriod] = useState('2025년 12월 1일 - 12월 7일'); // 현재 주간

    const handleGoBack = () => {
        navigate('/instructor/dashboard');
    };

    const handleSlotClick = (dayIndex, time) => {
        alert(`레슨 추가/수정: ${weekDays[dayIndex]}요일 ${time}`);
        // 🚨 실제로는 모달(Modal)을 띄워 레슨 정보를 입력받습니다.
    };

    // 요일별 시간 슬롯 렌더링
    const renderTimeSlots = () => {
        const slots = [];
        for (let i = 0; i < timeSlots.length; i++) {
            const time = timeSlots[i];  
            // 7일(0~6) X 1시간표
            for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
                const isLesson = mockLessons.find(lesson => 
                    lesson.day === dayIndex && lesson.time === time
                );

                slots.push(
                    <div 
                        key={`${dayIndex}-${time}`} 
                        className={styles.timeSlot}
                        onClick={() => handleSlotClick(dayIndex, time)}
                    >
                        {isLesson && (
                            <div className={`${styles.lessonEvent} ${isLesson.status === 'full' ? styles.full : ''}`}>
                                {isLesson.title}
                            </div>
                        )}
                    </div>
                );
            }
        }
        return slots;
    };

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
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">&lt; 이전</button>
                <span className={styles.currentPeriod}>{currentPeriod}</span>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">다음&gt;</button>
            </div>

            <div className={styles.calendarView}>
                
                {/* 1. 요일 헤더 */}
                {/* 💥💥 DayHeader 수정: 첫 번째 셀은 비워둡니다. 💥💥 */}
                <div className={styles.dayHeader}>
                    <div className={styles.dayName}></div> {/* 시간 레이블 공간 확보 */}
                    {weekDays.map((day, index) => (
                        <span key={index} className={styles.dayName}>{day}</span>
                    ))}
                </div>

                {/* 2. 시간표 영역 */}
                {/* 💥💥 WeekContainer 수정: Grid 컨테이너가 전체를 담당 💥💥 */}
                <div className={styles.weekContainer}>
                    {timeSlots.map((time, index) => (
                        <React.Fragment key={index}>
                            {/* 💥 1열: 시간 레이블 💥 */}
                            <div className={styles.timeLabelSlot}>
                                {index % 2 === 0 ? time : ''} {/* 정시만 레이블 표시 */}
                            </div>

                            {/* 💥 2~8열: 요일별 시간 슬롯 💥 */}
                            {weekDays.map((_, dayIndex) => (
                                <div 
                                    key={dayIndex} 
                                    className={styles.timeSlot}
                                    onClick={() => handleSlotClick(dayIndex, time)}
                                >
                                    {/* 레슨 이벤트 배치 로직은 유지 */}
                                    {mockLessons
                                        .filter(lesson => 
                                            lesson.day === dayIndex && lesson.time === time
                                        )
                                        .map(lesson => (
                                            <div 
                                                key={lesson.id} 
                                                className={`${styles.lessonEvent} ${lesson.status === 'full' ? styles.full : ''}`}
                                                style={{height: `${lesson.duration / 30 * 50}px`}} // 30분 단위 높이 계산
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

                <p className="text-sm text-gray-500 mt-4">
                    * 시간을 클릭하면 레슨을 등록하거나 수정할 수 있습니다.
                </p>
            </div>
        </div>
    );
};

export default InstructorSchedule;