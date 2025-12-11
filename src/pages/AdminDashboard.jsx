// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatusCard from '../components/StatusCard';
import styles from '../styles/AdminDashboard.module.css';

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState([]);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/v1/admin/dashboard", {
                method: "GET",
                credentials: "include", // ⭐ 세션 쿠키 포함
            });

            if (res.status === 401) {
                alert("세션이 만료되었거나 로그인되지 않았습니다.");
                navigate("/login");
                return;
            }

            const data = await res.json();
            setMetrics(data.metrics);
            setIssues(data.issues);
            setLoading(false);

        } catch (error) {
            console.error("대시보드 로딩 오류:", error);
            navigate("/login");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.greeting}>
                    👋 관리자님 안녕하세요!
                </h1>
                <p className={styles.subtitle}>기관 전체 운영 현황을 확인하세요.</p>
            </header>

            {/* 핵심 지표 */}
            <section className={styles.metricsGrid}>
                {metrics.map((metric, index) => (
                    <StatusCard
                        key={index}
                        title={metric.title}
                        value={metric.value}
                        unit={metric.unit}
                        colorStyle={metric.color}
                    />
                ))}
            </section>

            {/* 주요 기능 링크 */}
            <section className={styles.mainFeatures}>
                <h2 className={styles.sectionTitle}>기관 주요 관리 기능</h2>

                <div className={styles.featureGrid}>
                    <Link to="/admin/members" className={styles.featureLink}>
                        <p className={styles.featureIcon}>👤</p>
                        <p className={styles.featureText}>전체 회원 관리</p>
                    </Link>

                    <Link to="/admin/instructors" className={styles.featureLink}>
                        <p className={styles.featureIcon}>👨‍🏫</p>
                        <p className={styles.featureText}>강사/직원 관리</p>
                    </Link>

                    <Link to="/admin/settings" className={styles.featureLink}>
                        <p className={styles.featureIcon}>🛠️</p>
                        <p className={styles.featureText}>시스템 설정</p>
                    </Link>
                </div>
            </section>

            {/* 이슈 리스트 */}
            <section className={styles.issueSection}>
                <h2 className={styles.issueTitle}>
                    🚨 처리 대기 이슈 ({issues.length}건)
                </h2>

                <div className={styles.noteList}>
                    {issues.map((issue) => (
                        <Link to={issue.link} key={issue.id} className={styles.issueItem}>
                            <span className={styles.issueText}>{issue.text}</span>
                            <span className={styles.issueTag}>{issue.category}</span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
