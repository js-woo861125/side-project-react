// src/pages/Settings.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StudentSettings.module.css';

const StudentSettings = () => {
    const navigate = useNavigate();
    
    // 더미 사용자 데이터 및 상태 관리
    const [userData, setUserData] = useState({
        name: '홍길동',
        phone: '010-1234-5678',
        email: 'hong.gildong@example.com',
    });

    // const [paymentData, setPaymentData] = useState({
    //     plan: '클래스 관리 종량제',
    //     nextBillingDate: '2025년 12월 28일',
    //     paymentMethod: '신용카드 (VISA, ****-1234)',
    // });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        // 🚨 실제 API 호출 로직이 들어갈 자리입니다.
        alert('정보가 저장되었습니다. (API 호출 대기)');
    };

    const handleLogout = () => {
        // 🚨 실제 로그아웃 및 토큰 삭제 로직이 들어갈 자리입니다.
        if (window.confirm("정말로 로그아웃 하시겠습니까?")) {
            navigate('/login');
        }
    };

    const handleGoBack = () => {
        navigate('/student/dashboard');
    };

    return (
        <div className={styles.container}>
            
            <div className={styles.header}>
                <h1 className={styles.title}>⚙️ 정보 관리</h1>
                <button 
                    onClick={handleGoBack} 
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                    &larr; 대시보드
                </button>
            </div>

            <div className={styles.mainContent}>
                
                {/* 1. 회원 정보 수정 섹션 */}
                <h2 className={styles.sectionTitle}>회원 기본 정보</h2>
                <form onSubmit={handleSaveChanges}>
                    
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="name">이름</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={userData.name} 
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
                            value={userData.phone} 
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
                    
                    <button type="submit" className={styles.saveButton}>
                        정보 저장
                    </button>
                </form>

                <hr className="my-8 border-gray-200" />
                
                {/* 2. 결제 및 구독 정보 섹션 */}
                {/* <h2 className={styles.sectionTitle}>결제 및 구독 정보</h2>
                
                <div className={styles.paymentCard}>
                    <p className="text-sm font-semibold text-gray-600 mb-1">현재 요금제:</p>
                    <p className="text-lg font-bold text-blue-700 mb-3">{paymentData.plan}</p>
                    
                    <p className="text-sm font-semibold text-gray-600 mb-1">다음 결제일:</p>
                    <p className="text-base text-gray-800 mb-3">{paymentData.nextBillingDate}</p>

                    <p className="text-sm font-semibold text-gray-600 mb-1">결제 수단:</p>
                    <p className="text-base text-gray-800 mb-3">{paymentData.paymentMethod}</p>

                    <button className="text-blue-500 font-medium hover:underline mt-2">
                        결제 수단 변경
                    </button>
                </div> */}

                <div className="text-center">
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        로그아웃
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentSettings;