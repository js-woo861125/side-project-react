// src/pages/AdminReport.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminReport.module.css';

// 더미 데이터: 재무 요약
// const mockSummary = [
//     { title: '금월 순매출', value: '18,500,000원', subtext: '+12% (전월 대비)', color: '#10b981' }, // emerald
//     { title: '총 레슨 판매액', value: '25,000,000원', subtext: '70건 판매', color: '#6366f1' }, // indigo
//     { title: '강사 정산 비용', value: '6,500,000원', subtext: '-3% (전월 대비)', color: '#f59e0b' }, // amber
// ];

// 더미 데이터: 강사별 정산
// 💥💥 더미 데이터: 레슨 잔여 현황 (3회 이하 회원) 💥💥
const mockLowLessons = [
    { id: 101, name: '이민지', instructor: '김철수', lessonsLeft: 3, lastLesson: '2025.11.28' },
    { id: 105, name: '홍길동', instructor: '이지은', lessonsLeft: 1, lastLesson: '2025.11.30' },
    { id: 112, name: '정우성', instructor: '최현우', lessonsLeft: 2, lastLesson: '2025.11.15' },
    { id: 120, name: '김혜수', instructor: '김철수', lessonsLeft: 3, lastLesson: '2025.11.29' },
];

const AdminReport = () => {
    const navigate = useNavigate();
    const [reportPeriod, setReportPeriod] = useState('monthly'); // 기간 선택 상태 (월별, 분기별, 연간)

    const handleGoBack = () => {
        navigate('/admin/dashboard');
    };

    return (
        <div className={styles.container}>
            
            <div className={styles.header}>
                <h1 className={styles.title}>💰 </h1>
                <button 
                    onClick={handleGoBack} 
                    className={styles.backButton}
                >
                    &larr; 대시보드
                </button>
            </div>

            <div className={styles.mainContent}>
                
                {/* 1. 재무 요약 카드
                <div className={styles.summaryGrid}>
                    {mockSummary.map((item, index) => (
                        <div key={index} className={styles.reportCard} style={{ borderLeftColor: item.color }}>
                            <p className={styles.cardTitle}>{item.title}</p>
                            <p className={styles.cardValue}>{item.value}</p>
                            <p className={styles.cardSubtext} style={{ color: item.color }}>{item.subtext}</p>
                        </div>
                    ))}
                </div> */}

                {/* 2. 매출 추이 차트 영역 */}
                <div className={styles.chartSection}>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">월별 레슨 추이 (2025년)</h2>
                    
                    
                    <div className="flex justify-center items-center h-64 bg-white border border-dashed border-gray-300 rounded">
                        <p className="text-gray-500">
                            [월별 레슨 현황 차트 Placeholder: Bar Chart/Line Chart]
                        </p>
                    </div>
                </div>
                
                {/* 3. 강사별 정산 현황 */}
                {/* 💥💥 3. 강사별 정산 현황 -> 레슨 잔여 현황으로 변경 💥💥 */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-red-600">
                    🚨 레슨 잔여 부족 회원 ({mockLowLessons.length}명)
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                    잔여 횟수가 **3회 이하**인 회원 목록입니다. 재계약 관리가 필요합니다.
                </p>

                <table className={styles.settlementTable}> {/* settlementTable 스타일 재사용 */}
                    <thead>
                        <tr className={styles.tableHeader}>
                            <th style={{width: '10%'}}>ID</th>
                            <th style={{width: '20%'}}>회원 이름</th>
                            <th style={{width: '20%'}}>담당 강사</th>
                            <th style={{width: '20%'}}>잔여 횟수</th>
                            <th style={{width: '30%'}}>최근 레슨일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockLowLessons.map((member) => (
                            <tr key={member.id} className={styles.tableRow}>
                                <td>{member.id}</td>
                                <td className="font-semibold text-red-700">{member.name}</td>
                                <td>{member.instructor}</td>
                                <td className="font-bold text-red-500">{member.lessonsLeft}회</td>
                                <td>{member.lastLesson}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            </div>
        </div>
    );
};

export default AdminReport;