// src/pages/LessonHistory.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LessonHistory.module.css';

// 더미 데이터: 실제로는 API에서 불러와야 합니다.
const lessonData = [
    { id: 1, date: '2025.11.27', time: '19:00 - 20:00', name: '하체 근력 강화 50분', instructor: '김철수 트레이너', status: '완료', memo: '스쿼트 자세 교정 집중, 무릎 사용 개선.' },
    { id: 2, date: '2025.11.25', time: '14:00 - 15:00', name: '필라테스 리포머 60분', instructor: '이영희 강사', status: '완료', memo: '코어 안정화 운동, 복부 근육 활성화 확인.' },
    { id: 3, date: '2025.11.20', time: '11:00 - 12:00', name: '가슴/어깨 비대칭 교정', instructor: '김철수 트레이너', status: '완료', memo: '벤치 프레스 시 오른쪽 어깨 개입 주의.' },
    { id: 4, date: '2025.11.18', time: '17:00 - 18:00', name: '예술 드로잉 - 명암 표현', instructor: '박민정 강사', status: '완료', memo: '소묘 기본 이해 및 명암 단계 학습.' },
];

const LessonHistory = () => {
    const navigate = useNavigate();

    // 뒤로 가기 버튼 핸들러 (사이드바가 없으므로 대시보드로 돌아가도록)
    const handleGoBack = () => {
        navigate('/student/dashboard');
    };

    return (
        <div className={styles.container}>
            
            <div className={styles.header}>
                <h1 className={styles.title}>📚 수업/레슨 내역</h1>
                {/* 💥 뒤로가기 버튼 */}
                <button 
                    onClick={handleGoBack} 
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                    &larr; 대시보드
                </button>
            </div>

            <div className={styles.mainContent}>
                
                <p className="text-gray-500 mb-4">총 **{lessonData.length}회**의 레슨 기록이 있습니다.</p>
                
                {/* 💥 레슨 기록 리스트 */}
                <div className={styles.lessonList}>
                    {lessonData.map(lesson => (
                        <div key={lesson.id} className={styles.lessonCard}>
                            <div className="flex justify-between items-start mb-2">
                                {/* 레슨 상태 및 날짜 */}
                                <span className={styles.statusCompleted}>{lesson.status}</span>
                                <p className="text-sm font-medium text-gray-500">{lesson.date} ({lesson.time})</p>
                            </div>

                            {/* 레슨 정보 */}
                            <h3 className="text-lg font-semibold text-gray-800">{lesson.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">강사: **{lesson.instructor}**</p>
                            
                            {/* 강사 평가 또는 메모 */}
                            <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-md">
                                <p className="text-xs font-semibold text-blue-700 mb-1">강사 코멘트</p>
                                <p className="text-sm text-blue-800 italic">"{lesson.memo}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LessonHistory;