// src/pages/HeroSection.jsx (수정)

import React from 'react';
import { Link } from 'react-router-dom';
// 💥💥 CSS 모듈을 임포트합니다.
import styles from './HeroSection.module.css'; 

const HeroSection = () => {
    return (
        // 1. 전체 컨테이너에 styles.heroContainer 적용
        <div className={styles.heroContainer}>
            
            <main className={styles.mainContent}>
                {/* 2. 제목에 styles.mainTitle 적용 */}
                <h1 className={styles.mainTitle}>
                    레슨/클래스의 
                    {/* 3. 하이라이트에 styles.highlightText 적용 */}
                    <span className={styles.highlightText}> 모든 것</span>
                </h1>
                
                {/* 4. 부제목에 styles.subText 적용 */}
                <p className={styles.subText}>
                    회원 관리, 스케줄, 레슨 기록
                </p>

                {/* 5. 버튼 그룹에 styles.buttonGroup 적용 */}
                <div className={styles.buttonGroup}>
                    
                    {/* 버튼 스타일은 유지: Tailwind 클래스를 className에 직접 적용 */}
                    <Link
                        to="/login"
                        className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
                    >
                        지금 바로 시작하기
                    </Link>

                    <Link
                        to="/pricing" 
                        className="px-8 py-3 border border-gray-300 bg-white text-gray-800 text-lg font-semibold rounded-lg hover:bg-gray-100 transition shadow-md"
                    >
                        💰 요금 안내 보기
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default HeroSection;