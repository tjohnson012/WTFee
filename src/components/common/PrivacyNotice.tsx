import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { PRIVACY_NOTICE } from '../../utils/security';

interface PrivacyNoticeProps {
  compact?: boolean;
}

const NoticeContainer = styled(motion.div)<{ $compact?: boolean }>`
  padding: ${({ $compact }) => $compact ? '0.75rem 1rem' : '1rem 1.5rem'};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  font-size: ${({ $compact }) => $compact ? '0.75rem' : '0.875rem'};
`;

const NoticeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const NoticeTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const ExpandButton = styled.button`
  background: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const NoticeContent = styled(motion.ul)`
  margin: 0.75rem 0 0;
  padding-left: 1.5rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
  
  li {
    margin-bottom: 0.25rem;
  }
`;

export const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({ compact = false }) => {
  const [isExpanded, setIsExpanded] = useState(!compact);

  return (
    <NoticeContainer $compact={compact}>
      <NoticeHeader onClick={() => setIsExpanded(!isExpanded)}>
        <NoticeTitle>
          🔒 {PRIVACY_NOTICE.title}
        </NoticeTitle>
        {compact && (
          <ExpandButton>
            {isExpanded ? '▲ Less' : '▼ More'}
          </ExpandButton>
        )}
      </NoticeHeader>
      
      <AnimatePresence>
        {isExpanded && (
          <NoticeContent
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {PRIVACY_NOTICE.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </NoticeContent>
        )}
      </AnimatePresence>
    </NoticeContainer>
  );
};

export default PrivacyNotice;
