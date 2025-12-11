// src/pages/StudentDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
// 💥 CSS 모듈 임포트
import styles from '../styles/StudentDashboard.module.css';

const StudentDashboard = () => {
    return (
        // 1. 전체 컨테이너 적용
        <div className={styles.dashboardContainer}>
            
            {/* 2. 헤더 적용 */}
            <header className={styles.header}>
                <h1 className={styles.greeting}>
                    👋 OOO 회원님, 환영합니다!
                </h1>
                <p className={styles.subText}>오늘의 클래스를 확인해 보세요.</p>
            </header>

            {/* 3. 메뉴 네비게이션 적용 */}
            <nav className={styles.navSection}>
                <h2 className={styles.navTitle}>
                    클래스 현황 메뉴
                </h2>
                
                {/* 4. 메뉴 그리드 적용 */}
                <div className={styles.menuGrid}>
                    
                    {/* 버튼 스타일은 Tailwind를 유지합니다. */}
                    
                    {/* 1. 시간표/일정 확인 */}
                    <Link 
                        to="/student/timetable"
                        className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition duration-200"
                    >
                        <p className="text-3xl mb-1">📅</p>
                        <p className="font-medium text-gray-700">시간표 확인</p>
                    </Link>

                    {/* 2. 수업/레슨 내역 확인 */}
                    <Link 
                        to="/student/lessons"
                        className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition duration-200"
                    >
                        <p className="text-3xl mb-1">📚</p>
                        <p className="font-medium text-gray-700">프로그램 내역</p>
                    </Link>

                    {/* 3. 진행상황 리포트 */}
                    <Link 
                        to="/student/progress"
                        className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-center transition duration-200"
                    >
                        <p className="text-3xl mb-1">📊</p>
                        <p className="font-medium text-gray-700">진행 상황 리포트</p>
                    </Link>

                    {/* 4. 결제/회원 정보 관리 */}
                    <Link 
                        to="/student/settings"
                        className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition duration-200"
                    >
                        <p className="text-3xl mb-1">⚙️</p>
                        <p className="font-medium text-gray-700">정보 관리</p>
                    </Link>
                </div>
            </nav>

            {/* 5. 오늘의 레슨 섹션 적용 */}
            <div className={styles.todaySection}>
                <h2 className={styles.todayTitle}>오늘의 클래스</h2>
                <div className={styles.noLessonText}>
                    <p>오늘은 예정된 레슨이 없습니다.</p>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;