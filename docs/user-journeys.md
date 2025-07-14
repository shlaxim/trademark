# User Journeys

This document outlines the key user journeys in the Trademark Registration System.

## 1. Search and Select Classes

### User Story
As a user, I want to search for existing trademarks and select appropriate Nice classes for my trademark application, so that I can assess the availability of my trademark and prepare for registration.

### Journey Steps

1. **Initial Search**
   - User enters the trademark name or uploads a logo
   - System performs a preliminary search across TMview, EUIPO, and OBI databases
   - System displays search results with a visual availability score

2. **Review Search Results**
   - User reviews matching trademarks from different jurisdictions
   - System highlights potential conflicts and similarities
   - User can filter results by jurisdiction, status, and similarity

3. **Select Nice Classes**
   - User browses Nice classification system
   - System suggests appropriate classes based on the trademark description
   - User selects relevant classes for goods and services

4. **Fee Calculation**
   - System calculates fees in real-time as user selects classes
   - Fee breakdown is displayed (base fee, per-class fees)
   - Total fee is updated dynamically

5. **Save Search Results**
   - User can save search results for future reference
   - System generates a "Similarity Report" highlighting potential conflicts
   - User proceeds to application or saves progress for later

### Success Criteria
- User can quickly assess trademark availability
- User selects appropriate Nice classes for their goods/services
- User understands the fee structure before proceeding
- Search results are comprehensive across multiple jurisdictions

## 2. Application Drafting

### User Story
As a user, I want to complete a trademark application form with all required information, so that I can submit it to the appropriate intellectual property office.

### Journey Steps

1. **Select Application Type**
   - User chooses application type (Greek National, EU, International)
   - System presents the appropriate form and requirements
   - User is informed about jurisdiction-specific requirements

2. **Enter Applicant Information**
   - User enters personal/company details
   - System auto-populates fields from user profile if available
   - User uploads supporting documents (ID, business registration)

3. **Enter Trademark Details**
   - User enters trademark name or uploads logo
   - User specifies trademark type (word, figurative, combined)
   - User provides description of the trademark

4. **Specify Goods and Services**
   - User selects Nice classes (carried over from search step)
   - User specifies goods and services within each class
   - System suggests standard terms from the harmonized database

5. **Upload Supporting Documents**
   - User uploads power of attorney (if applicable)
   - User uploads priority documents (if claiming priority)
   - User uploads specimen of use (if required)

6. **Preview Application**
   - System generates a preview of the application
   - User reviews all entered information
   - User can go back to edit any section

7. **Save Draft**
   - User saves application as draft
   - System stores all entered information
   - User receives confirmation email with draft details

### Success Criteria
- User completes all required fields for the application
- User can save and resume the application process
- User can preview the application before submission
- System validates input to ensure compliance with requirements

## 3. Checkout and Signature

### User Story
As a user, I want to review my application, pay the required fees, and provide my signature, so that I can complete the trademark registration process.

### Journey Steps

1. **Review Application Summary**
   - User reviews complete application details
   - System displays a summary of all entered information
   - User confirms the accuracy of the information

2. **Fee Breakdown**
   - System displays detailed fee breakdown
   - User sees base fee, per-class fees, and any additional fees
   - Total amount is clearly displayed

3. **Payment Method Selection**
   - User selects payment method (credit card, bank transfer)
   - System integrates with Stripe for secure payment processing
   - User enters payment details

4. **Payment Processing**
   - System processes payment through Stripe
   - User receives real-time feedback on payment status
   - System generates invoice/receipt

5. **Electronic Signature**
   - User reviews declaration and terms
   - User provides electronic signature
   - System records signature with timestamp

6. **Confirmation**
   - System displays confirmation of successful submission
   - User receives confirmation email with application details
   - System generates application reference number

### Success Criteria
- User understands all fees before payment
- Payment process is secure and reliable
- E-signature is captured and stored securely
- User receives immediate confirmation of submission

## 4. Filing and Tracking

### User Story
As a user, I want to track the status of my trademark application and receive updates, so that I can stay informed about the registration process.

### Journey Steps

1. **Application Submission**
   - System submits application to the appropriate office
   - Backend processes application through API or robotic submission
   - User receives confirmation of submission

2. **Status Dashboard**
   - User accesses dashboard to view application status
   - System displays current stage in the registration process
   - Timeline shows completed and upcoming steps

3. **Status Updates**
   - System polls office status (via API or scraping)
   - User receives email notifications for status changes
   - Dashboard is updated with latest status

4. **Office Actions**
   - System notifies user of any office actions requiring response
   - User can view details of the office action
   - User can upload response documents

5. **Registration Certificate**
   - System notifies user when trademark is registered
   - User can download registration certificate
   - System updates dashboard with registration details

6. **Renewal Reminders**
   - System tracks registration expiration dates
   - User receives reminders before renewal deadlines
   - User can initiate renewal process from dashboard

### Success Criteria
- User can track application status in real-time
- User receives timely notifications about status changes
- User can respond to office actions through the platform
- System provides accurate information about next steps

## 5. Portfolio Management

### User Story
As a user, I want to manage my trademark portfolio, so that I can keep track of all my trademark registrations, renewals, and related documents.

### Journey Steps

1. **Portfolio Overview**
   - User accesses portfolio dashboard
   - System displays all trademarks with status indicators
   - User can filter and sort trademarks by various criteria

2. **Trademark Details**
   - User selects a trademark to view details
   - System displays comprehensive information about the trademark
   - User can access all related documents and history

3. **Document Management**
   - User can view and download all documents related to a trademark
   - System organizes documents by type and date
   - User can upload additional documents

4. **Renewal Management**
   - System displays upcoming renewal deadlines
   - User receives reminders before deadlines
   - User can initiate renewal process

5. **Usage Evidence**
   - User can upload evidence of trademark use
   - System stores and organizes usage evidence
   - User can generate usage reports

6. **Analytics and Reports**
   - User can generate reports on trademark portfolio
   - System provides analytics on portfolio composition
   - User can export data for external use

### Success Criteria
- User has a comprehensive view of their trademark portfolio
- User can easily access all trademark-related documents
- User is reminded of important deadlines
- User can generate useful reports and analytics