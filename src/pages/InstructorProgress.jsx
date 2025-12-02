// src/pages/InstructorProgress.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InstructorProgress.module.css';

// 더미 데이터
const mockMembers = [
    { id: 101, name: '이민지' },
    { id: 102, name: '김태형' },
    { id: 104, name: '최아라' },
];

const mockNotes = [
    { id: 1, memberId: 101, date: '2025.11.27', title: '코어 강화 및 자세 교정 5회차', evaluation: '코어 힘이 많이 증가했으나, 좌우 불균형이 여전히 존재함. 특히 힙 힌지(Hip Hinge) 시 오른쪽 무릎이 안으로 돌아가는 경향이 있어 다음 레슨에서 집중 교정 필요. 숙제: 버드독 3세트.' },
    { id: 2, memberId: 101, date: '2025.11.20', title: '첫 번째 레슨: 기본 체형 분석 및 호흡법', evaluation: '흉곽 호흡이 약하고 목이 앞으로 빠지는 자세 습관 확인. 기본적인 호흡 인지 훈련과 함께 숄더 패킹 연습 진행. 만족도 높음.' },
    { id: 3, memberId: 102, date: '2025.11.25', title: '웨이트: 벤치 프레스 자세 교정', evaluation: '어깨 전방 활주 방지를 위해 흉곽을 고정하는 법 집중 교육. 무게 욕심보다는 정확한 자세를 강조함. 다음 레슨부터는 중량 훈련을 서서히 시작할 예정.' },
];


const InstructorProgress = () => {
    const navigate = useNavigate();
    // 💥 현재 선택된 회원 ID 상태
    const [selectedMemberId, setSelectedMemberId] = useState(mockMembers[0].id); 
    // 💥 노트 모달 상태 (실제 구현 시 사용)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteDetail, setNoteDetail] = useState(null); // 모달에 보여줄 노트 내용

    const handleGoBack = () => {
        navigate('/instructor/dashboard');
    };

    const handleNoteClick = (note) => {
        setNoteDetail(note);
        setIsModalOpen(true);
    };

    const handleAddNote = () => {
        if (!selectedMemberId) {
            alert("노트를 작성할 회원을 먼저 선택해 주세요.");
            return;
        }
        setNoteDetail({ id: null, memberId: selectedMemberId, date: new Date().toLocaleDateString('ko-KR').slice(0, -1), title: '', evaluation: '' });
        setIsModalOpen(true);
    };

    // 선택된 회원의 노트만 필터링
    const filteredNotes = mockNotes.filter(note => note.memberId === selectedMemberId);
    // 최신 노트가 위에 오도록 정렬
    filteredNotes.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className={styles.container}>
            
            <div className={styles.header}>
                <h1 className={styles.title}>✍️ 노트 및 평가</h1>
                <button 
                    onClick={handleGoBack} 
                    className={styles.backButton}
                >
                    &larr; 대시보드
                </button>
            </div>

            <div className={styles.mainContent}>
                
                {/* 1. 회원 선택 및 노트 추가 버튼 */}
                <div className={styles.selectionBar}>
                    <select 
                        className={styles.memberSelect}
                        value={selectedMemberId}
                        onChange={(e) => setSelectedMemberId(parseInt(e.target.value))}
                    >
                        {mockMembers.map(member => (
                            <option key={member.id} value={member.id}>{member.name} 회원</option>
                        ))}
                    </select>
                    <button 
                        className={styles.addButton}
                        onClick={handleAddNote}
                    >
                        + 새 레슨 노트 작성
                    </button>
                </div>

                {/* 2. 레슨 기록 목록 */}
                <h2 className="text-xl font-semibold text-gray-700 mb-3">
                    {mockMembers.find(m => m.id === selectedMemberId)?.name} 회원의 레슨 기록 ({filteredNotes.length}건)
                </h2>

                <div className={styles.noteList}>
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((note) => (
                            <div 
                                key={note.id} 
                                className={styles.noteItem}
                                onClick={() => handleNoteClick(note)}
                            >
                                <p className={styles.noteDate}>{note.date}</p>
                                <p className={styles.noteSummary}>{note.title}</p>
                                <p className={styles.noteEvaluation}>{note.evaluation}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-10">아직 작성된 레슨 노트가 없습니다.</p>
                    )}
                </div>
            </div>

            {/* 🚨 실제로는 여기에 레슨 노트 작성/보기 Modal 컴포넌트가 들어갑니다. */}
            {isModalOpen && noteDetail && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg">
                        <h3 className="text-2xl font-bold mb-4">{noteDetail.id ? '레슨 노트 상세 보기/수정' : '새 레슨 노트 작성'}</h3>
                        <p className="mb-2">**회원:** {mockMembers.find(m => m.id === noteDetail.memberId)?.name}</p>
                        <p className="mb-4">**날짜:** {noteDetail.date}</p>
                        <textarea 
                            className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
                            defaultValue={noteDetail.evaluation} 
                            placeholder="레슨 내용 및 평가를 입력하세요."
                        />
                        <div className="mt-4 flex justify-end gap-3">
                            <button 
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                onClick={() => setIsModalOpen(false)}
                            >
                                닫기
                            </button>
                            <button 
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={() => { alert('노트 저장 완료 (실제 저장 로직 필요)'); setIsModalOpen(false); }}
                            >
                                {noteDetail.id ? '수정 및 저장' : '작성 완료'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstructorProgress;