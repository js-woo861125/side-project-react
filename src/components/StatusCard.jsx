// src/components/StatusCard.jsx

import React from 'react';
import styles from './StatusCard.module.css';

/**
 * 상태 지표를 표시하는 재사용 가능한 카드 컴포넌트입니다.
 * @param {string} title - 카드의 제목
 * @param {string | number} value - 카드의 주요 수치
 * @param {string} unit - 수치의 단위
 * @param {string} colorStyle - 카드의 강조 색상 ('blue', 'green', 'red' 중 하나)
 */
const StatusCard = ({ title, value, unit, colorStyle }) => {
    // 유효한 스타일이 아닌 경우 기본값 'blue' 설정
    const cardClass = `${styles.card} ${styles[colorStyle] || styles.blue}`;

    return (
        <div className={cardClass}>
            <p className={styles.title}>{title}</p>
            <p className={styles.value}>
                {value}
                <span className={styles.unit}>{unit}</span>
            </p>
        </div>
    );
};

export default StatusCard;