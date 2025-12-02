// src/pages/ProgressReport.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProgressReport.module.css';

// 더미 데이터: 핵심 성과 지표 (Key Performance Indicators)
const mockMetrics = [
    { title: '누적 완료 레슨', value: 12, unit: '회', style: 'blue' },
    { title: '목표 달성률', value: 75, unit: '%', style: 'green' },
    { title: '주요 체중 변화', value: -4.5, unit: 'kg', style: 'purple' },
];

// 더미 데이터: 강사 종합 피드백
const mockFeedback = {
    date: '2025. 11. 27',
    summary: "OOO 회원님, 지난 4주간 꾸준한 출석과 집중력 덕분에 **데드리프트 자세가 완벽하게 교정**되었고, 목표 체중의 절반을 달성했습니다. 특히, 식단 관리와 유산소 운동 병행이 큰 효과를 보고 있습니다. 다음 4주 목표는 상체 근력 증가와 코어 강화에 집중하겠습니다.",
    nextGoal: "주 3회 출석 유지, 푸시업 5회 연속 성공 목표 설정",
};

const ProgressReport = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/student/dashboard');
    };

    return (
        <div className={styles.container}>
            
            <div className={styles.header}>
                <h1 className={styles.title}>📈 진행 상황 리포트</h1>
                {/* 💥 뒤로가기 버튼 */}
                <button 
                    onClick={handleGoBack} 
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                    &larr; 대시보드
                </button>
            </div>

            <div className={styles.mainContent}>
                
                {/* 1. 핵심 지표 카드 */}
                <div className={styles.metricGrid}>
                    {mockMetrics.map((metric, index) => (
                        <div key={index} className={`${styles.metricCard} ${styles[metric.style]}`}>
                            <p className={styles.metricTitle}>{metric.title}</p>
                            <p className={styles.metricValue}>
                                {metric.value}
                                <span className="text-xl font-normal ml-1">{metric.unit}</span>
                            </p>
                        </div>
                    ))}
                </div>

                {/* 2. 시각화 영역 (가상 차트) */}
                <div className={styles.chartSection}>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">주간 운동/출석 진척도</h2>
                    {/* 실제로는 여기에 Recharts나 Chart.js 같은 라이브러리를 사용합니다. */}
                    <div className="flex items-center justify-center h-48 bg-gray-100 rounded-md border border-dashed border-gray-300">
                        <p className="text-gray-500 italic">
                            [가상의 주간 진척도 그래프 영역]<br/>
                            (예: 벤치프레스 중량 변화, 출석률 막대 그래프)
                        </p>
                    </div>
                </div>

                {/* 3. 강사 종합 피드백 */}
                <div className={styles.feedbackSection}>
                    <h2 className="text-xl font-semibold text-blue-700 mb-3">🏅 강사 종합 피드백 (업데이트: {mockFeedback.date})</h2>
                    <p className="text-gray-800 leading-relaxed">
                        {mockFeedback.summary}
                    </p>
                    <div className="mt-4 p-3 bg-blue-100 rounded-md">
                        <p className="text-sm font-bold text-blue-800">👉 다음 목표:</p>
                        <p className="text-base text-blue-800 mt-1">{mockFeedback.nextGoal}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProgressReport;