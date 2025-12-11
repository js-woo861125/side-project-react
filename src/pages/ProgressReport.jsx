import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ProgressReport.module.css';
import api from '../services/api';

const ProgressReport = () => {
    const navigate = useNavigate();
    const [metrics, setMetrics] = useState([]);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProgressReport = async () => {
            try {
                const response = await api.get('/student/progress-report');
                setMetrics(response.data.metrics);
                setFeedback(response.data.feedback);
                setLoading(false);
            } catch (err) {
                console.log(err);
                
                setError('진행 상황 리포트를 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchProgressReport();
    }, []);

    const handleGoBack = () => {
        navigate('/student/dashboard');
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
                    {metrics.map((metric, index) => (
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
                {feedback && (
                    <div className={styles.feedbackSection}>
                        <h2 className="text-xl font-semibold text-blue-700 mb-3">🏅 강사 종합 피드백 (업데이트: {feedback.date})</h2>
                        <p className="text-gray-800 leading-relaxed">
                            {feedback.summary}
                        </p>
                        <div className="mt-4 p-3 bg-blue-100 rounded-md">
                            <p className="text-sm font-bold text-blue-800">👉 다음 목표:</p>
                            <p className="text-base text-blue-800 mt-1">{feedback.nextGoal}</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProgressReport;