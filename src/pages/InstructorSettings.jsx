// src/pages/InstructorSettings.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/InstructorSettings.module.css';

const InstructorSettings = () => {
    const navigate = useNavigate();
    
    // 더미 강사 데이터 및 상태 관리
    const [instructorData, setInstructorData] = useState({
        name: '김철수',
        phone: '010-9999-8888',
        email: 'kim.cs@example.com',
        // 프로필 정보
        specialty: '필라테스 리포머, 재활 트레이닝',
        experience: '경력 5년 | 국가공인 생활스포츠지도사 2급',
        bio: '회원의 신체 균형과 건강한 라이프스타일을 최우선으로 생각합니다. 섬세하고 정확한 자세 교정 능력을 통해 만족도 높은 레슨을 제공합니다.'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInstructorData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        // 🚨 실제 API 호출 로직이 들어갈 자리입니다.
        alert('강사 정보가 저장되었습니다. (API 호출 대기)');
    };

    const handleLogout = () => {
        if (window.confirm("정말로 로그아웃 하시겠습니까?")) {
            // 실제 로그아웃 및 토큰 삭제 후 로그인 페이지로 이동
            navigate('/login');
        }
    };

    const handleGoBack = () => {
        navigate('/instructor/dashboard');
    };

    return (
        <div className={styles.container}>
            
            <div className={styles.header}>
                <h1 className={styles.title}>⚙️ 강사 정보 관리</h1>
                <button 
                    onClick={handleGoBack} 
                    className={styles.backButton}
                >
                    &larr; 대시보드
                </button>
            </div>

            <div className={styles.mainContent}>
                
                {/* 1. 기본 정보 수정 섹션 */}
                <h2 className={styles.sectionTitle}>기본 계정 정보</h2>
                <form onSubmit={handleSaveChanges}>
                    
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="name">이름</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={instructorData.name} 
                            onChange={handleInputChange} 
                            className={styles.inputField} 
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="phone">연락처</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={instructorData.phone} 
                            onChange={handleInputChange} 
                            className={styles.inputField} 
                        />
                    </div>
                    
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="password">비밀번호 변경</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="새 비밀번호를 입력해 주세요"
                            className={styles.inputField} 
                        />
                    </div>
                    
                    <hr className="my-8 border-gray-200" />

                    {/* 2. 강사 프로필 관리 섹션 */}
                    <h2 className={styles.sectionTitle}>강사 프로필 (회원 공개)</h2>
                    
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="specialty">전문 분야/태그</label>
                        <input 
                            type="text" 
                            id="specialty" 
                            name="specialty" 
                            value={instructorData.specialty} 
                            onChange={handleInputChange} 
                            className={styles.inputField} 
                        />
                        <p className="text-xs text-gray-500 mt-1">예: PT, 재활, 요가, 필라테스 등 (예약 페이지에 노출됩니다)</p>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="experience">경력 및 자격</label>
                        <input 
                            type="text" 
                            id="experience" 
                            name="experience" 
                            value={instructorData.experience} 
                            onChange={handleInputChange} 
                            className={styles.inputField} 
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="bio">자기소개/레슨 철학</label>
                        <textarea
                            id="bio" 
                            name="bio" 
                            value={instructorData.bio} 
                            onChange={handleInputChange} 
                            className={styles.textareaField}
                        />
                    </div>
                    
                    <button type="submit" className={styles.saveButton}>
                        정보 및 프로필 저장
                    </button>
                </form>

                <div className="text-center">
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        로그아웃
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstructorSettings;