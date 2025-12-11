import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AdminReport.module.css';
import api from '../services/api';

const AdminReport = () => {
    const navigate = useNavigate();
    const [reportPeriod, setReportPeriod] = useState('monthly'); // 기간 선택 상태 (월별, 분기별, 연간)
    const [lowLessons, setLowLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLowLessons = async () => {
            try {
                const response = await api.get('/admin/reports/low-lessons');
                setLowLessons(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                
                setError('데이터를 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchLowLessons();
    }, []);


    const handleGoBack = () => {
        navigate('/admin/dashboard');
    };

    if (loading) {
        return <div className={styles.container}>로딩 중...</div>;
    }

    if (error) {
        return <div className={styles.container}>{error}</div>;
    }

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
                    🚨 레슨 잔여 부족 회원 ({lowLessons.length}명)
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
                        {lowLessons.map((member) => (
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