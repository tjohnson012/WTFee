# Requirements Document

## Introduction

WTFee (What The Fee) is a web application that transforms the overwhelming experience of understanding medical bills into an empowering, educational journey. Users upload confusing medical bills (photos or PDFs) and receive line-by-line explanations in plain English, with cost analysis and dispute recommendations. The application features a unique emotional UI that mirrors the user's journey from anxiety to understanding - starting with a dark, tense interface that gradually transforms into a calm, reassuring experience as users gain clarity about their bills.

## Requirements

### Requirement 1: Document Upload and Processing

**User Story:** As a patient with a confusing medical bill, I want to upload a photo or PDF of my bill, so that I can get it analyzed without having to manually type in complex medical codes and charges.

#### Acceptance Criteria

1. WHEN a user visits the application THEN the system SHALL display a prominent upload area that accepts both image files (JPG, PNG) and PDF documents
2. WHEN a user uploads a file THEN the system SHALL validate the file type and size (max 10MB) before processing
3. WHEN a valid file is uploaded THEN the system SHALL use AWS Textract to extract all text and structured data from the document
4. WHEN text extraction is complete THEN the system SHALL identify and parse individual line items, charges, codes, and totals
5. IF the document cannot be processed or text extraction fails THEN the system SHALL display a clear error message with suggestions for improving image quality

### Requirement 2: AI-Powered Bill Explanation

**User Story:** As a patient struggling to understand medical billing codes and charges, I want each line item explained in simple terms, so that I can understand what I'm actually being charged for.

#### Acceptance Criteria

1. WHEN line items are extracted from a bill THEN the system SHALL send each item to Claude API for plain-English explanation
2. WHEN generating explanations THEN the system SHALL include the medical procedure or service name, why it was necessary, and typical cost context
3. WHEN a CPT code is identified THEN the system SHALL provide both the official description and a simplified explanation
4. WHEN facility fees or administrative charges are found THEN the system SHALL explain what these cover and whether they're standard
5. WHEN explanations are generated THEN the system SHALL present them in conversational, empathetic language that reduces anxiety

### Requirement 3: Cost Analysis and Dispute Detection

**User Story:** As a patient concerned about overcharges, I want the system to flag potentially incorrect or inflated charges, so that I can dispute them with confidence.

#### Acceptance Criteria

1. WHEN analyzing charges THEN the system SHALL compare each line item against regional average costs for similar procedures
2. WHEN a charge exceeds regional averages by more than 25% THEN the system SHALL flag it as potentially disputable
3. WHEN duplicate charges are detected THEN the system SHALL highlight them and explain why they might be errors
4. WHEN unbundled services are identified THEN the system SHALL flag potential billing optimization issues
5. WHEN generating dispute recommendations THEN the system SHALL provide specific talking points and next steps for contacting billing departments

### Requirement 4: Emotional UI Transformation

**User Story:** As a user feeling overwhelmed by my medical bill, I want the interface to acknowledge my anxiety and gradually become more calming as I understand my bill, so that the experience feels supportive rather than clinical.

#### Acceptance Criteria

1. WHEN a user first loads the application THEN the system SHALL display a dark, tense color scheme with sharp edges and dramatic shadows
2. WHEN a user uploads their bill THEN the system SHALL maintain the anxious aesthetic during processing to reflect the uncertainty
3. WHEN explanations begin appearing THEN the system SHALL gradually lighten colors, soften edges, and introduce warmer tones
4. WHEN the user progresses through understanding each line item THEN the system SHALL incrementally transform visual elements toward a calm, reassuring design
5. WHEN the final summary is displayed THEN the system SHALL complete the transformation to a peaceful, confident color palette with soft, rounded elements

### Requirement 5: Comprehensive Bill Summary

**User Story:** As a patient who has reviewed all explanations, I want a clear final summary of what I owe, what I can dispute, and my next steps, so that I can take action with confidence.

#### Acceptance Criteria

1. WHEN all line items have been explained THEN the system SHALL generate a comprehensive summary section
2. WHEN creating the summary THEN the system SHALL clearly state the total amount owed after removing disputed items
3. WHEN disputed charges are identified THEN the system SHALL provide a separate total of potentially disputable amounts
4. WHEN generating next steps THEN the system SHALL provide specific contact information and scripts for disputing charges
5. WHEN the summary is complete THEN the system SHALL offer options to download or email the analysis for future reference

### Requirement 6: Responsive Design and Accessibility

**User Story:** As a user who may be accessing this on my phone while stressed about medical bills, I want the application to work seamlessly on any device, so that I can get help whenever and wherever I need it.

#### Acceptance Criteria

1. WHEN accessing the application on mobile devices THEN the system SHALL provide a fully responsive experience with touch-optimized interactions
2. WHEN using screen readers THEN the system SHALL provide appropriate ARIA labels and semantic HTML structure
3. WHEN users have visual impairments THEN the system SHALL maintain sufficient color contrast ratios throughout the UI transformation
4. WHEN users prefer reduced motion THEN the system SHALL respect prefers-reduced-motion settings while maintaining the emotional journey
5. WHEN the application loads THEN the system SHALL achieve a Lighthouse accessibility score of 90 or higher

### Requirement 7: Data Security and Privacy

**User Story:** As a patient uploading sensitive medical information, I want my data to be secure and private, so that I can use the service without worrying about my personal health information being compromised.

#### Acceptance Criteria

1. WHEN users upload documents THEN the system SHALL encrypt all data in transit using HTTPS
2. WHEN processing documents THEN the system SHALL not store uploaded files permanently on servers
3. WHEN using AI services THEN the system SHALL ensure no personal health information is retained by third-party APIs
4. WHEN the session ends THEN the system SHALL automatically purge all uploaded data and analysis results
5. WHEN handling user data THEN the system SHALL comply with HIPAA privacy requirements for health information