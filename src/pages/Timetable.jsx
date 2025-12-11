// src/pages/Timetable.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Timetable.module.css';

// 주간 요일 목록
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

// 시간표 렌더링 범위 (09시부터 21시까지)
const hours = Array.from({ length: 13 }, (_, i) => i + 9); // 9, 10, ..., 21

// 더미 데이터: 실제로는 API에서 해당 주간의 레슨을 불러와야 합니다.
const currentWeekLessons = [
    // 월요일 14:00 - 15:30 (90분)
    { id: 101, day: 1, startHour: 14, duration: 90, name: 'PT 하체 집중', instructor: '김철수' }, 
    // 수요일 19:30 - 20:30 (60분)
    { id: 102, day: 3, startHour: 19, startMinute: 30, duration: 60, name: '필라테스 리포머', instructor: '이영희' }, 
    // 금요일 10:00 - 11:00 (60분)
    { id: 103, day: 5, startHour: 10, duration: 60, name: '미술 개인 레슨', instructor: '박민정' },
];

// 현재 주의 시작 날짜를 구하는 함수 (일요일 기준)
const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const diff = d.getDate() - day; 
    return new Date(d.setDate(diff));
};

// 날짜를 'YYYY.MM.DD' 형식으로 포맷하는 함수
const formatDate = (date) => {
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/ /g, '').slice(0, -1);
};


const Timetable = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleGoBack = () => {
        navigate('/student/dashboard');
    };

    const weekStart = getWeekStart(currentDate);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const weekDates = daysOfWeek.map((_, index) => {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + index);
        return date;
    });

    const goToNextWeek = () => {
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(currentDate.getDate() + 7);
        setCurrentDate(nextWeek);
    };

    const goToPrevWeek = () => {
        const prevWeek = new Date(currentDate);
        prevWeek.setDate(currentDate.getDate() - 7);
        setCurrentDate(prevWeek);
    };


    return (
        <div className={styles.container}>
            
            <div className={styles.header}>
                <h1 className={styles.title}>📅 클래스 시간표</h1>
                <button 
                    onClick={handleGoBack} 
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                    &larr; 대시보드
                </button>
            </div>

            <div className={styles.calendarContainer}>
                {/* 주간 네비게이션 */}
                <div className={styles.weekNav}>
                    <button onClick={goToPrevWeek} className="p-2 text-xl font-bold text-gray-600 hover:text-blue-600">&lt;</button>
                    <span className={styles.weekRange}>
                        {formatDate(weekStart)} ~ {formatDate(weekEnd)}
                    </span>
                    <button onClick={goToNextWeek} className="p-2 text-xl font-bold text-gray-600 hover:text-blue-600">&gt;</button>
                </div>

                {/* 캘린더 그리드 */}
                <div className={styles.calendarGrid}>
                    
                    {/* 1. 요일 헤더 영역 (첫 번째 셀은 비움) */}
                    <div className={styles.dayHeader}></div> 
                    {daysOfWeek.map((day, index) => (
                        <div key={index} className={styles.dayHeader}>
                            {day}<br/>
                            <span className="text-gray-400 font-normal">{weekDates[index].getDate()}일</span>
                        </div>
                    ))}
                    
                    {/* 2. 시간표 셀 영역 */}
                    {hours.map(hour => (
                        <React.Fragment key={hour}>
                            {/* 시간 레이블 (예: 09:00) */}
                            <div className={styles.timeLabel}>
                                {hour.toString().padStart(2, '0')}:00
                            </div>

                            {/* 요일별 시간 슬롯 */}
                            {daysOfWeek.map((_, dayIndex) => (
                                <div key={dayIndex} className={styles.timeSlot}>
                                    
                                    {/* 해당 시간 슬롯에 레슨 이벤트 배치 */}
                                    {currentWeekLessons
                                        .filter(lesson => 
                                            lesson.day === dayIndex && 
                                            lesson.startHour === hour
                                        )
                                        .map(lesson => {
                                            const heightPercentage = (lesson.duration / 60) * 100; // 60분 레슨이면 100%
                                            const topPercentage = lesson.startMinute ? (lesson.startMinute / 60) * 100 : 0; // 30분 시작이면 50%

                                            return (
                                                <div 
                                                    key={lesson.id}
                                                    className={styles.lessonEvent}
                                                    style={{ 
                                                        height: `${heightPercentage}%`,
                                                        top: `${topPercentage}%`,
                                                        backgroundColor: lesson.day % 2 === 0 ? '#10b981' : '#3b82f6', // 색상 구분
                                                    }}
                                                    onClick={() => alert(`레슨 상세 보기: ${lesson.name}`)}
                                                >
                                                    <p className="font-bold">{lesson.name}</p>
                                                    <p className="text-xs mt-0.5">({lesson.instructor})</p>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>

                <div className="p-4 text-sm text-gray-500 border-t border-gray-200">
                    * 레슨 상세 정보는 레슨 블록을 클릭하여 확인할 수 있습니다.
                </div>
            </div>
        </div>
    );
};

export default Timetable;