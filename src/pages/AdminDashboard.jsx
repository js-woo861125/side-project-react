// src/pages/AdminDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import StatusCard from '../components/StatusCard'; 
import styles from './AdminDashboard.module.css'; // 💥 스타일 파일명 일치 확인

// 더미 데이터: 기관 관리자 핵심 지표
const mockAdminMetrics = [
    // { title: '금월 매출액', value: '18,500,000', unit: '원', color: 'green' },
    { title: '활성 회원 수', value: 85, unit: '명', color: 'blue' },
    { title: '신규 등록 회원', value: 7, unit: '명', color: 'yellow' },
    { title: '잔여 레슨 부족', value: 12, unit: '건', color: 'red' },
];


// 더미 데이터: 주요 알림/이슈
const mockIssues = [
    { id: 1, text: '이번 달 정산 보고서 검토 필요', category: '재무', link: '/admin/report' },
    { id: 2, text: '신규 강사 교육 완료, 계정 활성화 대기', category: '인사', link: '/admin/instructors' },
    { id: 3, text: '이민지 회원 잔여 레슨 1회 남음', category: '회원', link: '/admin/members/101' },
];

const AdminDashboard = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.greeting}>
                    👋 헬스장 (주)OOO 관리자님, 안녕하세요!
                </h1>
                <p className={styles.subtitle}>기관 전체 운영 현황과 주요 이슈를 관리하세요.</p>
            </header>

            {/* 1. 핵심 지표 카드 */}
            <div className={styles.metricsGrid}>
                {mockAdminMetrics.map((metric, index) => (
                    <StatusCard 
                        key={index}
                        title={metric.title}
                        value={metric.value}
                        unit={metric.unit}
                        colorStyle={metric.color}
                    />
                ))}
            </div>

            {/* 2. 주요 관리 메뉴 섹션 */}
            <div className={styles.mainFeatures}>
                <h2 className={styles.sectionTitle}>
                    기관 주요 관리 기능
                </h2>
                <div className={styles.featureGrid}>
                    <Link to="/admin/members" className={styles.featureLink}>
                        <p className={styles.featureIcon}>👤</p>
                        <p className={styles.featureText}>전체 회원 관리</p>
                    </Link>
                    <Link to="/admin/instructors" className={styles.featureLink}>
                        <p className={styles.featureIcon}>👨‍🏫</p>
                        <p className={styles.featureText}>강사/직원 관리</p>
                    </Link>
                    {/* <Link to="/admin/report" className={styles.featureLink}>
                        <p className={styles.featureIcon}>💰</p>
                        <p className={styles.featureText}>매출/정산 보고서</p>
                    </Link> */}
                    <Link to="/admin/settings" className={styles.featureLink}>
                        <p className={styles.featureIcon}>🛠️</p>
                        <p className={styles.featureText}>시스템 설정</p>
                    </Link>
                </div>
            </div>

            {/* 3. 알림 및 이슈 목록 섹션 */}
            <div className={styles.issueSection}>
                <h2 className="text-xl font-semibold text-red-600 mb-3 border-b pb-2">
                    🚨 처리 대기 주요 이슈 ({mockIssues.length}건)
                </h2>
                <div className={styles.noteList}>
                    {mockIssues.map((issue) => (
                        <Link to={issue.link} key={issue.id} className={styles.issueItem}>
                            <span className="font-medium">{issue.text}</span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{issue.category}</span>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;