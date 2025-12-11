import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/InstructorProgress.module.css';
import api from '../services/api';

const InstructorProgress = () => {
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [notes, setNotes] = useState([]);
    const [selectedMemberId, setSelectedMemberId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteDetail, setNoteDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await api.get('/instructor/members');
                setMembers(response.data);
                if (response.data.length > 0) {
                    setSelectedMemberId(response.data[0].id);
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
                
                setError('회원 목록을 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    useEffect(() => {
        if (selectedMemberId) {
            const fetchNotes = async () => {
                try {
                    const response = await api.get(`/instructor/members/${selectedMemberId}/notes`);
                    setNotes(response.data);
                } catch (err) {
                    console.log(err);
                    
                    setNotes([]);
                }
            };

            fetchNotes();
        }
    }, [selectedMemberId]);

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

    const handleSaveNote = async (noteToSave) => {
        try {
            if (noteToSave.id) {
                await api.put(`/instructor/notes/${noteToSave.id}`, noteToSave);
            } else {
                await api.post(`/instructor/members/${selectedMemberId}/notes`, noteToSave);
            }
            setIsModalOpen(false);
            // Refresh notes
            const response = await api.get(`/instructor/members/${selectedMemberId}/notes`);
            setNotes(response.data);
        } catch (err) {
            console.log(err);
            
            alert('노트 저장에 실패했습니다.');
        }
    };

    if (loading) {
        return <div className={styles.container}>로딩 중...</div>;
    }

    if (error) {
        return <div className={styles.container}>{error}</div>;
    }
    
    const filteredNotes = notes.sort((a, b) => new Date(b.date) - new Date(a.date));

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
                        {members.map(member => (
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
                    {members.find(m => m.id === selectedMemberId)?.name} 회원의 레슨 기록 ({filteredNotes.length}건)
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

            {isModalOpen && noteDetail && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg">
                        <h3 className="text-2xl font-bold mb-4">{noteDetail.id ? '레슨 노트 상세 보기/수정' : '새 레슨 노트 작성'}</h3>
                        <p className="mb-2">**회원:** {members.find(m => m.id === noteDetail.memberId)?.name}</p>
                        <p className="mb-4">**날짜:** <input type="text" defaultValue={noteDetail.date} className="border p-1" /></p>
                        <input type="text" placeholder="제목" defaultValue={noteDetail.title} className="w-full p-2 border rounded-md mb-2" />
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
                                onClick={() => handleSaveNote(noteDetail)}
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