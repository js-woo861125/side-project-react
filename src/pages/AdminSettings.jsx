// src/pages/AdminSettings.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AdminSettings.module.css';

const AdminSettings = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        minLessonCount: 3, // 최소 레슨 잔여 횟수 알림 기준
        defaultCommission: 30, // 기본 강사 정산 비율 (%)
        allowSameDayBooking: 'yes', // 당일 예약 허용 여부
        centerName: '우리 피트니스 센터', // 센터 이름
    });

    const handleGoBack = () => {
        navigate('/admin/dashboard');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // 🚨 실제 API 호출: 변경된 설정을 서버에 저장
        alert('✅ 시스템 설정이 저장되었습니다:\n' + JSON.stringify(settings, null, 2));
    };

    return (
        <div className={styles.container}>
            
            <div className={styles.header}>
                <h1 className={styles.title}>🛠️ 시스템 설정</h1>
                <button 
                    onClick={handleGoBack} 
                    className={styles.backButton}
                >
                    &larr; 대시보드
                </button>
            </div>

            <div className={styles.mainContent}>
                
                {/* 1. 알림 및 운영 정책 설정 */}
                <div className={styles.settingGroup}>
                    <h2 className={styles.groupTitle}>운영 및 알림 설정</h2>
                    
                    <div className={styles.settingItem}>
                        <label htmlFor="minLessonCount">레슨 잔여 최소 알림 횟수 (회)</label>
                        <input 
                            type="number" 
                            id="minLessonCount"
                            name="minLessonCount"
                            value={settings.minLessonCount}
                            onChange={handleChange}
                            className={styles.inputField}
                            min="1"
                        />
                        <p className={styles.inputDescription}>
                            회원 잔여 횟수가 이 값 이하가 되면 관리자와 강사에게 알림이 전송됩니다.
                        </p>
                    </div>

                    <div className={styles.settingItem}>
                        <label htmlFor="allowSameDayBooking">회원 당일 예약 허용</label>
                        <select 
                            id="allowSameDayBooking"
                            name="allowSameDayBooking"
                            value={settings.allowSameDayBooking}
                            onChange={handleChange}
                            className={styles.selectField}
                        >
                            <option value="yes">허용</option>
                            <option value="no">불가 (최소 하루 전 예약 필수)</option>
                        </select>
                    </div>

                    {/* <div className={styles.settingItem}>
                        <label htmlFor="defaultCommission">기본 강사 정산 비율 (%)</label>
                        <input 
                            type="number" 
                            id="defaultCommission"
                            name="defaultCommission"
                            value={settings.defaultCommission}
                            onChange={handleChange}
                            className={styles.inputField}
                            min="0"
                            max="100"
                        />
                        <p className={styles.inputDescription}>
                            신규 강사 등록 시 기본적으로 적용되는 정산 비율입니다.
                        </p>
                    </div> */}
                </div>

                {/* 2. 기관 정보 설정 */}
                <div className={styles.settingGroup}>
                    <h2 className={styles.groupTitle}>기관 정보</h2>

                    <div className={styles.settingItem}>
                        <label htmlFor="centerName">센터/기관 이름</label>
                        <input 
                            type="text" 
                            id="centerName"
                            name="centerName"
                            value={settings.centerName}
                            onChange={handleChange}
                            className={styles.inputField}
                        />
                    </div>
                </div>

                <button 
                    onClick={handleSave} 
                    className={styles.saveButton}
                >
                    설정 저장
                </button>

            </div>
        </div>
    );
};

export default AdminSettings;