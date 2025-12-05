import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { ProcessingResponse } from '../../services/api';
import { 
  analyzeBill, 
  BillAnalysisResult, 
  formatCurrency
} from '../../services/costComparisonService';
import { LineItemExplanation, FullBillAnalysis } from '../../services/explanationService';

interface BillSummaryProps {
  result: ProcessingResponse;
  explanations: Record<string, LineItemExplanation>;
  fullAnalysis?: FullBillAnalysis;
  onStartOver: () => void;
}

// Animations
const celebrationFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(5deg); }
  75% { transform: translateY(-5px) rotate(-5deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

// Styled Components
const SummaryContainer = styled(motion.div)`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CelebrationHeader = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.success}20 0%,
    ${({ theme }) => theme.colors.primary}10 100%
  );
  border-radius: ${({ theme }) => theme.spacing.borderRadius * 2}px;
  position: relative;
  overflow: hidden;
`;

const Sparkles = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  
  &::before, &::after {
    content: '✨';
    position: absolute;
    font-size: 1.5rem;
    animation: ${sparkle} 2s ease-in-out infinite;
  }
  
  &::before {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }
  
  &::after {
    top: 30%;
    right: 15%;
    animation-delay: 1s;
  }
`;

const CelebrationEmoji = styled(motion.span)`
  font-size: 4rem;
  display: block;
  animation: ${celebrationFloat} 3s ease-in-out infinite;
`;

const CelebrationTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.success};
  margin: 1rem 0 0.5rem;
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;

const CelebrationSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`;

const SummaryCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  overflow: hidden;
`;

const CardHeader = styled.div<{ $variant?: 'success' | 'warning' | 'danger' }>`
  padding: 1rem 1.5rem;
  background: ${({ theme, $variant }) => 
    $variant === 'success' ? theme.colors.success + '20' :
    $variant === 'warning' ? theme.colors.accent + '20' :
    $variant === 'danger' ? theme.colors.danger + '20' :
    theme.colors.secondary + '20'
  };
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CardIcon = styled.span`
  font-size: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const TotalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const TotalItem = styled.div<{ $highlight?: boolean }>`
  padding: 1rem;
  background: ${({ theme, $highlight }) => 
    $highlight ? theme.colors.success + '10' : theme.colors.background};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  text-align: center;
`;

const TotalLabel = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

const TotalValue = styled.div<{ $color?: string; $large?: boolean }>`
  font-size: ${({ $large }) => $large ? '2rem' : '1.5rem'};
  font-weight: 700;
  color: ${({ $color, theme }) => $color || theme.colors.text};
`;

const SavingsBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(90deg, 
    ${({ theme }) => theme.colors.success} 0%,
    ${({ theme }) => theme.colors.primary} 100%
  );
  background-size: 200% auto;
  animation: ${shimmer} 3s linear infinite;
  color: white;
  border-radius: 20px;
  font-weight: 600;
  margin-top: 1rem;
`;

const DisputeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DisputeItem = styled(motion.div)<{ $severity: string }>`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-left: 4px solid ${({ $severity, theme }) => 
    $severity === 'high' ? theme.colors.danger :
    $severity === 'medium' ? theme.colors.accent :
    theme.colors.textMuted
  };
  border-radius: 0 ${({ theme }) => theme.spacing.borderRadius}px ${({ theme }) => theme.spacing.borderRadius}px 0;
`;

const DisputeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const DisputeType = styled.span<{ $severity: string }>`
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  background: ${({ $severity, theme }) => 
    $severity === 'high' ? theme.colors.danger + '20' :
    $severity === 'medium' ? theme.colors.accent + '20' :
    theme.colors.textMuted + '20'
  };
  color: ${({ $severity, theme }) => 
    $severity === 'high' ? theme.colors.danger :
    $severity === 'medium' ? theme.colors.accent :
    theme.colors.textMuted
  };
`;

const DisputeSavings = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.success};
`;

const DisputeReason = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 0.75rem;
  line-height: 1.5;
`;

const TalkingPoints = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  
  li {
    margin-bottom: 0.25rem;
  }
`;

const NextStepsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NextStep = styled(motion.div)`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
`;

const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.success};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 0.25rem;
`;

const StepDescription = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  line-height: 1.5;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const ActionButton = styled(motion.button)<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.875rem 1.75rem;
  border-radius: ${({ theme }) => theme.spacing.borderRadius}px;
  font-weight: 600;
  font-size: 1rem;
  
  ${({ $variant, theme }) => $variant === 'secondary' ? `
    background: ${theme.colors.surface};
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.secondary};
  ` : `
    background: ${theme.colors.success};
    color: white;
  `}
`;

const nextSteps = [
  {
    title: 'Review Your Itemized Bill',
    description: 'Request a detailed itemized bill from the billing department if you haven\'t already. Compare it with this analysis.'
  },
  {
    title: 'Contact Billing Department',
    description: 'Call the number on your bill. Be polite but firm. Reference specific charges and ask for explanations or reductions.'
  },
  {
    title: 'Document Everything',
    description: 'Keep records of all calls, including dates, times, representative names, and what was discussed or promised.'
  },
  {
    title: 'Request Financial Assistance',
    description: 'Ask about payment plans, financial hardship programs, or charity care if the bill is difficult to pay.'
  }
];

export const BillSummary: React.FC<BillSummaryProps> = ({ 
  result, 
  explanations,
  fullAnalysis,
  onStartOver 
}) => {
  const [analysis, setAnalysis] = useState<BillAnalysisResult | null>(null);

  useEffect(() => {
    // Use cost comparison analysis for dispute detection
    const billAnalysis = analyzeBill(result.lineItems, {
      state: result.metadata.state,
      adjustments: result.adjustments?.map(a => ({ code: a.code, name: a.name, amount: a.amount })),
      serviceDate: result.metadata.serviceDate,
      totalOwed: result.metadata.totalOwed,
      insuranceStatus: result.metadata.insuranceStatus
    });
    setAnalysis(billAnalysis);
  }, [result]);

  const handleDownload = () => {
    // Generate summary text
    const summaryText = generateSummaryText(result, analysis, explanations);
    
    // Create and download file
    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WTFee-Bill-Analysis-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!analysis) return null;

  const disputeItems = analysis.disputes.filter(d => d.severity === 'high' || d.severity === 'medium');

  return (
    <SummaryContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CelebrationHeader
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
      >
        <Sparkles />
        <CelebrationEmoji
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
        >
          🎉
        </CelebrationEmoji>
        <CelebrationTitle>The Curse Has Been Lifted!</CelebrationTitle>
        <CelebrationSubtitle>
          Your medical bill has been fully decoded and analyzed.
        </CelebrationSubtitle>
        
        {(analysis.potentialSavings.high > 0 || fullAnalysis?.summary.potentialSavings.high) && (
          <SavingsBadge
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            💰 Potential Savings: {formatCurrency(fullAnalysis?.summary.potentialSavings.low || analysis.potentialSavings.low)} - {formatCurrency(fullAnalysis?.summary.potentialSavings.high || analysis.potentialSavings.high)}
          </SavingsBadge>
        )}
      </CelebrationHeader>

      {/* Bill Totals */}
      <SummaryCard>
        <CardHeader $variant="success">
          <CardIcon>📊</CardIcon>
          <CardTitle>Bill Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <TotalGrid>
            <TotalItem $highlight>
              <TotalLabel>Total Charged</TotalLabel>
              <TotalValue $large>{formatCurrency(result.metadata.totalAmount || analysis.totalCharged)}</TotalValue>
            </TotalItem>
            <TotalItem>
              <TotalLabel>Amount Owed</TotalLabel>
              <TotalValue $color="#f44336">{formatCurrency(result.metadata.totalOwed || analysis.totalOwed)}</TotalValue>
            </TotalItem>
            <TotalItem>
              <TotalLabel>Adjustments Applied</TotalLabel>
              <TotalValue $color="#4CAF50">{formatCurrency(result.metadata.totalAdjustments || analysis.totalAdjustments)}</TotalValue>
            </TotalItem>
            <TotalItem>
              <TotalLabel>Issues Found</TotalLabel>
              <TotalValue $color={disputeItems.length > 0 ? '#f44336' : '#4CAF50'}>
                {disputeItems.length}
              </TotalValue>
            </TotalItem>
          </TotalGrid>
        </CardContent>
      </SummaryCard>

      {/* Financial Assistance - if available from full analysis */}
      {fullAnalysis?.summary.financialAssistance.likelyEligible && (
        <SummaryCard>
          <CardHeader $variant="success">
            <CardIcon>💚</CardIcon>
            <CardTitle>Financial Assistance Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ marginBottom: '1rem', color: '#666' }}>
              Based on your situation, you likely qualify for financial assistance programs:
            </p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
              {fullAnalysis.summary.financialAssistance.programs.map((program, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>{program}</li>
              ))}
            </ul>
            <strong>How to Apply:</strong>
            <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
              {fullAnalysis.summary.financialAssistance.howToApply.map((step, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>{step}</li>
              ))}
            </ol>
          </CardContent>
        </SummaryCard>
      )}

      {/* Negotiation Strategy - if available from full analysis */}
      {fullAnalysis?.summary.negotiationStrategy.whatToSay && (
        <SummaryCard>
          <CardHeader $variant="warning">
            <CardIcon>📞</CardIcon>
            <CardTitle>What to Say When You Call</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ marginBottom: '1rem', fontStyle: 'italic', padding: '1rem', background: '#f5f5f5', borderRadius: '8px', lineHeight: '1.6' }}>
              "{fullAnalysis.summary.negotiationStrategy.whatToSay}"
            </p>
            <strong>Key Points:</strong>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
              {fullAnalysis.summary.negotiationStrategy.keyPoints.map((point, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>{point}</li>
              ))}
            </ul>
            <p style={{ marginTop: '1rem', color: '#f44336', fontSize: '0.875rem' }}>
              <strong>⚠️ Avoid:</strong> {fullAnalysis.summary.negotiationStrategy.whatNotToSay}
            </p>
          </CardContent>
        </SummaryCard>
      )}

      {/* Disputes */}
      {disputeItems.length > 0 && (
        <SummaryCard>
          <CardHeader $variant="warning">
            <CardIcon>⚠️</CardIcon>
            <CardTitle>Charges to Review ({disputeItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <DisputeList>
              {disputeItems.map((dispute, index) => (
                <DisputeItem
                  key={index}
                  $severity={dispute.severity}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <DisputeHeader>
                    <DisputeType $severity={dispute.severity}>
                      {dispute.type} - {dispute.severity} priority
                    </DisputeType>
                    <DisputeSavings>
                      Save up to {formatCurrency(dispute.potentialSavings)}
                    </DisputeSavings>
                  </DisputeHeader>
                  <DisputeReason>{dispute.reason}</DisputeReason>
                  <TalkingPoints>
                    {dispute.talkingPoints.slice(0, 3).map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </TalkingPoints>
                </DisputeItem>
              ))}
            </DisputeList>
          </CardContent>
        </SummaryCard>
      )}

      {/* Next Steps */}
      <SummaryCard>
        <CardHeader>
          <CardIcon>📋</CardIcon>
          <CardTitle>Your Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <NextStepsSection>
            {nextSteps.map((step, index) => (
              <NextStep
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <StepNumber>{index + 1}</StepNumber>
                <StepContent>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepContent>
              </NextStep>
            ))}
          </NextStepsSection>
        </CardContent>
      </SummaryCard>

      {/* Actions */}
      <ActionButtons>
        <ActionButton
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📥 Download Summary
        </ActionButton>
        <ActionButton
          $variant="secondary"
          onClick={onStartOver}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 Analyze Another Bill
        </ActionButton>
      </ActionButtons>
    </SummaryContainer>
  );
};

// Helper function to generate downloadable summary
function generateSummaryText(
  result: ProcessingResponse,
  analysis: BillAnalysisResult | null,
  explanations: Record<string, LineItemExplanation>
): string {
  if (!analysis) return '';

  let text = `
═══════════════════════════════════════════════════════════════
                    WTFee - BILL ANALYSIS SUMMARY
═══════════════════════════════════════════════════════════════

Provider: ${result.metadata.provider || 'Unknown'}
Service Date: ${result.metadata.serviceDate || 'Unknown'}
Analysis Date: ${new Date().toLocaleDateString()}

───────────────────────────────────────────────────────────────
                         BILL TOTALS
───────────────────────────────────────────────────────────────

Total Charged:      ${formatCurrency(analysis.totalCharged)}
Amount Owed:        ${formatCurrency(analysis.totalOwed)}
Adjustments:        ${formatCurrency(analysis.totalAdjustments)}
Potential Savings:  ${formatCurrency(analysis.potentialSavings.low)} - ${formatCurrency(analysis.potentialSavings.high)}

───────────────────────────────────────────────────────────────
                       LINE ITEMS (${result.lineItems.length})
───────────────────────────────────────────────────────────────

`;

  for (const item of result.lineItems) {
    const explanation = explanations[item.id];
    text += `
${item.code || 'N/A'} - ${item.description || item.rawText}
Amount: ${formatCurrency(item.amount || 0)}
${explanation ? `\nExplanation: ${explanation.plainEnglish}` : ''}
${item.isDuplicate ? '\n⚠️ DUPLICATE CHARGE DETECTED' : ''}
---
`;
  }

  if (analysis.disputes.length > 0) {
    text += `
───────────────────────────────────────────────────────────────
                    CHARGES TO DISPUTE (${analysis.disputes.length})
───────────────────────────────────────────────────────────────

`;
    for (const dispute of analysis.disputes) {
      text += `
Type: ${dispute.type.toUpperCase()} (${dispute.severity} priority)
Potential Savings: ${formatCurrency(dispute.potentialSavings)}
Reason: ${dispute.reason}

Talking Points:
${dispute.talkingPoints.map(p => `  • ${p}`).join('\n')}

Action Steps:
${dispute.actionSteps.map(s => `  ${s}`).join('\n')}
---
`;
    }
  }

  text += `
───────────────────────────────────────────────────────────────
                        NEXT STEPS
───────────────────────────────────────────────────────────────

1. Request an itemized bill from the billing department
2. Call billing and reference specific charges
3. Document all conversations
4. Ask about financial assistance programs

───────────────────────────────────────────────────────────────
Generated by WTFee - What The Fee Medical Bill Decoder
https://github.com/tjohnson012/WTFee
═══════════════════════════════════════════════════════════════
`;

  return text;
}

export default BillSummary;
