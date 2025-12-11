// src/pages/InstructorDashboard.jsx (수정)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatusCard from '../components/StatusCard'; 
import api from '../services/api';
// 💥 CSS 모듈 임포트
import styles from '../styles/InstructorDashboard.module.css';

const InstructorDashboard = () => {
    const [instructorMetrics, setInstructorMetrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await api.get('/instructor/metrics');
                setInstructorMetrics(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                
                setError('데이터를 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    if (loading) {
        return <div className={styles.container}>로딩 중...</div>;
    }

    if (error) {
        return <div className={styles.container}>{error}</div>;
    }

    return (
        // 💥 클래스 적용: container
        <div className={styles.container}> 
            <header className={styles.header}>
                {/* 💥 클래스 적용: greeting, subtitle */}
                <h1 className={styles.greeting}>
                    👋 김철수 강사님, 환영합니다!
                </h1>
                <p className={styles.subtitle}>강사님께 필요한 주요 정보를 한눈에 확인하세요.</p>
            </header>

            {/* 💥💥 StatusCard 적용 및 클래스 적용: metricsGrid */}
            <div className={styles.metricsGrid}>
                {instructorMetrics.map((metric, index) => (
                    <StatusCard 
                        key={index}
                        title={metric.title}
                        value={metric.value}
                        unit={metric.unit}
                        colorStyle={metric.color}
                    />
                ))}
            </div>

            {/* 💥 클래스 적용: mainFeatures */}
            <div className={styles.mainFeatures}>
                {/* 💥 클래스 적용: sectionTitle */}
                <h2 className={styles.sectionTitle}>
                    강사 주요 기능
                </h2>
                {/* 💥 클래스 적용: featureGrid */}
                <div className={styles.featureGrid}>
                    {/* 💥 클래스 적용: featureLink, featureIcon, featureText (색상 커스텀 클래스도 추가) */}
                    <Link to="/instructor/schedule" className={`${styles.featureLink} ${styles.schedule}`}>
                        <p className={styles.featureIcon}>🗓️</p>
                        <p className={styles.featureText}>전체 스케줄</p>
                    </Link>
                    <Link to="/instructor/members" className={`${styles.featureLink} ${styles.members}`}>
                        <p className={styles.featureIcon}>👨‍🎓</p>
                        <p className={styles.featureText}>회원 관리</p>
                    </Link>
                    <Link to="/instructor/progress" className={`${styles.featureLink} ${styles.progress}`}>
                        <p className={styles.featureIcon}>✍️</p>
                        <p className={styles.featureText}>노트/평가</p>
                    </Link>
                    {/* 💥 추가: 강사 정보 관리 메뉴 */}
                    <Link to="/instructor/settings" className={`${styles.featureLink} ${styles.settings}`}>
                        <p className={styles.featureIcon}>⚙️</p>
                        <p className={styles.featureText}>정보 관리</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboard;